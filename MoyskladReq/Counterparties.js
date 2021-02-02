exports.getCounterpartiesReq = (name, email, phone) => {
    const {ms} = require("./../server");

    return new Promise((resolve, reject) => {
        ms.GET("/entity/counterparty",
            {filter: {name, email, phone}}).then(
            data => {
                resolve(data);
            }, err => {
                reject(err)
            });
    })
}

exports.createCounterpartyReq = (data) => {
    const {ms} = require("./../server");

    return new Promise((resolve, reject) => {
        ms.POST("/entity/counterparty", {...data}).then(
            data => {
                resolve(data);
            }, err=>{
                reject(err)
            });
    })
}