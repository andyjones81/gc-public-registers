var config = require('./config');
const sql = require('mssql');


async function searchPremises(query, one) {

    let sqlResult = {};
    sql.close()

   
    await sql.connect(config) 
    let q = search(query);
    sqlResult['premises'] = await q;
   

   

    sql.close()
    return sqlResult;
}


async function search(query) {
    try {

        console.log('Search premises: ' + query);


        return await sql.query("SELECT ad.id, pr.[accountno], ad.[addressline1], ad.[addressline2], ad.[city], ad.[postcode], ad.[country], ad.[active], ad.[localauthority], ad.[activity], pr.Account " +
            "FROM [dbo].[addresslist] as ad inner join [dbo].[PublicRegisterReporting] as pr on pr.AccountNo = ad.accountno " +
            "where (pr.accountno) like'%" + query + "%' " +
            "or (ad.addressline1) like'%" + query + "%' " +
            "or (ad.city) like'%" + query + "%' " +
            "or (ad.postcode) like'%" + query + "%' " +
            "or (pr.account) like'%" + query + "%' " +
            "or (ad.localauthority) like'%" + query + "%' " +            
            "or (ad.activity) like'%" + query + "%' " +
            "order by ad.activity");

    } catch (err) {
        console.log(err);
    }
}



module.exports = searchPremises;