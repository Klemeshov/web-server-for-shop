const {getStocksReq} = require("../MoyskladReq/Stocks");

exports.getStocks = async (req, res) => {
    let limit = 25;
    let offset = 0;
    let search = null;
    let order = "name";

    if (req.query.search != null) {search = req.query.search;}
    if (req.query.limit != null) {limit = req.query.limit;}
    if (req.query.offset != null) {offset = req.query.offset;}
    if (req.query.order != null) {order = req.query.order;}
    try{
        let data = await getStocksReq(limit, offset, search, order);
        const answer = {};
        answer.products = data.rows;
        answer.size = data.meta.size;
        res.json(answer);
    }catch (e){
        res.status(500).send(e);
    }
}