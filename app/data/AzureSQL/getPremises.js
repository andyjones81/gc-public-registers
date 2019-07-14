var config = require('./config');
const sql = require('mssql');


async function getPremises(query) {

    let sqlResult = {};
    sql.close()

  
        await sql.connect(config) 
        let q = GetPremises(query);
        sqlResult['getPremises'] = await q;
    


    sql.close()
    return sqlResult;
}




async function GetPremises(query) {
    try {

        console.log('Get premises: ' + query);


        return await sql.query("SELECT ad.id, pr.[accountno], ad.[addressline1], ad.[addressline2], ad.[city], ad.[postcode], ad.[country], ad.[active], ad.[localauthority], ad.[activity], pr.Account " +
            "FROM [dbo].[addresslist] as ad inner join [dbo].[PublicRegisterReporting] as pr on pr.AccountNo = ad.accountno " +
            "where (ad.id) = "+ query);

    } catch (err) {
        console.log(err);
    }
}

module.exports = getPremises;