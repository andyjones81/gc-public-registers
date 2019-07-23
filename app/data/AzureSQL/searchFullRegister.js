var config = require('../../data/AzureSQL/config');
const sql = require('mssql');


async function searchFullRegister(query, sectorFilter, statusFilter) {
    let sqlResult = {};
    sql.close()
    await sql.connect(config)

    let q = getAccount(query, statusFilter);
    let pl = getPAccount(query);
    let tn = getTradingNames(query);
    let dn = getDomainNames(query);
    let sq = searchSanctions(query);

    let p = searchPremises(query);


    sqlResult['registerData'] = await q ;
    sqlResult['personalData'] = await pl ;
    sqlResult['tradingNames'] = await tn ;
    sqlResult['domainNames'] = await dn ;
    sqlResult['searchedSanctions'] = await sq;
    
    sqlResult['premises'] = await p;

    sql.close()
    return sqlResult;
}

async function searchPremises(query) {
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

async function searchSanctions(query) {
    try {

        console.log('get sanctions query');
        console.log(query);

        // Make the string an array
        var nameArray = query.split(' ');
        console.log(nameArray);
        console.log(nameArray.length);
        if (nameArray.length === 1) {

            return await sql.query("SELECT sa.Id, ss.status, pr.AccountNo, sa.decidedon, pr.account, pr.Applicantfirstname, pr.Applicantsurname, pr.remotestatus " +
                "FROM [Sanctions] as sa " +
                "INNER JOIN [PublicRegisterReporting] as pr " +
                "ON pr.AccountNo = sa.AccountNumber " +
                "INNER JOIN [SanctionStatus] as ss " +
                "ON sa.[Status] = ss.Id " +
                "where sa.Enabled = 1 " +
                "and (sa.AccountNumber) like'%" + query + "%' " +
                "or (sa.Status) like'%" + query + "%' " +
                "or (pr.account) like'%" + query + "%' " +
                "or (pr.Applicantfirstname) like'%" + query + "%' ");
        }


    } catch (err) {
        console.log(err);
    }
}

async function getAccount(query, statusFilter) {
    try {

console.log('Query filter: ' + statusFilter)

        var strippedQuery = query.replace(/\s/g, '');

    
        
        if(statusFilter === undefined || statusFilter.length === 2){
            statusFilter = "Pending'" + ",'Granted";
        }
       
        

        // console.log("Rendered status filter:" + statusFilter);

        return await sql.query("SELECT distinct(pr.accountno), pr.account, pr.determinationstatus from publicregisterreporting as pr " +
        "left join [dbo].[AllDomainNames] as dn  on pr.accountno = dn.accountnumber and pr.DeterminationStatus in('"+statusFilter+"') " +
        "left join [dbo].[AllTradingNames] as tn on pr.accountno = tn.accountno " +
        "where pr.account like '%" + query + "%' " +
        "or pr.account like '%" + strippedQuery + "%' " +
        "or dn.domainname like '%" + query + "%' " +
        "or tn.tradingname like'%" + query + "%' " + 
        "or pr.accountno like'%" + query + "%' " + 
        "order by pr.account");
    } catch (err) {
      
    console.log(err);
    }
}

async function getPAccount(query) {
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


module.exports = searchFullRegister;