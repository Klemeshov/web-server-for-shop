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
    methods:["POST","GET", "PUT", "DELETE", "OPTIONS"],
    headers:["X-Requested-With", "content-type"]
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

serv.get("/entity/product", (req, res)=>{
    let limit = 25;
    let offset = 0;

    if (req.query.limit != null) {
        limit = req.query.limit;
    }
    if (req.query.offset != null) {
        offset = req.query.offset;
    }

    ms.GET("entity/product", {limit, offset}).then(require=>{
        const answer = {};
        answer.products = require.rows;
        answer.size = require.meta.size;
        res.json(answer);
    },err=>{
        res.error(err)
    });
});

serv.listen(port, () => {
    console.log("server started");
});

