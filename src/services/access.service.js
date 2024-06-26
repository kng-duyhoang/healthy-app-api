const bcrypt = require('bcrypt')

const { createTokenPair } = require("../auth/auth.utils")
const { AuthNotFound, AuthFailureError, BadRequestError, ForbiddenError, NotAcceptAble } = require("../core/error.response")
const { generateToken } = require("../helpers")
const { userModel, ROLEUSER } = require("../models/users.model")
const KeyTokenService = require("./key.service")
const { getInforData, validateEmail, getAge } = require("../utils")
const { findUserByPhone } = require("./user.service")

class AccessService {
    static handleRefreshToken = async ({ keyStore, user, refreshToken }) => {
        const { userId, phone } = user
        if (keyStore.refreshTokensUsed.includes(refreshToken)) {
            await KeyTokenService.deleteKeyByUserID(userId)
            throw new ForbiddenError('Something wrong happend!! Pls relogin')
        }
        if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError('User not registed')

        const foundShop = await findUserByPhone({ phone })
        if (!foundShop) throw new AuthFailureError('Shop not registed 2')


        const tokens = await createTokenPair({ userID: foundShop._id, phone }, keyStore.publicKey, keyStore.privateKey)
        await keyStore.updateOne({
            $set: {
                refreshToken: tokens.refreshToken,
                accessToken: tokens.accessToken
            },
            $addToSet: {
                refreshTokensUsed: refreshToken
            }
        })

        return {
            user,
            tokens
        }
    }

    static getSelf = async user => getInforData({ fields: ['_id', 'name', 'phone'], object: user })

    static signUp = async ({phone, password, name, gender, email, birthDay}) => {
        // Check email valid
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) throw new NotAcceptAble('email in valid')
        // Check user existed
        const findUser = await userModel.findOne({ $or: [
            {phone: phone},
            {email: email}
        ] }).lean()
        if (findUser) throw new BadRequestError('User is existed!!!')        
        // Check birthday valid
        if (getAge(birthDay) <= 12) throw new NotAcceptAble('Age not over 12')

        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            name, password: passwordHash, phone, roles: [ROLEUSER.user], gender, email, birthDay
        })

        if (newUser) {
            // Create private key and publickey
            const { privateKey, publicKey } = generateToken()
            const { accessToken, refreshToken } = await createTokenPair({ userId: newUser._id, phone }, publicKey, privateKey)
            if (refreshToken) {
                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newUser._id,
                    publicKey,
                    privateKey,
                    refreshToken
                })
                if (!keyStore) throw new ForbiddenError('Key not Created!!!')
                return {
                    user: getInforData({ fields: ['_id', 'name', 'email'], object: newUser }),
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                }
            }
        }
    }

    static login = async ({phone, password}) => {
        const foundUser = await userModel.findOne({ phone }).lean()
        if (!foundUser) throw new AuthNotFound("User not esisted!!!")
        const match = await bcrypt.compare(password, foundUser.password)
        if (!match) throw new AuthFailureError('Authen Error')

        const { privateKey, publicKey } = generateToken()

        const keyStore = await KeyTokenService.createKeyToken({
            userId: foundUser._id,
            publicKey,
            privateKey,
        })

        if (!keyStore) throw new ForbiddenError('Key not Created!!!')

        const tokens = await createTokenPair({ userId: foundUser._id, phone }, publicKey, privateKey)

        return {
            user: getInforData({ fields: ['_id', 'name', 'email'], object: foundUser }),
            tokens
        }
    }
}

module.exports = AccessService