const CHA = require('companies-house-api-es6');
const cha = new CHA(process.env.CompaniesHouseAPIKey);
const axios = require('axios');

async function getCompaniesHouseData(query) {
    let apiData = {};

    let q =  getData(query);
    let q2 =  searchForCompanyOfficersBy(query);

    apiData['registerData'] = await q;
    apiData['officers'] = await q;
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

async function getOfficers(query) {

    try {
        cha.searchForOfficersById(query).then(result => {
           return  result;
        }).catch(err => {
            console.log(err);
        });
    } catch (err) {
         console.log(err);
    }

}


 async function searchForCompanyOfficersBy(query){
        return new Promise(
            (resolve, reject) => {
                axios({
                    method:'get',
                    url: 'https://api.companieshouse.gov.uk/company/'+query+'/officers',                   
                    auth:{
                        username: process.env.CompaniesHouseAPIKey,
                        password: ''
                    }
                }).then(result => {
                    result.data.items.length > 0 ? resolve(result.data.items) : reject('Sorry no results match your search');
                }).catch(err => {
                    reject(err);
                });
            }
        )
    }

module.exports = getCompaniesHouseData;


