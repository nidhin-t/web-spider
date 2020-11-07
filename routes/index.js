var express = require('express');
var router = express.Router();

const indexController = require('../controllers/index/index.controller')
    /**
     * @swagger
     * tags:
     *   name: Users
     *   description: User management
     */


//* GET home page --Sign Up Form 
/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Users
 *     description: Loads Users page
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Loads the User input page
 *         schema:
 *           $ref: '#/components/schemas/user'
 *       500:
 *         description: SERVER ERROR
 */
router.get('/', indexController.getHomePage)


//* POST home page Details --Save form data
/**
 * @swagger
 * /add-details:
 *   post:
 *     tags:
 *       - Users
 *     description: New User will be added to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of the user
 *         type: string
 *         format: string
 *         in: body
 *         required: true
 *       - name: email
 *         type: string
 *         format: email
 *         description: Email of the user
 *         in: body
 *         required: phone
 *       - name: phone
 *         type: integer
 *         description: mobile number of the user
 *         in: body
 *         required: true
 *       - name: message
 *         description: description of the user
 *         type: string
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: Page is redirected to next route /show-details and finally to display saved information while completing the emailService and SMSservice
 *       500:
 *         description: Server error (Data not Saved!)
 */
router.post('/add-details', indexController.postDetails)


// * Saved information is then pulled 
router.get('/show-details', indexController.showDetails)

module.exports = router;