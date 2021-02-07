const {getProductFoldersReq} = require("../MoyskladReq/ProductFolders");

exports.getProductFolders = async (req, res) => {
    let limit = 100;
    let offset = 0;

    if (req.query.offset != null) {offset = req.query.offset;}
    if (req.query.limit != null) {limit = req.query.limit;}

    try {
        let data = await getProductFoldersReq(limit, offset);
        res.json(data.rows.filter(u=>u.pathName!==""));
    }catch (e){
        res.status(500).send(e);
    }
}