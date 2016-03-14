'use strict'
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const url = 'mongodb://localhost:27017/test'

let db = null

module.exports = cb => {
  if (db === null) {
    MongoClient.connect(url, (err, database) => {
      if (err) {
        return cb(err)
      }
      db = database
      cb(null, db)
    })
  } else {
    cb(null, db)
  }
}