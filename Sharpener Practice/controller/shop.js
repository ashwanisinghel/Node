const path=require('path')
const rootDir = require('../util/path');

const product=(req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
}

module.exports={
    product:product
}