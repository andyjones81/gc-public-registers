const version = "v2";
const _ = require('lodash');
const mobileDetect = require('mobile-detect');
const sql = require("mssql");

exports.sanctions_summary_get = function (req, res) {

    //Clear the search filters that may exist
    req.session.data['status'] = undefined
    req.session.data['sector'] = undefined

    res.render(version + '/sanctions/summary', {
        version
    })

}


exports.sanctions_search_get = function (req, res) {
    const registerData = require('../../data/register.json')
    console.log('sanctions: search get')
    var r = req.session.data['ab']
    if (r === 'A') {
        res.render(version + '/sanctions/search', {
            version,
            registerData
        })
    } else {
        res.render(version + '/sanctions/search-b', {
            version,
            registerData
        })
    }
}

exports.sanctions_download_get = function (req, res) {

    res.render(version + '/sanctions/download', {
        version
    })

}

exports.sanctions_api_get = function (req, res) {
    res.render(version + '/sanctions/api', {
        version
    })
}

exports.sanctions_results_post = function (req, res) {
    console.log('sanctions: results post')
    var r = req.session.data['ab']
    const sanctionsRegisterData = require('../../data/AzureSQL/sanctionsRegisterData');
    let query = req.session.data['search']

   

    var emptySearch = 'false';
    let registerData = sanctionsRegisterData(query);

    if (query === '') {
        console.log('Empty query')
        emptySearch = 'true';
        res.render(version + '/sanctions/results-b', {
            version,
            emptySearch,
            registerData
        })
    } else {
       
        registerData.then(result => {
            if (r === 'A') {
                res.render(version + '/sanctions/results', {
                    version,
                    registerData,
                    result,
                    emptySearch
                })
            } else {

                //Is this a mobile?

                var md = new mobileDetect(req.headers['user-agent']);

                if (md.mobile() !== null) {

                    res.render(version + '/sanctions/results-mob', {
                        version,
                        registerData,
                        result,
                        emptySearch
                    })
                } else {
                    res.render(version + '/sanctions/results', {
                        version,
                        registerData,
                        result,
                        emptySearch
                    })
                }
            }


        }).catch(err => {
            console.log(err);
        });
    }



}


exports.sanctions_results_get = function (req, res) {
    console.log('sanctions: results get')
    // Value from the form
    var query = req.session.data['search']
    var registerData = [];
    var r = req.session.data['ab']
    const d = require('../../data/register.json')


    var qs1 = d.Accounts.Account.filter(function (value) {
        return value.RemoteStatus === 'sanctions';
    });

    if (query === undefined) {
        registerData = _.orderBy(qs1, ['Account'], ['asc']);
    } else {
        registerData = _.filter(qs1, function (a) {
            if ((a.Account.toLowerCase().indexOf((query).toLowerCase()) !== -1) ||
                (a.AccountNo.indexOf((query)) !== -1))
                return a;
        });
    }


    // are there any additional filters?
    var statusFilter = req.session.data['status']
    var sectorFilter = req.session.data['sector']

    // console.log(query)
    // console.log(statusFilter)
    // console.log(sectorFilter)

    if (statusFilter !== undefined) {

        if (statusFilter.length !== 2) {
            registerData = _.filter(registerData, function (a) {
                if (a.DeterminationStatus.indexOf((statusFilter)) !== -1)
                    return a;
            });
        }
    }

    registerData = _.orderBy(registerData, ['Account'], ['asc']);

    if (r === 'A') {
        res.render(version + '/sanctions/results', {
            version,
            registerData
        })
    } else {

        //Is this a mobile?

        var md = new mobileDetect(req.headers['user-agent']);

        if (md.mobile() !== null) {

            res.render(version + '/sanctions/results', {
                version,
                registerData
            })
        } else {
            res.render(version + '/sanctions/results', {
                version,
                registerData
            })
        }


    }

}

exports.sanctions_full_get = function (req, res) {
    console.log('sanctions: full get')
    var r = req.session.data['ab']

    const sanctionsRegisterData = require('../../data/AzureSQL/sanctionsRegisterData');

    var query = req.session.data['searchsan']
    console.log('query pre: '+ query)
    
    if(query === '' || query === undefined || query === 'null')
    {
        query = 'all';
    }

    
    console.log('query post: '+ query)

    let registerData = sanctionsRegisterData(query);

    registerData.then(result => {

        res.render(version + '/sanctions/full', {
            version,
            result
        })

    }).catch(err => {
        console.log(err);
    });

}



exports.sanctions_detail_get = function (req, res) {

    // console.log('Details')

    var query = req.session.data['search']
    var accountNo = req.params.id;

    const getRegisterData = require('../../data/AzureSQL/getRegisterData');


    var emptySearch = 'false';
    let registerData = "";

    if (query === '') {
        emptySearch = 'true';
        res.render(version + '/sanctions/detail', {
            version,
            emptySearch
        })
    } else {
        registerData = getRegisterData(accountNo);

        registerData.then(result => {

            res.render(version + '/sanctions/detail', {
                version,
                registerData,
                result,
                emptySearch
            })

        }).catch(err => {
            // console.log(err);
        });
    }
}