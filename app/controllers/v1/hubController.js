const version = "v1"

exports.home_get = function (req, res) {
        res.render(version + '/hub/index', {version})
}