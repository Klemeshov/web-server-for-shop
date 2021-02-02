exports.getProductsReq = (limit, offset, search) => {
    const {ms} = require("./../server");

    return new Promise((resolve, reject) => {
        ms.GET("entity/product",
            {limit, offset, search}).then(
            data => {
                resolve(data);
            }, err => {
                reject(err)
            });
    })
}