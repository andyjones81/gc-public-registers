const version = "v2";
const _ = require('lodash');
const mobileDetect = require('mobile-detect');
const sql = require("mssql");
const winston = require('winston')
var premisesEnabled = process.env.EnablePremises;
var EnableCH = 'true';
const adr = require('../../data/adr.json');

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
    var EnableCH = 'true';
    var r = req.session.data['ab']
    const getRegisterData = require('../../data/AzureSQL/getRegisterData');


    var md = new mobileDetect(req.headers['user-agent']);

    let chData = "";
    let feCHData = {};
    var detailView = process.env.DetailView;

    const d = require('../../data/companies.json')

    console.log(d);

    var ch = d.filter(function (value) {
        return value.Account === accountNo;
    });

    var adrdata = adr.filter(function (value) {
        return value.AccountNo === accountNo;
    });

    console.log(ch)
    console.log(ch.length)

    console.log("adr: " + adrdata)

    if (ch.length === 0 || process.env.EnableCH === 'false') {
        EnableCH = 'false';
    }

    console.log("Enable CH: " + EnableCH)


    var emptySearch = 'false';
    let registerData = "";

    if (query === '') {
        emptySearch = 'true';
        res.render(version + '/operator/detail', {
            version,
            emptySearch,
            detailView
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
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                } else {
                    res.render(version + '/operator/detail', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                }
            } else {



                if (md.mobile() !== null) {

                    res.render(version + '/operator/detail-mob', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                } else {

                    res.render(version + '/operator/detail-b', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                }
            }

        }).catch(err => {
            // console.log(err);
        });
    }
}

exports.operator_companydetail_get = function (req, res) {

    // console.log('Details')

    var query = req.session.data['search']
    var accountNo = req.params.id;

    var r = req.session.data['ab']
    const getRegisterData = require('../../data/AzureSQL/getRegisterData');


    var md = new mobileDetect(req.headers['user-agent']);

    let chData = "";
    let feCHData = {};
    var detailView = process.env.DetailView;

    const d = require('../../data/companies.json')

    var ch = d.filter(function (value) {
        return value.Account === accountNo;
    });

    var adrdata = adr.filter(function (value) {
        return value.AccountNo === accountNo;
    });

    console.log("ch: " + ch)

    console.log("adr: " + adrdata)

    if (ch.length === 0) {
        EnableCH = 'false';
    }

    console.log(EnableCH)


    var emptySearch = 'false';
    let registerData = "";

    if (query === '') {
        emptySearch = 'true';
        res.render(version + '/operator/detail', {
            version,
            emptySearch,
            detailView
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
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                } else {
                    res.render(version + '/operator/detail', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                }
            } else {



                if (md.mobile() !== null) {

                    res.render(version + '/operator/detail-mob', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                } else {

                    res.render(version + '/operator/company-detail', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                }
            }

        }).catch(err => {
            // console.log(err);
        });
    }
}

exports.operator_tradingnames_get = function (req, res) {

    // console.log('Details')

    var query = req.session.data['search']
    var accountNo = req.params.id;

    var r = req.session.data['ab']
    const getRegisterData = require('../../data/AzureSQL/getRegisterData');
    var md = new mobileDetect(req.headers['user-agent']);

    var adrdata = adr.filter(function (value) {
        return value.AccountNo === accountNo;
    });
    let chData = "";
    let feCHData = {};
    var detailView = process.env.DetailView;


    const d = require('../../data/companies.json')

    var ch = d.filter(function (value) {
        return value.Account === accountNo;
    });

    console.log(ch)

    if (ch.length === 0) {
        EnableCH = 'false';
    }




    var emptySearch = 'false';
    let registerData = "";

    if (query === '') {
        emptySearch = 'true';
        res.render(version + '/operator/detail', {
            version,
            emptySearch,
            detailView
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
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                } else {
                    res.render(version + '/operator/detail', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                }
            } else {



                if (md.mobile() !== null) {

                    res.render(version + '/operator/detail-mob', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                } else {

                    res.render(version + '/operator/tradingnames', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                }
            }

        }).catch(err => {
            // console.log(err);
        });
    }
}
exports.operator_domainnames_get = function (req, res) {

    // console.log('Details')

    var query = req.session.data['search']
    var accountNo = req.params.id;

    var r = req.session.data['ab']
    const getRegisterData = require('../../data/AzureSQL/getRegisterData');
    var md = new mobileDetect(req.headers['user-agent']);

    var adrdata = adr.filter(function (value) {
        return value.AccountNo === accountNo;
    });
    let chData = "";
    let feCHData = {};
    var detailView = process.env.DetailView;
    const d = require('../../data/companies.json')

    var ch = d.filter(function (value) {
        return value.Account === accountNo;
    });

    console.log(ch)

    if (ch.length === 0) {
        EnableCH = 'false';
    }



    var emptySearch = 'false';
    let registerData = "";

    if (query === '') {
        emptySearch = 'true';
        res.render(version + '/operator/detail', {
            version,
            emptySearch,
            detailView
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
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                } else {
                    res.render(version + '/operator/detail', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                }
            } else {



                if (md.mobile() !== null) {

                    res.render(version + '/operator/detail-mob', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                } else {

                    res.render(version + '/operator/domainnames', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                }
            }

        }).catch(err => {
            // console.log(err);
        });
    }
}

exports.operator_sanctions_get = function (req, res) {

    // console.log('Details')

    var query = req.session.data['search']
    var accountNo = req.params.id;

    var r = req.session.data['ab']
    const getRegisterData = require('../../data/AzureSQL/getRegisterData');
    var md = new mobileDetect(req.headers['user-agent']);

    var adrdata = adr.filter(function (value) {
        return value.AccountNo === accountNo;
    });
    let chData = "";
    let feCHData = {};
    var detailView = process.env.DetailView;
    const d = require('../../data/companies.json')

    var ch = d.filter(function (value) {
        return value.Account === accountNo;
    });

    console.log(ch)

    if (ch.length === 0) {
        EnableCH = 'false';
    }



    var emptySearch = 'false';
    let registerData = "";

    if (query === '') {
        emptySearch = 'true';
        res.render(version + '/operator/detail', {
            version,
            emptySearch,
            detailView,
            premisesEnabled
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
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                } else {
                    res.render(version + '/operator/detail', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                }
            } else {



                if (md.mobile() !== null) {

                    res.render(version + '/operator/detail-mob', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                } else {

                    res.render(version + '/operator/sanctions', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                }
            }

        }).catch(err => {
            // console.log(err);
        });
    }
}

exports.operator_settlements_get = function (req, res) {

    // console.log('Details')

    var query = req.session.data['search']
    var accountNo = req.params.id;

    var r = req.session.data['ab']
    const getRegisterData = require('../../data/AzureSQL/getRegisterData');
    var md = new mobileDetect(req.headers['user-agent']);

    let chData = "";
    let feCHData = {};
    var detailView = process.env.DetailView;
    const d = require('../../data/companies.json')

    var adrdata = adr.filter(function (value) {
        return value.AccountNo === accountNo;
    });
    var ch = d.filter(function (value) {
        return value.Account === accountNo;
    });

    console.log(ch)

    if (ch.length === 0) {
        EnableCH = 'false';
    }



    var emptySearch = 'false';
    let registerData = "";

    if (query === '') {
        emptySearch = 'true';
        res.render(version + '/operator/detail', {
            version,
            emptySearch,
            detailView,
            premisesEnabled
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
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                } else {
                    res.render(version + '/operator/detail', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                }
            } else {



                if (md.mobile() !== null) {

                    res.render(version + '/operator/detail-mob', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                } else {

                    res.render(version + '/operator/settlements', {
                        version,
                        registerData,
                        result,
                        emptySearch,
                        feCHData,
                        detailView,
                        premisesEnabled,
                        EnableCH,
                        adrdata
                    })
                }
            }

        }).catch(err => {
            // console.log(err);
        });
    }
}


exports.operator_premises_get = function (req, res) {

    // console.log('Details')

    if (premisesEnabled !== 'true') {
        res.redirect('/denied')
    } else {

        var query = req.session.data['search']
        var accountNo = req.params.id;

        var r = req.session.data['ab']
        const getRegisterData = require('../../data/AzureSQL/getRegisterData');
        var md = new mobileDetect(req.headers['user-agent']);

        var adrdata = adr.filter(function (value) {
            return value.AccountNo === accountNo;
        });
        let chData = "";
        let feCHData = {};
        var detailView = process.env.DetailView;
        const d = require('../../data/companies.json')

        var ch = d.filter(function (value) {
            return value.Account === accountNo;
        });

        console.log(ch)

        if (ch.length === 0) {
            EnableCH = 'false';
        }


        var emptySearch = 'false';
        let registerData = "";

        if (query === '') {
            emptySearch = 'true';
            res.render(version + '/operator/detail', {
                version,
                emptySearch,
                detailView,
                premisesEnabled
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
                            feCHData,
                            detailView,
                            premisesEnabled,
                            EnableCH,
                            adrdata
                        })
                    } else {
                        res.render(version + '/operator/detail', {
                            version,
                            registerData,
                            result,
                            emptySearch,
                            feCHData,
                            detailView,
                            premisesEnabled,
                            EnableCH,
                            adrdata
                        })
                    }
                } else {



                    if (md.mobile() !== null) {

                        res.render(version + '/operator/detail-mob', {
                            version,
                            registerData,
                            result,
                            emptySearch,
                            feCHData,
                            detailView,
                            premisesEnabled,
                            EnableCH,
                            adrdata
                        })
                    } else {

                        res.render(version + '/operator/premises', {
                            version,
                            registerData,
                            result,
                            emptySearch,
                            feCHData,
                            detailView,
                            premisesEnabled,
                            EnableCH,
                            adrdata
                        })
                    }
                }

            }).catch(err => {
                // console.log(err);
            });
        }
    }
}

exports.operator_company_get = function (req, res) {

    if (EnableCH !== 'true') {
        res.redirect('/denied')
    } else {

        var query = req.session.data['search']
        var accountNo = req.params.id;

        var r = req.session.data['ab']
        const getRegisterData = require('../../data/AzureSQL/getRegisterData');
        var md = new mobileDetect(req.headers['user-agent']);

        let chData = "";
        let feCHData = {};
        let feCHDataSummary = {};


        var adrdata = adr.filter(function (value) {
            return value.AccountNo === accountNo;
        });

        var detailView = process.env.DetailView;
        if (EnableCH === 'true') {

            const d = require('../../data/companies.json')

            var ch = d.filter(function (value) {
                return value.Account === accountNo;
            });

            var chNumber = ch[0].CompanyNumber

            var auth = "Basic " + new Buffer(process.env.CompaniesHouseAPIKey + ":").toString("base64");
            var request = require('request');
            var url = "https://api.companieshouse.gov.uk/company/" + chNumber + "/officers";


            request.get({
                url: url,
                headers: {
                    "Authorization": auth
                }
            }, function (error, response, body) {
                feCHData = JSON.parse(response.body)
                // console.log(feCHData)
            });

            url = "https://api.companieshouse.gov.uk/search/companies";


            request.get({
                url: url,
                headers: {
                    "Authorization": auth
                }
            }, function (error, response, body) {
                feCHData = JSON.parse(response.body)
                // console.log(feCHData)
            });

        }


        var emptySearch = 'false';
        let registerData = "";

        if (query === '') {
            emptySearch = 'true';
            res.render(version + '/operator/detail', {
                version,
                emptySearch,
                detailView,
                premisesEnabled
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
                            feCHData,
                            detailView,
                            premisesEnabled,
                            EnableCH,
                            adrdata
                        })
                    } else {
                        res.render(version + '/operator/detail', {
                            version,
                            registerData,
                            result,
                            emptySearch,
                            feCHData,
                            detailView,
                            premisesEnabled,
                            EnableCH,
                            adrdata
                        })
                    }
                } else {



                    if (md.mobile() !== null) {

                        res.render(version + '/operator/detail-mob', {
                            version,
                            registerData,
                            result,
                            emptySearch,
                            feCHData,
                            detailView,
                            premisesEnabled,
                            EnableCH,
                            adrdata
                        })
                    } else {

                        res.render(version + '/operator/company', {
                            version,
                            registerData,
                            result,
                            emptySearch,
                            feCHData,
                            detailView,
                            premisesEnabled,
                            EnableCH,
                            adrdata
                        })
                    }
                }

            }).catch(err => {
                // console.log(err);
            });
        }
    }
}

exports.operator_company_summary_get = function (req, res) {

    if (EnableCH !== 'true') {
        res.redirect('/denied')
    } else {

        var query = req.session.data['search']
        var accountNo = req.params.id;

        var r = req.session.data['ab']
        const getRegisterData = require('../../data/AzureSQL/getRegisterData');
        var md = new mobileDetect(req.headers['user-agent']);

        let chData = "";
        let feCHData = {};
        let feCHDataSummary = {};


        var adrdata = adr.filter(function (value) {
            return value.AccountNo === accountNo;
        });

        var detailView = process.env.DetailView;
        if (EnableCH === 'true') {

            const d = require('../../data/companies.json')


            var ch = d.filter(function (value) {
                return value.Account === accountNo;
            });

            var chNumber = ch[0].CompanyNumber

            var auth = "Basic " + new Buffer(process.env.CompaniesHouseAPIKey + ":").toString("base64");
            var request = require('request');
            var url = "https://api.companieshouse.gov.uk/company/" + chNumber + "/officers";


            request.get({
                url: url,
                headers: {
                    "Authorization": auth
                }
            }, function (error, response, body) {
                feCHData = JSON.parse(response.body)
                // console.log(feCHData)
            });

            url = "https://api.companieshouse.gov.uk/search/companies?q=" + chNumber;


            request.get({
                url: url,
                headers: {
                    "Authorization": auth
                }
            }, function (error, response, body) {
                feCHDataSummary = JSON.parse(response.body)
                // console.log(feCHData)
            });

        }


        var emptySearch = 'false';
        let registerData = "";

        if (query === '') {
            emptySearch = 'true';
            res.render(version + '/operator/detail', {
                version,
                emptySearch,
                detailView,
                premisesEnabled
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
                            feCHData,
                            detailView,
                            premisesEnabled,
                            EnableCH,
                            adrdata
                        })
                    } else {
                        res.render(version + '/operator/detail', {
                            version,
                            registerData,
                            result,
                            emptySearch,
                            feCHData,
                            detailView,
                            premisesEnabled,
                            EnableCH,
                            adrdata
                        })
                    }
                } else {



                    if (md.mobile() !== null) {

                        res.render(version + '/operator/detail-mob', {
                            version,
                            registerData,
                            result,
                            emptySearch,
                            feCHData,
                            detailView,
                            premisesEnabled,
                            EnableCH,
                            adrdata
                        })
                    } else {

                        res.render(version + '/operator/company-summary', {
                            version,
                            registerData,
                            result,
                            emptySearch,
                            feCHData,
                            detailView,
                            premisesEnabled,
                            EnableCH,
                            adrdata,
                            feCHDataSummary
                        })
                    }
                }

            }).catch(err => {
                // console.log(err);
            });
        }
    }
}