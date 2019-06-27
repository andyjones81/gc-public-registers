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
        res.render(version + '/sanctions/internal/add/start', {
            version
        })
    }
}


exports.sanctionsInternal_AddSanction_post = function (req, res) {
    if (enabled !== 'true') {
        res.redirect('denied')
    } else {

        // Where are we going to next?
        let actionType = req.session.data['reg-type']

        if (actionType === 'Sanction') {
            res.redirect('/' + version + '/sanctions/internal/add/licensee')
        } else if (actionType === 'Action') {
            res.redirect('/' + version + '/sanctions/internal/add/licensee')
        } else {
            res.redirect('/' + version + '/sanctions/internal/add/start')
        }
    }
}



exports.sanctionsInternal_Add_Licensee_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/add/licensee', {
            version
        })
    }
}


exports.sanctionsInternal_Add_Licensee_post = function (req, res) {
    if (enabled !== 'true') {
        res.redirect('denied')
    } else {

        console.log("licence post")

        // Where are we going to next?
        let actionType = req.session.data['reg-type']

        if (actionType === 'Sanction') {
            res.redirect('/' + version + '/sanctions/internal/add/confirmlicensee')
        } else if (actionType === 'Action') {
            res.redirect('/' + version + '/sanctions/internal/add/confirmlicensee')
        } else {
            res.redirect('/' + version + '/sanctions/internal/add/start')
        }
    }
}

exports.sanctionsInternal_Add_ConfirmLicensee_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/add/confirmlicensee', {
            version
        })
    }
}

exports.sanctionsInternal_Add_ConfirmLicensee_post = function (req, res) {
    if (enabled !== 'true') {
        res.redirect('denied')
    } else {

        console.log("licence post")

        // Where are we going to next?
        let actionType = req.session.data['reg-type']

        if (actionType === 'Sanction') {
            res.redirect('/' + version + '/sanctions/internal/add/status')
        } else if (actionType === 'Action') {
            res.redirect('/' + version + '/sanctions/internal/add/status')
        } else {
            res.redirect('/' + version + '/sanctions/internal/add/start')
        }
    }
}


exports.sanctionsInternal_Add_Status_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/add/status', {
            version
        })
    }
}


exports.sanctionsInternal_Add_Status_post = function (req, res) {
    if (enabled !== 'true') {
        res.redirect('denied')
    } else {

        // Where are we going to next?
        let actionType = req.session.data['reg-type']

        if (actionType === 'Sanction') {
            res.redirect('/' + version + '/sanctions/internal/add/details')
        } else if (actionType === 'Action') {
            res.redirect('/' + version + '/sanctions/internal/add/details')
        } else {
            res.redirect('/' + version + '/sanctions/internal/add/start')
        }
    }
}

exports.sanctionsInternal_Add_Details_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/add/details', {
            version
        })
    }
}


exports.sanctionsInternal_Add_Details_post = function (req, res) {
    if (enabled !== 'true') {
        res.redirect('denied')
    } else {

        // Where are we going to next?
        let actionType = req.session.data['reg-type']

        if (actionType === 'Sanction') {
            res.redirect('/' + version + '/sanctions/internal/add/decisiondate')
        } else if (actionType === 'Action') {
            res.redirect('/' + version + '/sanctions/internal/add/decisiondate')
        } else {
            res.redirect('/' + version + '/sanctions/internal/add/start')
        }
    }
}

exports.sanctionsInternal_Add_DecisionDate_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/add/decisiondate', {
            version
        })
    }
}


exports.sanctionsInternal_Add_DecisionDate_post = function (req, res) {
    if (enabled !== 'true') {
        res.redirect('denied')
    } else {

        // Where are we going to next?
        let actionType = req.session.data['reg-type']

        if (actionType === 'Sanction') {
            res.redirect('/' + version + '/sanctions/internal/add/publishdate')
        } else if (actionType === 'Action') {
            res.redirect('/' + version + '/sanctions/internal/add/publishdate')
        } else {
            res.redirect('/' + version + '/sanctions/internal/add/start')
        }
    }
}

exports.sanctionsInternal_Add_PublishDate_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/add/publishdate', {
            version
        })
    }
}


exports.sanctionsInternal_Add_PublishDate_post = function (req, res) {
    if (enabled !== 'true') {
        res.redirect('denied')
    } else {

        // Where are we going to next?
        let actionType = req.session.data['reg-type']

        if (actionType === 'Sanction') {
            res.redirect('/' + version + '/sanctions/internal/add/check')
        } else if (actionType === 'Action') {
            res.redirect('/' + version + '/sanctions/internal/add/check')
        } else {
            res.redirect('/' + version + '/sanctions/internal/add/start')
        }
    }
}

exports.sanctionsInternal_Add_Check_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/add/check', {
            version
        })
    }
}

exports.sanctionsInternal_Add_Check_post = function (req, res) {
    if (enabled !== 'true') {
        res.redirect('denied')
    } else {

        // Where are we going to next?
        let actionType = req.session.data['reg-type']

        if (actionType === 'Sanction') {
            res.redirect('/' + version + '/sanctions/internal/add/complete')
        } else if (actionType === 'Action') {
            res.redirect('/' + version + '/sanctions/internal/add/complete')
        } else {
            res.redirect('/' + version + '/sanctions/internal/add/start')
        }
    }
}


exports.sanctionsInternal_Add_Complete_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/add/complete', {
            version
        })
    }
}