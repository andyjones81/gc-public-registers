const version = "v1"

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

exports.journey_post= function (req, res) {
       
        if(req.body.ab === undefined){
                req.session.data['ab'] = 'A'
        }

        res.redirect('/' + version + '/hub/');
}
    