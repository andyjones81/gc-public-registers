const express = require('express')
const router = express.Router()
const version = "v1"

var core_Controller = require('./controllers/coreController.js')
var hub_Controller = require('./controllers/' + version + '/hubController.js')
var operator_Controller = require('./controllers/' + version + '/operatorController.js')

router.get('/', core_Controller.home_get);
router.get('/core/changelog', core_Controller.changelog_get);


// Hub
router.get('/' + version + '/hub/', hub_Controller.home_get);


// Operator
router.get('/' + version + '/operator/summary', operator_Controller.operator_summary_get);
router.get('/' + version + '/operator/search', operator_Controller.operator_search_get);
router.post('/' + version + '/operator/results', operator_Controller.operator_results_get);
router.get('/' + version + '/operator/results', operator_Controller.operator_results_get);

module.exports = router
