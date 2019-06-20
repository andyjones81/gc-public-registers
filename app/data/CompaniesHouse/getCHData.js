const CHA = require('companies-house-api-es6');
const cha = new CHA(process.env.CompaniesHouseAPIKey);

async function getCompaniesHouseData(query) {
    let apiData = {};

    let q =  getData(query);

    apiData['registerData'] = await q;
    return apiData;
}

async function getData(query) {

    try {
        cha.searchForCompanyById(query).then(result => {
           return  result;
        }).catch(err => {
            console.log(err);
        });
    } catch (err) {
         console.log(err);
    }

}

module.exports = getCompaniesHouseData;