var config = require('../../data/AzureSQL/config');
const sql = require('mssql');


async function searchPersonalRegister(query) {
    let sqlResult = {};
    sql.close()
    await sql.connect(config)

    let q = getAccount(query);


    sqlResult['registerData'] = await q;

    sql.close()
    return sqlResult;
}

async function getAccount(query) {
    try {

        // console.log('Query filter: ' + statusFilter)
        console.log('GetAccount query');
        console.log(query);

        // Make the string an array
        var nameArray = query.split(' ');
        console.log(nameArray);
        console.log(nameArray.length);
        if (nameArray.length === 1) {
       
            return await sql.query("SELECT distinct(pr.accountno), pr.account, pr.towncity, pr.Applicantfirstname, ProcessEndDate, pr.Applicantsurname " +
                "FROM PublicRegisterReporting pr " +
                "WHERE Applicantfirstname like '%" + nameArray[0] + "%' " +
                "or Applicantsurname like '" + nameArray[0] + "%' " +
                "or accountno like '" + nameArray[0] + "%' " +
                "and pr.RemoteStatus = 'Personal' " +
                "order by pr.Applicantfirstname asc");
        } else if (nameArray.length > 1) {
        
            return await sql.query("SELECT distinct(pr.accountno), pr.account, pr.towncity, pr.Applicantfirstname,ProcessEndDate, pr.Applicantsurname " +
                "FROM PublicRegisterReporting pr " +  
                "WHERE Applicantfirstname like '%" + nameArray[0] + "%' " +
                "and (Applicantsurname like '" + nameArray[1] + "%') " +
                "and (pr.RemoteStatus = 'Personal') " +       
                "or accountno like '" + nameArray[0] + "%' " +
                "or accountno like '" + nameArray[1] + "%' " +       
                "order by pr.Applicantfirstname asc");
        } else {
            return await sql.query("SELECT distinct(pr.accountno), pr.account, pr.towncity, pr.Applicantfirstname,ProcessEndDate, pr.Applicantsurname " +
                "FROM PublicRegisterReporting pr " +
                "WHERE Applicantfirstname like '%" + nameArray[0] + "%' " +
                "and Applicantsurname like '" + nameArray[1] + "%' " +
                "and pr.RemoteStatus = 'Personal'" +
                "or accountno like '" + nameArray[0] + "%' " +
                "or accountno like '" + nameArray[1] + "%' " +
                "order by pr.Applicantfirstname asc");
        }


    } catch (err) {
        console.log(err);
    }
}




module.exports = searchPersonalRegister;