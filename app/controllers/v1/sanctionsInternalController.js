const version = "v1";
const sql = require("mssql");
const enabled = process.env.RegActionInternalEnabled;
const crypto = require("crypto");

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

        const sanctionsRegisterData = require('../../data/AzureSQL/sanctionsRegisterData');
        let registerData = sanctionsRegisterData("all");
    
        registerData.then(result => {
    
console.log('get view sanctions')

            res.render(version + '/sanctions/internal/view/sanctions', {
                version,
                result
            })
    
        }).catch(err => {
            console.log(err);
        });

      
    }

}


exports.sanctionsInternal_AddSanction_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {


        req.session.data['settlements'] = null;
        req.session.data['settlements'] = [];
        req.session.data['cya'] = null;
        req.session.data['reg-type'] = null;


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
        req.session.data['items'] = null;
        req.session.data['items'] = [];
        req.session.data['account-number'] = null;
        req.session.data['outcome'] = null;
        req.session.data['content'] = null;
        req.session.data['decision-day'] = null;
        req.session.data['decision-month'] = null;
        req.session.data['decision-year'] = null;
        req.session.data['publish-on-day'] = null;
        req.session.data['publish-on-month'] = null;
        req.session.data['publish-on-year'] = null;

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
            req.session.data['account-name'] = result.registerData.recordset[0].Account;


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
            res.redirect('/' + version + '/sanctions/internal/add/settlement-list')
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
            res.redirect('/' + version + '/sanctions/internal/add/complete')
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

        if (req.session.data['reg-type'] === 'Sanction') {
            var outcome = req.session.data['outcome']
            var outcomeResultArray = outcome.toString().split(',');
        }

        var accountNo = req.session.data['account-number'];
        const getRegisterData = require('../../data/AzureSQL/getRegisterData');
        let registerData = getRegisterData(accountNo);


        let items = req.session.data['items']
        registerData.then(result => {



            res.render(version + '/sanctions/internal/add/check', {
                version,
                outcomeResultArray,
                result,
                items
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



// exports.sanctionsInternal_Add_Financial_get = function (req, res) {

//     if (enabled !== 'true') {
//         res.render('denied')
//     } else {
//         res.render(version + '/sanctions/internal/add/financial', {
//             version
//         })
//     }
// }

exports.sanctionsInternal_Add_Settlement_Add_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/add/settlement-add', {
            version
        })
    }
}

exports.sanctionsInternal_Add_Settlement_List_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        let items = req.session.data['items']

        res.render(version + '/sanctions/internal/add/settlement-list', {
            version,
            items
        })
    }
}

exports.sanctionsInternal_Add_Settlement_Remove_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {

        // Remove the entry from the array 

        var listOfItems = [];

        if (req.session.data['items'] !== undefined) {
            listOfItems = req.session.data['items'];
        }

        console.log(listOfItems);

        var id = req.params.id;
        console.log(id);

        var r = listOfItems.filter(item => item.id !== id);
        req.session.data['items'] = r;

        res.redirect('/' + version + '/sanctions/internal/add/settlement-list')
    }
}


// exports.sanctionsInternal_Add_Financial_post = function (req, res) {
//     if (enabled !== 'true') {
//         res.redirect('denied')
//     } else {


//         console.log(req.session.data['reg-type'])

//         // Where are we going to next?
//         let actionType = req.session.data['reg-type']
//         let financialSettlement = req.session.data['financial-settlement']

//         if (financialSettlement === 'yes') {
//             res.redirect('/' + version + '/sanctions/internal/add/financial-list')
//         } else {
//             res.redirect('/' + version + '/sanctions/internal/add/decisiondate')
//         }
//     }
// }


exports.sanctionsInternal_Add_Settlement_Add_post = function (req, res) {
    if (enabled !== 'true') {
        res.redirect('denied')
    } else {

        if (req.session.data['settlement-outcome'] === 'Divestment' ||
            req.session.data['settlement-outcome'] === 'Payment in lieu of penalty' ||
            req.session.data['settlement-outcome'] === 'Commission charges') {
            res.redirect('/' + version + '/sanctions/internal/add/financial-settlement-add')
        } else {
            res.redirect('/' + version + '/sanctions/internal/add/nonfinancial-settlement-add')
        }
    }
}

exports.sanctionsInternal_Add_Settlement_List_post = function (req, res) {
    if (enabled !== 'true') {
        res.redirect('denied')
    } else {

        // If this is the first time in, the session won't contain an array
        // However, if this is a settlement with multiple operators, user will go back to the operator search page to start another entry

        console.log('In');

        if (req.session.data['settlementArray'] === undefined) {
            // This is the first record, so lets create an array object           

            var listOfItems = [];

            if (req.session.data['settlements'] !== undefined) {
                listOfItems = req.session.data['settlements'];
            }



            // Save details in to session and redirect to list
            let outcome = req.session.data['reg-type']
            let account = req.session.data['account-number']
            let detail = req.session.data['content']
            let items = req.session.data['items']
            let accountName = req.session.data['account-name']

            listOfItems.push({
                outcome: outcome,
                account: account,
                accountname: accountName,
                detail: detail,
                items: items,
                id: crypto.randomBytes(16).toString("hex")
            })





            req.session.data['settlements'] = listOfItems;

            console.log(JSON.stringify(listOfItems))

        } else {
            // There is something in the array so the user has added another record.
            // Get the array
            console.log('In - Else');

        }


        res.redirect('/' + version + '/sanctions/internal/add/licenseelist')
    }
}


exports.sanctionsInternal_Add_Financial_Settlement_Add_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/add/financial-settlement-add', {
            version
        })
    }
}

exports.sanctionsInternal_Add_Financial_Settlement_Add_post = function (req, res) {
    if (enabled !== 'true') {
        res.redirect('denied')
    } else {

        var listOfItems = [];

        if (req.session.data['items'] !== undefined) {
            listOfItems = req.session.data['items'];
        }

        // Save details in to session and redirect to list
        let outcome = req.session.data['settlement-outcome']
        let amount = req.session.data['amount']
        let detail = req.session.data['settlement-detail']

        listOfItems.push({
            outcome: outcome,
            amount: amount,
            detail: detail,
            id: crypto.randomBytes(16).toString("hex")
        })

        req.session.data['items'] = listOfItems

        console.log(listOfItems)

        res.redirect('/' + version + '/sanctions/internal/add/settlement-list')
    }
}

exports.sanctionsInternal_Add_NonFinancial_Settlement_Add_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/add/nonfinancial-settlement-add', {
            version
        })
    }
}

exports.sanctionsInternal_Add_NonFinancial_Settlement_Add_post = function (req, res) {
    if (enabled !== 'true') {
        res.redirect('denied')
    } else {

        var listOfItems = [];

        if (req.session.data['items'] !== undefined) {
            listOfItems = req.session.data['items'];
        }

        // Save details in to session and redirect to list
        let outcome = req.session.data['settlement-outcome']
        let detail = req.session.data['settlement-detail']

        listOfItems.push({
            outcome: outcome,
            amount: 'N/A',
            detail: detail,
            id: crypto.randomBytes(16).toString("hex")
        })

        req.session.data['items'] = listOfItems

        console.log(listOfItems)

        res.redirect('/' + version + '/sanctions/internal/add/settlement-list')
    }
}

exports.sanctionsInternal_Add_LicenseeList_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {


        console.log(JSON.stringify(req.session.data['settlements']))

        let settlementData = req.session.data['settlements']

        res.render(version + '/sanctions/internal/add/licenseelist', {
            version,
            settlementData
        })
    }
}

exports.sanctionsInternal_Add_LicenseeList_post = function (req, res) {
    if (enabled !== 'true') {
        res.redirect('denied')
    } else {

        let otherLicensees = req.session.data['other-licensees'];

        if (otherLicensees === 'yes') {
            res.redirect('/' + version + '/sanctions/internal/add/licensee')
        } else {

            res.redirect('/' + version + '/sanctions/internal/add/decisiondate')
        }
    }
}

exports.sanctionsInternal_View_Sanctions_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/view/sanctions', {
            version
        })
    }
}

exports.sanctionsInternal_View_AllSanctions_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {

        const sanctionsRegisterData = require('../../data/AzureSQL/sanctionsRegisterData');
        let registerData = sanctionsRegisterData("all");
    
        registerData.then(result => {
    
console.log('get view sanctions')

            res.render(version + '/sanctions/internal/view/allsanctions', {
                version,
                result
            })
    
        }).catch(err => {
            console.log(err);
        });

      
    }

}
exports.sanctionsInternal_View_AllArchiveSanctions_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {

        const sanctionsRegisterData = require('../../data/AzureSQL/sanctionsRegisterData');
        let registerData = sanctionsRegisterData("all");
    
        registerData.then(result => {
    
console.log('get view sanctions')

            res.render(version + '/sanctions/internal/view/allarchivesanctions', {
                version,
                result
            })
    
        }).catch(err => {
            console.log(err);
        });

      
    }

}

exports.sanctionsInternal_View_SanctionDetail_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {

        const sanctionsRegisterData = require('../../data/AzureSQL/sanctionsRegisterData');
        let registerData = sanctionsRegisterData("all");
        var id = req.params.id;
        registerData.then(result => {
    
console.log('get view sanctions')

            res.render(version + '/sanctions/internal/view/detail', {
                version,
                result,
                id
            })
    
        }).catch(err => {
            console.log(err);
        });

      
    }

}

exports.sanctionsInternal_View_InternalResults_get = function (req, res) {

    if (enabled !== 'true') {
        res.render('denied')
    } else {
        res.render(version + '/sanctions/internal/view/internalresults', {
            version
        })
    }
}