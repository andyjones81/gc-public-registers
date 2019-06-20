const version = "v1";
const _ = require('lodash');
const mobileDetect = require('mobile-detect');
const sql = require("mssql");

exports.operator_summary_get = function (req, res) {
    const d = require('../../data/register.json')


    var qs1 = d.Accounts.Account.filter(function (value) {
        return value.RemoteStatus === 'Operator';
    });

    var countOL = qs1.length;

    //Clear the search filters that may exist
    req.session.data['status'] = undefined
    req.session.data['sector'] = undefined

    var r = req.session.data['ab']
    if (r === 'A') {
        res.render(version + '/operator/summary', {
            version,
            countOL
        })
    } else {
        res.render(version + '/operator/summary-b', {
            version,
            countOL
        })
    }

}


exports.operator_search_get = function (req, res) {
    const registerData = require('../../data/register.json')

    var r = req.session.data['ab']
    if (r === 'A') {
        res.render(version + '/operator/search', {
            version,
            registerData
        })
    } else {
        res.render(version + '/operator/search-b', {
            version,
            registerData
        })
    }
}

exports.operator_download_get = function (req, res) {

    res.render(version + '/operator/download', {
        version
    })

}

exports.operator_api_get = function (req, res) {
    res.render(version + '/operator/api', {
        version
    })
}

exports.operator_results_post = function (req, res) {
    // console.log('post')
    var r = req.session.data['ab']
    const searchRegister = require('../../data/AzureSQL/searchRegister');
    let query = req.session.data['search']
    // are there any additional filters?
    var statusFilter = req.session.data['status']
    var sectorFilter = req.session.data['sector']

    var emptySearch = 'false';
    let registerData = "";

    if (query === '') {
        emptySearch = 'true';
        res.render(version + '/operator/results-b', {
            version,
            emptySearch
        })
    } else {
        registerData = searchRegister(query, sectorFilter, statusFilter);

        registerData.then(result => {

            if (r === 'A') {
                res.render(version + '/operator/results', {
                    version,
                    registerData,
                    result,
                    emptySearch
                })
            } else {

                //Is this a mobile?



                var md = new mobileDetect(req.headers['user-agent']);

                if (md.mobile() !== null) {

                    res.render(version + '/operator/results-mob', {
                        version,
                        registerData,
                        result,
                        emptySearch
                    })
                } else {
                    res.render(version + '/operator/results-b', {
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
    //     return value.RemoteStatus === 'Operator';
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
    //     res.render(version + '/operator/results', {
    //         version,
    //         registerData
    //     })
    // } else {
    //     //Is this a mobile?

    //     var md = new mobileDetect(req.headers['user-agent']);

    //     if (md.mobile() !== null) {

    //         res.render(version + '/operator/results-mob', {
    //             version,
    //             registerData
    //         })
    //     } else {
    //         res.render(version + '/operator/results-b', {
    //             version,
    //             registerData
    //         })
    //     }
    // }

}


exports.operator_results_get = function (req, res) {
    // console.log('get')
    // Value from the form
    var query = req.session.data['search']
    var registerData = [];
    var r = req.session.data['ab']
    const d = require('../../data/register.json')


    var qs1 = d.Accounts.Account.filter(function (value) {
        return value.RemoteStatus === 'Operator';
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
        res.render(version + '/operator/results', {
            version,
            registerData
        })
    } else {

        //Is this a mobile?

        var md = new mobileDetect(req.headers['user-agent']);

        if (md.mobile() !== null) {

            res.render(version + '/operator/results-mob', {
                version,
                registerData
            })
        } else {
            res.render(version + '/operator/results-b', {
                version,
                registerData
            })
        }


    }

}



exports.operator_detail_get = function (req, res) {

    // console.log('Details')

    var query = req.session.data['search']
    var accountNo = req.params.id;

    var r = req.session.data['ab']
    const getRegisterData = require('../../data/AzureSQL/getRegisterData');
    var md = new mobileDetect(req.headers['user-agent']);

    let chData = "";
    let feCHData = {};

    if (accountNo === "3238") {

      
        var auth = "Basic " + new Buffer(process.env.CompaniesHouseAPIKey + ":").toString("base64");
        var request = require('request');
        var url = "https://api.companieshouse.gov.uk/company/05310821/officers";
        
        request.get( {
            url : url,
            headers : {
                "Authorization" : auth
            }
          }, function(error, response, body) {
            feCHData = JSON.parse(response.body) 
            console.log(feCHData)       
          } );
               
    }


    var emptySearch = 'false';
    let registerData = "";

    if (query === '') {
        emptySearch = 'true';
        res.render(version + '/operator/detail', {
            version,
            emptySearch
        })
    } else {
        registerData = getRegisterData(accountNo);

        registerData.then(result => {
            if (r === 'A') {
                if (md.mobile() !== null) {
                    res.render(version + '/operator/detail-mob', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData
                    })
                } else {
                    res.render(version + '/operator/detail', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData
                    })
                }
            } else {



                if (md.mobile() !== null) {

                    res.render(version + '/operator/detail-mob', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData
                    })
                } else {

                    res.render(version + '/operator/detail-b', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData
                    })
                }
            }

        }).catch(err => {
            // console.log(err);
        });
    }
}