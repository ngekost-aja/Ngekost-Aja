const http = require('http')

const port = 8000
const hostname = 'localhost'

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello, this is the server of Ngekost Aja!')
})

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
})