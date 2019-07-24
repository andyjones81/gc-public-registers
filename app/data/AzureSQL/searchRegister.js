var config = require('../../data/AzureSQL/config');
const sql = require('mssql');


async function searchRegister(query, sectorFilter, statusFilter) {
    let sqlResult = {};
    sql.close()
    await sql.connect(config)

    let q = getAccount(query, statusFilter, sectorFilter);
    let tn = getTradingNames(query);
    let dn = getDomainNames(query);
    let tnc = getTradingNameCount(query);
    let dnc = getDomainNameCount(query);


    sqlResult['registerData'] = await q;
    sqlResult['tradingNames'] = await tn;
    sqlResult['domainNames'] = await dn;
    sqlResult['allTNCount'] = await tnc;

    sqlResult['allDNCount'] = await dnc;

    sql.close()
    return sqlResult;
}

async function getAccount(query, statusFilter, sectorFilter) {
    try {

        console.log('Status filter: ' + statusFilter)
        console.log('Sector filter: ' + sectorFilter)

        var strippedQuery = query.replace(/\s/g, '');

        if(statusFilter === undefined)
        {
            statusFilter = "inner join [dbo].[AccountProductsList] as ap on ap.AccountNo = pr.AccountNo and ap.DeterminationStatus in('Pending', 'Lapsed', 'Forfeited', 'Granted', 'Revoked', 'Surrendered', 'Suspended') ";
        }


        // console.log("Rendered status filter:" + statusFilter);

        return await sql.query("SELECT distinct(pr.accountno), pr.account, pr.determinationstatus from publicregisterreporting as pr " +
            "left join [dbo].[AllDomainNames] as dn  on pr.accountno = dn.accountnumber and pr.remotestatus = 'Operator' " +
            "left join [dbo].[AllTradingNames] as tn on pr.accountno = tn.accountno " +
                 "where pr.account like '%" + query + "%' " +
            "or pr.account like '%" + strippedQuery + "%' " +
            "or dn.domainname like '%" + query + "%' " +
            "or tn.tradingname like'%" + query + "%' " +
            "or tn.tradingname like'%" + strippedQuery + "%' " +
            "or pr.accountno like'%" + query + "%' " +
            "order by pr.account");
    } catch (err) {

        console.log(err);
    }
}


async function getTradingNames(query) {
    try {
        var strippedQuery = query.replace(/\s/g, '');

        return await sql.query("SELECT * from AllTradingNames where tradingname like '%" + query + "%' or tradingname like '%" + strippedQuery + "%' ");
    } catch (err) {

        // console.log(err);
    }
}

async function getDomainNames(query) {
    try {
        var strippedQuery = query.replace(/\s/g, '');
        return await sql.query("SELECT * from AllDomainNames where domainname like'%" + query + "%' or domainname like '%" + strippedQuery + "%' ");
    } catch (err) {

        // console.log(err);
    }
}


async function getTradingNameCount(query) {
    try {
        return await sql.query("SELECT accountNo, count(*) as countof  FROM [dbo].[AllTradingNames]   group by accountNo");
    } catch (err) {

        // console.log(err);
    }
}

async function getDomainNameCount(query) {
    try {
        return await sql.query("SELECT AccountNumber, count(*) as countof  FROM [dbo].[AllDomainNames]   group by AccountNumber");
    } catch (err) {

        console.log(err);
    }
}



module.exports = searchRegister;