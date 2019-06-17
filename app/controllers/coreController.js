exports.home_get = function (req, res) {
       res.redirect("v1/hub/")
}

exports.changelog_get = function (req, res) {
    res.render('core/changelog', {'changelog_class': 'active'})
}