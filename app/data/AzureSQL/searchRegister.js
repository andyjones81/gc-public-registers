var config = require('../../data/AzureSQL/config');
const sql = require('mssql');

async function searchRegister(query, sectorFilter, statusFilter) {
    let sqlResult = {};

    await sql.connect(config)

    let q = getAccount(query, statusFilter);
    let tn = getTradingNames(query);
    let dn = getDomainNames(query);

    sqlResult['registerData'] = await q ;
    sqlResult['tradingNames'] = await tn ;
    sqlResult['domainNames'] = await dn ;

    sql.close()
    return sqlResult;
}

async function getAccount(query, statusFilter) {
    try {

console.log('Query filter: ' + statusFilter)

        var strippedQuery = query.replace(/\s/g, '');

    
        
        if(statusFilter === undefined || statusFilter.length === 2){
            statusFilter = "Pending'" + ",'Granted";
        }
       
        

        console.log("Rendered status filter:" + statusFilter);

        return await sql.query("SELECT distinct(pr.accountno), pr.account, pr.determinationstatus from publicregisterreporting as pr " +
        "inner join [dbo].[AllDomainNames] as dn  on pr.accountno = dn.accountnumber and pr.DeterminationStatus in('"+statusFilter+"') and pr.remotestatus = 'Operator' " +
        "inner join [dbo].[AllTradingNames] as tn on pr.accountno = tn.accountno " +
        "where pr.account like '%" + query + "%' " +
        "or pr.account like '%" + strippedQuery + "%' " +
        "or dn.domainname like '%" + query + "%' " +
        "or tn.tradingname like'%" + query + "%' " + 
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
      
        console.log(err);
    }
}

async function getDomainNames(query) {
    try {
        var strippedQuery = query.replace(/\s/g, '');
        return await sql.query("SELECT * from AllDomainNames where domainname like'%" + query + "%' or domainname like '%" + strippedQuery + "%' ");
    } catch (err) {
      
        console.log(err);
    }
}


module.exports = searchRegister;