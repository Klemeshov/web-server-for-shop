const {getCounterpartiesReq,
    createCounterpartyReq} = require("../MoyskladReq/Counterparties");

exports.getCounterparties = async (req, res) => {
    let name = "";
    let phone = "";
    let email = "";

    if (req.query.name != null) {name = req.query.name;}
    if (req.query.phone != null) {phone = req.query.phone;}
    if (req.query.email != null) {email = req.query.email;}

    try{
        let data = await getCounterpartiesReq(name, email, phone);
        const answer = {};
        answer.counterpartys = data.rows;
        answer.size = data.meta.size;
        res.json(answer);
    }catch (e){
        console.log(e);
        res.status(500).send(e);
    }
}

exports.createCounterparty = async (req, res) => {
    const Counterparty = req.body;

    try{
        let data = await createCounterpartyReq(Counterparty);
        res.json(data);
    }catch (e){
        console.log(e);
        res.status(500).send(e);
    }
}