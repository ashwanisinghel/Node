const fs = require('fs');

const requestHandeler=(req,res)=>{
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        fs.readFile('message.txt', (err,data)=>{
        if(err){
            console.log(err);
        }
        console.log(`data from this file is ${data}`)
        res.write('<html>');
        res.write('<head><title>Message</title></head>');
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        );
        res.write(`<h3>${data}</h3>`)
        res.write('</html>');
        return res.end();
    });
        // res.write('<html>');
        // res.write('<head><title>Enter Message</title><head>');
        // res.write(
        //   '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        // );
        // res.write('</html>');
        // return res.end();
    }
    else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
        console.log(chunk);
        body.push(chunk);
        });
        return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.writeFile('message.txt', message, err => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    });
  }
  // res.setHeader('Content-Type', 'text/html');
  // res.write('<html>');
  // res.write('<head><title>My First Page</title><head>');
  // res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  // res.write('</html>');
  // res.end();
}
module.exports={
    handeler: requestHandeler
}