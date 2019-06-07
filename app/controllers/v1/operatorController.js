const version = "v1"

exports.operator_summary_get = function (req, res) {

    console.log(version);
        res.render(version + '/operator/summary', {
            version
        })
}

exports.operator_search_get = function (req, res) {

    console.log(version);
        res.render(version + '/operator/search', {
            version
        })
}