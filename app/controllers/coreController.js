exports.home_get = function (req, res) {
       res.render('core/index', {'home_class': 'active'})
}

exports.changelog_get = function (req, res) {
    res.render('core/changelog', {'changelog_class': 'active'})
}