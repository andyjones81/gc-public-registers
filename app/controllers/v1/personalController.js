const version = "v1";
const _ = require('lodash');
const mobileDetect = require('mobile-detect');
const sql = require("mssql");

exports.personal_summary_get = function (req, res) {
    const d = require('../../data/register.json')


    var qs1 = d.Accounts.Account.filter(function (value) {
        return value.RemoteStatus === 'personal';
    });

    var countOL = qs1.length;

    //Clear the search filters that may exist
    req.session.data['status'] = undefined
    req.session.data['sector'] = undefined

    var r = req.session.data['ab']
    if (r === 'A') {
        res.render(version + '/personal/summary', {
            version,
            countOL
        })
    } else {
        res.render(version + '/personal/summary-b', {
            version,
            countOL
        })
    }

}


exports.personal_search_get = function (req, res) {
    const registerData = require('../../data/register.json')

    var r = req.session.data['ab']
    if (r === 'A') {
        res.render(version + '/personal/search', {
            version,
            registerData
        })
    } else {
        res.render(version + '/personal/search-b', {
            version,
            registerData
        })
    }
}

exports.personal_download_get = function (req, res) {

    res.render(version + '/personal/download', {
        version
    })

}

exports.personal_api_get = function (req, res) {
    res.render(version + '/personal/api', {
        version
    })
}

exports.personal_results_post = function (req, res) {
     console.log('Personal: POST')
    var r = req.session.data['ab']
    const searchRegister = require('../../data/AzureSQL/searchPersonalRegister');
    let query = req.session.data['search']
 
    console.log(query)

    var emptySearch = 'false';
    let registerData = "";

    if (query === '') {
        console.log('Empty query')
        emptySearch = 'true';
        res.render(version + '/personal/results-b', {
            version,
            emptySearch
        })
    } else {
        
        console.log('Search PL data')
        registerData = searchRegister(query);
        console.log('Data:' +registerData)
        registerData.then(result => {

    if (r === 'A') {
        res.render(version + '/personal/results', {
            version,
            registerData,
            result,
            emptySearch
        })
    } else {

            //Is this a mobile?



            var md = new mobileDetect(req.headers['user-agent']);

            if (md.mobile() !== null) {

                res.render(version + '/personal/results-mob', {
                    version,
                    registerData,
                    result,
                    emptySearch
                })
            } else {
                res.render(version + '/personal/results', {
                    version,
                    registerData,
                    result,
                    emptySearch
                })
            }
        }


        }).catch(err => {
           //  console.log(err);
        });
    }

    // var r = req.session.data['ab']
    // const d = require('../../data/register.json')



    // var qs1 = d.Accounts.Account.filter(function (value) {
    //     return value.RemoteStatus === 'personal';
    // });

    // console.log('qs1')

    // if (query === undefined) {
    //     registerData = _.orderBy(qs1, ['Account'], ['asc']);
    // } else {
    //     registerData = _.filter(qs1, function (a) {
    //         if ((a.Account.toLowerCase().indexOf((query).toLowerCase()) !== -1) ||
    //             (a.AccountNo.indexOf((query)) !== -1))
    //             return a;
    //     });
    // }

    // 

    // console.log('filters - start')

    // console.log(statusFilter)
    // console.log(sectorFilter)
    // console.log('filters - end')

    // if (statusFilter !== undefined) {
    //     console.log('inside the filtering')
    //     if (statusFilter.length !== 2) {
    //         registerData = _.filter(registerData, function (a) {
    //             if (a.DeterminationStatus.indexOf((statusFilter)) !== -1)
    //                 return a;
    //         });
    //     }
    // }

    // registerData = _.orderBy(registerData, ['Account'], ['asc']);


    // if (r === 'A') {
    //     res.render(version + '/personal/results', {
    //         version,
    //         registerData
    //     })
    // } else {
    //     //Is this a mobile?

    //     var md = new mobileDetect(req.headers['user-agent']);

    //     if (md.mobile() !== null) {

    //         res.render(version + '/personal/results-mob', {
    //             version,
    //             registerData
    //         })
    //     } else {
    //         res.render(version + '/personal/results-b', {
    //             version,
    //             registerData
    //         })
    //     }
    // }

}


exports.personal_results_get = function (req, res) {
    // console.log('get')
    // Value from the form
    var query = req.session.data['search']
    var registerData = [];
    var r = req.session.data['ab']
    const d = require('../../data/register.json')


    var qs1 = d.Accounts.Account.filter(function (value) {
        return value.RemoteStatus === 'personal';
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
        res.render(version + '/personal/results', {
            version,
            registerData
        })
    } else {

        //Is this a mobile?

        var md = new mobileDetect(req.headers['user-agent']);

        if (md.mobile() !== null) {

            res.render(version + '/personal/results-mob', {
                version,
                registerData
            })
        } else {
            res.render(version + '/personal/results-b', {
                version,
                registerData
            })
        }


    }

}



exports.personal_detail_get = function (req, res) {

    // console.log('Details')

    var query = req.session.data['search']
    var accountNo = req.params.id;
    var r = req.session.data['ab']

    const getRegisterData = require('../../data/AzureSQL/getRegisterData');

    console.log("Detail Get: " + r)

    var emptySearch = 'false';
    let registerData = "";

    if (query === '') {
        emptySearch = 'true';
        res.render(version + '/personal/detail', {
            version,
            emptySearch
        })
    } else {
        registerData = getRegisterData(accountNo);

        registerData.then(result => {

            res.render(version + '/personal/detail', {
                version,
                registerData,
                result,
                emptySearch, 
                r
            })

        }).catch(err => {
            // console.log(err);
        });
    }
}