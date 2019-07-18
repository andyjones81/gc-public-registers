const version = "v2";


exports.premises_summary_get = function (req, res) {

    res.render(version + '/premises/summary', {
        version
    })

}

exports.premises_api_get = function (req, res) {
    res.render(version + '/premises/api', {
        version
    })
}

exports.premises_search_get = function (req, res) {

    //Get the premises

    const searchRegister = require('../../data/AzureSQL/searchPremises');
    let query = req.session.data['searchp']

    query = (query === undefined) ? " " : query;

    let premisesResults = searchRegister(query);

    premisesResults.then(list => {
        
            res.render(version + '/premises/search', {
                version,
                list
            })
        }).catch(err => {
        console.log(err);
    });


}


exports.premises_detail_get = function (req, res) {

    //Get the premises

    const getPremises = require('../../data/AzureSQL/getPremises');
    let query = req.params.id;
console.log('Get premises: '+ query)

    let premisesResults = getPremises(query);

    premisesResults.then(premises => {
        
            res.render(version + '/premises/detail', {
                version,
                premises
            })
        }).catch(err => {
        console.log(err);
    });


}
