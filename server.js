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

exports.ms = ms;

const {getStocks} = require("./Controllers/Stocks");
const {getProducts} = require("./Controllers/Products");
const {getCounterparties, createCounterparty} = require("./Controllers/Counterparties");

//limit<int>, offset<int>, search<string> товары и услуги
serv.get("/entity/product", getProducts);

//limit<int>, offset<int>, search<string> остатки
serv.get("/report/stock/all", getStocks);

//name<string> phone<string> email<string> контрагенты
serv.get("/entity/counterparty", getCounterparties);

//создать контрагента
serv.post("/entity/counterparty", createCounterparty);

serv.listen(port, () => {
    console.log("server started");
});