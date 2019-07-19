var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.PublicRegisterNotifyKey);

exports.home_get = function (req, res) {
       res.redirect(process.env.Version+"/hub/journey")
}

exports.changelog_get = function (req, res) {
    res.render('core/changelog', {'changelog_class': 'active'})
}

exports.feedback_post = function (req, res) {


  notify
    .sendEmail(process.env.PublicRegisterNotifyEmailTemplate, process.env.PublicRegisterNotifyEmail, {
       personalisation: {
        'Feedback': req.body.moredetail,
        'Name': req.body.name,
        'Email': req.body.email
      }
    })
    .then(response => console.log(response))
    .catch(err => console.error(err))
    

      res.redirect('/feedback-sent');
}

exports.report_issue_post = function (req, res) {


  notify
    .sendEmail(process.env.PublicRegisterNotifyEmailTemplate, process.env.PublicRegisterNotifyEmail, {
       personalisation: {
        'report_issue': req.body.moredetail,
        'Name': req.body.name,
        'Email': req.body.email
      }
    })
    .then(response => console.log(response))
    .catch(err => console.error(err))
    

      res.redirect('/issue-sent');
}