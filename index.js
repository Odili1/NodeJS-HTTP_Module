const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'public', req.url === '/' ? 'home.html' : req.url);
    const emptyPath = path.join(__dirname, 'public', '404.html');
    const contentType = getContentType(filePath) || 'text/html';

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err){
            if(err.code === 'ENOENT'){
                fs.readFile(emptyPath, 'utf-8', (err, content) => {
                    res.writeHead(200, {'Content-Type': contentType});
                    res.end(content)
                })
            }else{
                res.writeHead(500)
                res.end('This is a server Error')
            }
        }

        if(!err){
            res.writeHead(200, {'content-Type': contentType});
            res.end(data);
        }
    });
})

const getContentType = (filePath) => {
    let extName = path.extname(filePath);

    if(extName === '.js'){
        return 'text/javascript'
    }

    if(extName === '.css'){
        return 'text/css'
    }
}

const port = 8000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})