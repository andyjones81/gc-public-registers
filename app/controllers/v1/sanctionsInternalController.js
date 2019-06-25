const version = "v1";
const sql = require("mssql");
const enabled = process.env.RegActionInternalEnabled

exports.sanctionsInternal_Home_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/index', {
            version
        })
    }




}