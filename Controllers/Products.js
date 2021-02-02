const {getProductsReq} = require("../MoyskladReq/Products");

exports.getProducts = async (req, res) =>{
    let limit = 25;
    let offset = 0;
    let search = "";

    if (req.query.search != null) {search = req.query.search;}
    if (req.query.limit != null) {limit = req.query.limit;}
    if (req.query.offset != null) {offset = req.query.offset;}

    try {
        let data = await getProductsReq(limit, offset, search);
        const answer = {};
        answer.products = data.rows;
        answer.size = data.meta.size;
        res.json(answer);
    } catch (e){
        res.status(500).send(e);
    }
}