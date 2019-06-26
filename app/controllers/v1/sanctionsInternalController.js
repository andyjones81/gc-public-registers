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

exports.sanctionsInternal_Dashboard_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/dashboard', {
            version,
            'dashboard_class': 'active'
        })
    }

}

exports.sanctionsInternal_ViewSanctions_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {

  
        res.render(version + '/sanctions/internal/viewsanctions', {
            version
        })
    }

}


exports.sanctionsInternal_AddSanction_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/addsanction', {
            version
        })
    }

}