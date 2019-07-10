const version = "v2";


exports.premises_summary_get = function (req, res) {

    res.render(version + '/premises/summary', {
        version
    })

}


exports.premises_search_get = function (req, res) {

var apikey = process.env.apikey

    res.render(version + '/premises/search', {
        version,
        apikey
    })

}
