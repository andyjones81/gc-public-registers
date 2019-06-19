const version = "v1";


exports.premises_summary_get = function (req, res) {

    res.render(version + '/premises/summary', {
        version
    })

}
