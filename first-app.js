const http=require('http');

const server=http.createServer((req,res)=>{
    const url=req.url;
    console.log(req.url,req.method,req.headers);
    // console.log('Ashwani Singh')
    if(url==='/home'){
        res.write('<html>')
        res.write('<head><title>First Page</title><head>')
        res.write('<body><h1>This is homepage</h1></body>')
        res.write('</html>')
        return res.end();
    }else if(url==='/about'){
        res.write('<html>')
        res.write('<head><title>First Page</title><head>')
        res.write('<body><h1>welcome to about page</h1></body>')
        res.write('</html>')
        return res.end();
    }else if(url==='/about'){
        res.write('<html>')
        res.write('<head><title>First Page</title><head>')
        res.write('<body><h1>welcome to about page</h1></body>')
        res.write('</html>')
        return res.end();
    }else if(url==='/Node'){
        res.write('<html>')
        res.write('<head><title>Node Page</title><head>')
        res.write('<body><h1>Welcome to my node>js Project</h1></body>')
        res.write('</html>')
        return res.end();
    }
})

server.listen(4000);