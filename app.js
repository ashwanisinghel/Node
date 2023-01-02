const http=require('http');
const fs=require('fs');

const server= http.createServer((req,res)=>{
    console.log(req.url,req.method,req.headers);
    const url=req.url;
    const method=req.method;

    res.setHeader('Content-Type','text/html');

    if(url==='/'){
        fs.readFile('appmessage.txt', (err,data)=>{
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
        // res.write('</html>');
        // return res.end();
        // })
        // res.write('<html>');
        // res.write('<head><title>Message</title></head>');
        // res.write(
        //     '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        // );
        // res.write('</html>');
        // return res.end();
    }
    else if(url==='/message' && method==='POST'){
        const body=[];
        req.on('data',chunk=>{
            console.log(chunk);
            body.push(chunk);
        })
        return req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            const message=parsedBody.split('=')[1];
            console.log(message);
            fs.writeFileSync('appmessage.txt',message,err=>{
                res.statusCode=302;
                res.setHeader(location,'/');
                return res.end();
            })
        })
    }
    
})

server.listen(3000);