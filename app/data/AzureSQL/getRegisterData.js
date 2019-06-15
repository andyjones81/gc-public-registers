var config = require('../../data/AzureSQL/config');
const sql = require('mssql');


async function getRegisterData(query) {
    let sqlResult = {};
    sql.close()
    await sql.connect(config)

    let q = getOLDetail(query);
    let tn = getOLTradingNames(query);
    let dn = getOLDomainNames(query);
    let san = getOLSanctions(query);
    let act = getOLActivities(query);

    sqlResult['registerData'] = await q ;
    sqlResult['tradingNames'] = await tn ;
    sqlResult['domainNames'] = await dn ;
    sqlResult['activities'] = await act ;    
    sqlResult['sanctions'] = await san ;

    sql.close()
    return sqlResult;
}

async function getOLDetail(query) {
 
        try {

            return await sql.query("SELECT * from publicregisterreporting where accountno = "+query);
        } catch (err) {
          
            console.log(err);
        }

    
}

async function getOLTradingNames(query) {
    try {

        return await sql.query("SELECT * from AllTradingNames where accountno = "+query);
    } catch (err) {
      
        console.log(err);
    }
}

async function getOLDomainNames(query) {
    try {

        return await sql.query("SELECT * from AllDomainNames where accountnumber = "+query);
    } catch (err) {
      
        console.log(err);
    }
}

async function getOLActivities(query) {
    try {

        return await sql.query("SELECT * from AccountProductsList where accountno = "+query);
    } catch (err) {
      
        console.log(err);
    }
}

async function getOLSanctions(query) {
    try {

        return await sql.query("SELECT * from sanctions where accountnumber = "+query);
    } catch (err) {
      
        console.log(err);
    }
}

module.exports = getRegisterData;