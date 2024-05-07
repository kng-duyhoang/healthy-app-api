const app = require("./src/app");
const PORT = process.env.PORT || 3055

const server = app.listen(PORT, () => {
    console.log(`App is ready in port ${PORT}`)
})

process.on('SIGINT', () => {
    server.close(() => {
        console.log('server die')
        process.exit(0)
    })
})