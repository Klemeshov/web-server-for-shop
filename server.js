const moysklad = require("moysklad");
require('isomorphic-fetch');

const serv = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const port = process.env.PORT || 5000;

const corsOptions = {
    credentials: true, // This is important.
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    headers: ["X-Requested-With", "content-type"]
};


serv.use(bodyParser.json());
serv.use(bodyParser.urlencoded({extended: true}));
serv.use(cookieParser("HelloWorld"));
serv.use(cors(corsOptions));

const login = "admin@dima-0510";
const password = "794cdc36689b";
const ms = moysklad({
    login,
    password
});

//limit<int>, offset<int>, search<string> товары и услуги
serv.get("/entity/product", (req, res) => {
    let limit = 25;
    let offset = 0;
    let search = "";

    if (req.query.search != null) {search = req.query.search;}
    if (req.query.limit != null) {limit = req.query.limit;}
    if (req.query.offset != null) {offset = req.query.offset;}

    ms.GET("entity/product", {limit, offset, search}).then(require => {
        const answer = {};
        answer.products = require.rows;
        answer.size = require.meta.size;
        res.json(answer);
    }, err => {
        res.error(err)
    });
});

//limit<int>, offset<int>, search<string> остатки
serv.get("/report/stock/all", (req, res)=>{
    let limit = 25;
    let offset = 0;
    let search = null;
    let order = "name";

    if (req.query.search != null) {search = req.query.search;}
    if (req.query.limit != null) {limit = req.query.limit;}
    if (req.query.offset != null) {offset = req.query.offset;}
    if (req.query.order != null) {order = req.query.order;}

    ms.GET("report/stock/all", {filter:search?"search="+search:"", limit, offset, order}).then(require => {
        const answer = {};
        answer.products = require.rows;
        answer.size = require.meta.size;
        res.json(answer);
    }, err => {
        res.sendStatus(400)
    });
});

//name<string> phone<string> email<string> контрагенты
serv.get("/entity/counterparty", (req, res) => {
    let name = "";
    let phone = "";
    let email = "";

    if (req.query.name != null) {name = req.query.name;}
    if (req.query.phone != null) {phone = req.query.phone;}
    if (req.query.email != null) {email = req.query.email;}

    ms.GET(`/entity/counterparty`, {filter: {name, email, phone}}).then(require => {
        const answer = {};
        answer.counterpartys = require.rows;
        answer.size = require.meta.size;
        res.json(answer);
    }, err => {
        console.log(err);
    });
});

//создать контрагента
serv.post("/entity/counterparty", (req, res) => {
    data = req.body;
    ms.POST("/entity/counterparty", {...data}).then(require => {
        res.json(require);
    })
});

serv.listen(port, () => {
    console.log("server started");
});
