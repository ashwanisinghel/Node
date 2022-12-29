const http=require('http');

const server=http.createServer((req,res)=>{
    console.log(req.url,req.method,req.headers);
    res.setHeader('Content-Type','text/html');
    res.write('<html>')
    res.write('<head><title>First Page</title><head>')
    res.write('<body><h1>Hi from node js</h1></body>')
    res.write('</html>')

})

server.listen(4000);