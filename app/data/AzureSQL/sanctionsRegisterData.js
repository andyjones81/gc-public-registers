var config = require('./config');
const sql = require('mssql');


async function sanctionsRegisterData(query) {
    let sqlResult = {};
    sql.close()
    await sql.connect(config)

    let all = getAllSanctions;
    let q = searchSanctions(query);

    sqlResult['allSanctions'] = await all;
    sqlResult['searchedSanctions'] = await q;

    sql.close()
    return sqlResult;
}

async function getAllSanctions(query) {
    try {

        return await sql.query("SELECT sa.Id, ss.status, pr.AccountNo, sa.decidedon, pr.account, pr.Applicantfirstname, pr.Applicantsurname, pr.remotestatus " +
            "FROM [Sanctions] as sa  " + 
            "INNER JOIN [PublicRegisterReporting] as pr  " + 
            "ON pr.AccountNo = sa.AccountNumber  " + 
            "INNER JOIN [SanctionStatus] as ss  " + 
            "ON sa.[Status] = ss.Id  " + 
            "where sa.Enabled = 1  " + 
            "and (sa.AccountNumber)  like'%" + query + "%' " + 
            "or (sa.Status) like'%" + query + "%' " + 
            "or (ss.status)  like'%" + query + "%' " + 
            "or (pr.account)  like'%" + query + "%' " + 
            "or (pr.applicantfirstname)  like'%" + query + "%' ");

    } catch (err) {
        console.log(err);
    }
}

async function searchSanctions(query) {
    try {

        console.log('get sanctions query');
        console.log(query);

        // Make the string an array
        var nameArray = query.split(' ');
        console.log(nameArray);
        console.log(nameArray.length);
        if (nameArray.length === 1) {

            return await sql.query("SELECT sa.Id, ss.status, pr.AccountNo, sa.decision, pr.account, pr.Applicantfirstname, pr.Applicantsurname, pr.remotestatus " +
                "FROM [Sanctions] as sa " +
                "INNER JOIN [PublicRegisterReporting] as pr " +
                "ON pr.AccountNo = sa.AccountNumber " +
                "INNER JOIN [SanctionStatus] as ss " +
                "ON sa.[Status] = ss.Id " +
                "where sa.Enabled = 1 " +
                "and (sa.AccountNumber) like'%" + query + "%' " +
                "or (sa.Status) like'%" + query + "%' " +
                "or (sa.decision) like'%" + query + "%' " +
                "or (sa.account) like'%" + query + "%' " +
                "or (sa.applicantfirstname) like'%" + query + "%' ");
        }


    } catch (err) {
        console.log(err);
    }
}


module.exports = sanctionsRegisterData;