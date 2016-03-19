'use strict'
const express = require('express')
const router = express.Router()
const mime = require('mime')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './upload')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
  }
})
const upload = multer({
  storage: storage,
  limits: {fileSize: 1 * 1024 * 1024}
}).single('photo')

router.get('/', (req, res, next) => {
  res.render('upload', {title: 'upload'})
})
router.post('/', (req, res, next) => {
  upload(req, res, err => {
    if(err) {
        return res.status(500).end(err.message)
    }
    res.end("File is uploaded")
  }) 
})

module.exports = router