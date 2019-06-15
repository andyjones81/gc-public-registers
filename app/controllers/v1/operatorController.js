const version = "v1";
const _ = require('lodash');
var mobileDetect = require('mobile-detect')
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;



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

exports.operator_results_post = function (req, res) {
    console.log('post')

    var searchResultData;

// Create connection to database
var config =
{
    authentication: {
        options: {
            userName: process.env.DBUser,
            password: process.env.DBPassword
        },
        type: 'default'
    },
    server: process.env.DBServer,
    options:
    {
        database: process.env.DBName,
        encrypt: true
    }
}
var connection = new Connection(config);




function getOperators(query)
{
  var request = new Request(
      "SELECT * from publicregisterreporting as pr " +
      "left join [dbo].[AllDomainNames] as dn  on pr.accountno = dn.accountnumber "+
      "left join [dbo].[AllTradingNames] as tn "+
      "on pr.accountno = tn.accountno "+
      "where pr.remotestatus = 'operator' "+
      "and pr.account like '%"+ query +"%' "+
      "or dn.domainname like '%"+ query +"%' "+
      "or tn.tradingname like'%"+ query +"%' "+
      "order by pr.account",

      function(err, rowCount, rows)
      {
        searchResultData = rows;
      }
  );


  connection.execSql(request);
}

var query = req.session.data['search']

connection.on('connect', function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
           getOperators(query)
        }
    }
);



    console.log(searchResultData)
    
    var registerData = [];
    var r = req.session.data['ab']
    const d = require('../../data/register.json')

    console.log(query)

    var qs1 = d.Accounts.Account.filter(function (value) {
        return value.RemoteStatus === 'Operator';
    });

    console.log('qs1')

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

    console.log('filters - start')

    console.log(statusFilter)
    console.log(sectorFilter)
    console.log('filters - end')

    if (statusFilter !== undefined) {
        console.log('inside the filtering')
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


exports.operator_results_get = function (req, res) {
    console.log('get')
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

    console.log(query)
    console.log(statusFilter)
    console.log(sectorFilter)

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
    const d = require('../../data/register.json')



    var qs1 = d.Accounts.Account.filter(function (value) {
        return value.RemoteStatus === 'Operator';
    });


    var registerData = qs1.filter(function (value) {
        return value.AccountNo === req.params.id;
    })[0];




    var r = req.session.data['ab']
    if (r === 'A') {
        res.render(version + '/operator/detail', {
            version,
            registerData
        })
    } else {
        res.render(version + '/operator/detail-b', {
            version,
            registerData
        })
    }
}