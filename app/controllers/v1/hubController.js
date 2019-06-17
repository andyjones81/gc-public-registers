const version = "v1";
const _ = require('lodash');
var mobileDetect = require('mobile-detect')

exports.home_get = function (req, res) {

        if (req.session.data['ab'] === undefined) {
                res.render(version + '/hub/journey');
        } else {

                const d = require('../../data/register.json')

                var qs1 = d.Accounts.Account.filter(function (value) {
                        return value.RemoteStatus === 'Operator';
                });
                var qs2 = d.Accounts.Account.filter(function (value) {
                        return value.RemoteStatus === 'Personal';
                });

                var countOL = qs1.length;
                var countPL = qs2.length;

                var r = req.session.data['ab']

                if (r === 'A') {
                        res.render(version + '/hub/index', {
                                version,
                                countOL,
                                countPL
                        })
                } else {
                        res.render(version + '/hub/index-b', {
                                version,
                                countOL,
                                countPL
                        })
                }
        }
}

exports.journey_post = function (req, res) {

        if (req.body.ab === undefined) {
                req.session.data['ab'] = 'A'
        }

        res.redirect('/' + version + '/hub/');
}



exports.hub_results_post = function (req, res) {
        // console.log('post')
        // Value from the form

        // ('start')
        var query = req.session.data['search']

        var r = req.session.data['ab']
        const d = require('../../data/register.json')
        var registerData = d;
        var plRegisterData = d;


        var qs1 = d.Accounts.Account.filter(function (value) {
                return value.RemoteStatus === 'Operator';
        });

        var qs2 = d.Accounts.Account.filter(function (value) {
                return value.RemoteStatus === 'Personal';
        });




        if (query !== undefined) {
                registerData = _.filter(qs1, function (a) {
                        if ((a.Account.toLowerCase().indexOf((query).toLowerCase()) !== -1) ||
                                (a.AccountNo.indexOf((query)) !== -1))
                                return a;
                });
        }

        if (query !== undefined) {
                plRegisterData = _.filter(qs2, function (a) {
                        if ((a.Account.toLowerCase().indexOf((query).toLowerCase()) !== -1) ||
                                (a.AccountNo.indexOf((query)) !== -1))
                                return a;
                });
        }

        registerData = _.orderBy(registerData, ['Account'], ['asc']);
        plRegisterData = _.orderBy(plRegisterData, ['Applicantfirstname'], ['asc']);

        console.log(plRegisterData)

        if (r === 'A') {
                res.render(version + '/hub/results', {
                        version,
                        registerData,
                        plRegisterData
                })
        } else {
                //Is this a mobile?

                var md = new mobileDetect(req.headers['user-agent']);

                if (md.mobile() !== null) {

                        res.render(version + '/hub/results', {
                                version,
                                registerData,
                                plRegisterData
                        })
                } else {
                        res.render(version + '/hub/results', {
                                version,
                                registerData,
                                plRegisterData
                        })
                }
        }

}


