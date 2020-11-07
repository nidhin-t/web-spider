const fs = require('fs')
const path = require('path')

rootPath = require('../util/path')
const filePath = path.join(rootPath, 'data', 'details.json')


module.exports = class User {

    constructor(name, email, phone, message) {
        this.name = name
        this.email = email
        this.phone = phone
        this.message = message
    }
    saveIntoFile() {
        fs.readFile(filePath, (err, fileContent) => {
            let details = []
            if (!err) {
                details = JSON.parse(fileContent);
            }
            details.push(this)
            fs.writeFile(filePath, JSON.stringify(details), (err) => {
                console.log(("error writing into file:", err))
            })
        });
    }

    static fetchLastUser(callback) {
        fs.readFile(filePath, (err, fileContent) => {
            if (err)
                callback([])
            callback(JSON.parse(fileContent).slice(-1).pop())
        })
    }
}


/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - phone
 *          - message
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          phone:
 *            type: integer
 *          message:
 *            type: string
 *            description: description about the user
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 *           phone: 98796543210
 *           message: Details about the user Alexander
 */