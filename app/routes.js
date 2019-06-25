const express = require('express')
const router = express.Router()
const version = "v1"

var core_Controller = require('./controllers/coreController.js')
var hub_Controller = require('./controllers/' + version + '/hubController.js')
var operator_Controller = require('./controllers/' + version + '/operatorController.js')
var personal_Controller = require('./controllers/' + version + '/personalController.js')
var sanctions_Controller = require('./controllers/' + version + '/sanctionsController.js')
var sanctionsInternal_Controller = require('./controllers/' + version + '/sanctionsInternalController.js')

var premises_Controller = require('./controllers/' + version + '/premisesController.js')

router.get('/', core_Controller.home_get);
router.post('/feedback', core_Controller.feedback_post);
router.get('/core/changelog', core_Controller.changelog_get);


// Hub
router.get('/' + version + '/hub/', hub_Controller.home_get);
router.post('/' + version + '/hub/journey', hub_Controller.journey_post);
router.post('/' + version + '/hub/results', hub_Controller.hub_results_post);
router.get('/' + version + '/hub/results', hub_Controller.hub_results_get);


// Operator
router.get('/' + version + '/operator/summary', operator_Controller.operator_summary_get);
router.get('/' + version + '/operator/search', operator_Controller.operator_search_get);
router.post('/' + version + '/operator/results', operator_Controller.operator_results_post);
router.get('/' + version + '/operator/results', operator_Controller.operator_results_post);
router.get('/' + version + '/operator/detail/:id', operator_Controller.operator_detail_get);
router.get('/' + version + '/operator/api', operator_Controller.operator_api_get);
router.get('/' + version + '/operator/download', operator_Controller.operator_download_get);


// Personal
router.get('/' + version + '/personal/summary', personal_Controller.personal_summary_get);
router.get('/' + version + '/personal/api', personal_Controller.personal_api_get);
router.get('/' + version + '/personal/download', personal_Controller.personal_download_get);
router.post('/' + version + '/personal/results', personal_Controller.personal_results_post);
router.get('/' + version + '/personal/results', personal_Controller.personal_results_post);
router.get('/' + version + '/personal/detail/:id', personal_Controller.personal_detail_get);

// Sanctions
router.get('/' + version + '/sanctions/summary', sanctions_Controller.sanctions_summary_get);
router.post('/' + version + '/sanctions/results', sanctions_Controller.sanctions_results_post);
router.get('/' + version + '/sanctions/results', sanctions_Controller.sanctions_results_post);
router.get('/' + version + '/sanctions/detail/:id', sanctions_Controller.sanctions_detail_get);
router.get('/' + version + '/sanctions/api', sanctions_Controller.sanctions_api_get);
router.get('/' + version + '/sanctions/download', sanctions_Controller.sanctions_download_get);
router.get('/' + version + '/sanctions/full', sanctions_Controller.sanctions_full_get);

// Premises
router.get('/' + version + '/premises/summary', premises_Controller.premises_summary_get);



// Sanctions Internal Administraton
router.get('/' + version + '/sanctions/internal/', sanctionsInternal_Controller.sanctionsInternal_Home_get);




module.exports = router
