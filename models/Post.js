'use strict'
const connectDb = require('../lib/mongoConnect')
const ObjectID = require('mongodb').ObjectID

const Post = {}

Post.getAll = cb => {
  connectDb((err, db) => {
    if (err) {
      throw err
    }
    db.collection('posts').find({}).toArray((err, posts) => {
      if (err) {
        return cb(err)
      }
      cb(null, posts)
    })
  })
}

Post.getById = (id, cb) => {
  connectDb((err, db) => {
    if (err) {
      throw err
    }
    db.collection('posts').findOne({
      '_id': new ObjectID(id)
    }, (err, post) => {
      if (err) {
        return cb(err)
      }
      cb(null, post)
    })
  })
}

Post.save = (data, cb) => {
  connectDb((err, db) => {
    if (err) {
      throw err
    }
    db.collection('posts').insertOne({
      title: data.title,
      content: data.content,
      created_at: Date.now(),
      updated_at: Date.now()
    }, (err, result) => {
      if (err) {
        return cb(err)
      }
      cb(null, result.insertedId)
    })
  })
}

Post.update = (id, data, cb) => {
  connectDb((err, db) => {
    if (err) {
      throw err
    }
    db.collection('posts').findAndModify({'_id': new ObjectID(id)}, [['_id', 1]], {$set: {
      title: data.title,
      content: data.content,
      update_at: Date.now()
    }}, {new: true}, (err, doc) => {
      if (err) {
        return cb(err)
      }
      cb(null, doc.value._id.toHexString())
    })
  })
}

Post.remove = (id, cb) => {
  connectDb((err, db) => {
    if (err) {
      throw err
    }
    db.collection('posts').findOneAndDelete({
      '_id': new ObjectID(id)
    })
    .then(cb)
    .catch(err => {
      throw err
    })
  })
}

module.exports = Post