exports.getProductFoldersReq = (limit, offset) => {
    const {ms} = require("./../server");

    return new Promise((resolve, reject) => {
        ms.GET("/entity/productfolder", {limit, offset}).then(
            data => {
                resolve(data);
            },
            err => {
                reject(err);
            })
    })
}