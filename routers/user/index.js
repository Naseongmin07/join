const express = require('express')
const router = express.Router()
const controller = require('./user.controller')
const multer = require('multer')
const path = require('path')





const upload = multer({
    storage: multer.diskStorage({
        destination: function(req,file,callback){
            callback(null,'uploads/') // 폴더명
        },
        filename: function(req, file, callback){
            callback(null, String(new Date().valueOf() + path.extname(file.originalname)))
        }
    }),
})

// npm install multer
router.use('/join',controller.join)
router.use('/login',controller.login)
router.use('/info',controller.info)
router.post('/join_success',upload.single('img'),controller.join_success)
router.post('/login_check',controller.login_check)
router.post('/logout',controller.logout)
router.get('/userid_check',controller.userid_check)

module.exports = router