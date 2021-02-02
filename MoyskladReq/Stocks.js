exports.getStocksReq = (limit, offset, search, order) => {
    const {ms} = require("./../server");

    return new Promise((resolve, reject) => {
        ms.GET("report/stock/all",
            {
                filter: search
                    ? "search=" + search
                    : "", limit, offset, order
            }).then(
            data => {
                resolve(data);
            }, err => {
                reject(err)
            });
    })
}