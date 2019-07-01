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

        req.session.data['cya'] = null;
        req.session.data['reg-type'] = null;
        req.session.data['account-number'] = null;
        req.session.data['outcome'] = null;
        req.session.data['content'] = null;
        req.session.data['decision-day'] = null;
        req.session.data['decision-month'] = null;
        req.session.data['decision-year'] = null;
        req.session.data['publish-on-day'] = null;
        req.session.data['publish-on-month'] = null;
        req.session.data['publish-on-year'] = null;

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

            if (req.session.data['cya'] === 'Y') {
                res.redirect('/' + version + '/sanctions/internal/add/check')
            } else {
                res.redirect('/' + version + '/sanctions/internal/add/licensee')
            }
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


        var accountNo = req.session.data['account-number'];

        // Who is the licensee?
        // Get the data

        const getRegisterData = require('../../data/AzureSQL/getRegisterData');
        let registerData = getRegisterData(accountNo);

        registerData.then(result => {

            res.render(version + '/sanctions/internal/add/confirmlicensee', {
                version,
                result
            })

        }).catch(err => {
            // console.log(err);
        });


    
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

            if (req.session.data['cya'] === 'Y') {
                res.redirect('/' + version + '/sanctions/internal/add/check')
            } else {
                res.redirect('/' + version + '/sanctions/internal/add/status')
            }
        } else if (actionType === 'Action') {
              if (req.session.data['cya'] === 'Y') {
                res.redirect('/' + version + '/sanctions/internal/add/check')
            } else {
                res.redirect('/' + version + '/sanctions/internal/add/details')
            }
            
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

            if (req.session.data['cya'] === 'Y') {
                res.redirect('/' + version + '/sanctions/internal/add/check')
            } else {
                res.redirect('/' + version + '/sanctions/internal/add/details')
            }
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

            if (req.session.data['cya'] === 'Y') {
                res.redirect('/' + version + '/sanctions/internal/add/check')
            } else {
                res.redirect('/' + version + '/sanctions/internal/add/decisiondate')
            }
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

            if (req.session.data['cya'] === 'Y') {
                res.redirect('/' + version + '/sanctions/internal/add/check')
            } else {
                res.redirect('/' + version + '/sanctions/internal/add/publishdate')
            }
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

        req.session.data['cya'] = "Y";


        // Build the nice version of the sanctions list

        var outcome = req.session.data['outcome']
        var outcomeResultArray = outcome.toString().split(',');
        
        console.log(outcome)

        var accountNo = req.session.data['account-number'];
        const getRegisterData = require('../../data/AzureSQL/getRegisterData');
        let registerData = getRegisterData(accountNo);

        registerData.then(result => {

            res.render(version + '/sanctions/internal/add/check', {
                version,
                outcomeResultArray,
                result
            })

        }).catch(err => {
            // console.log(err);
        });

      
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

exports.sanctionsInternal_View_Preview_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {

        req.session.data['cya'] = "Y";

        // Build the nice version of the sanctions list

        var outcome = req.session.data['outcome']
        var outcomeResultArray = outcome.toString().split(',');
        
        console.log(outcome)

        res.render(version + '/sanctions/internal/view/preview', {
            version,
            outcomeResultArray
        })
    }
}