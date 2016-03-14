'use strict'
const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
/*get all posts*/
router.get('/post', function(req, res, next) {
  Post.getAll((err, posts) => {
    if (err) {
      return next(err)
    }
    res.json({
      message: 'success',
      action: 'read',
      data: posts
    })
  })
});
/*get post by id*/
router.get('/post/:id', (req, res, next) => {
  Post.getById(req.params.id, (err, post) => {
    if (err) {
      return next(err)
    }
    res.json({
      message: 'success',
      action: 'read',
      data: post
    })
  })
})
/*create post*/
router.post('/post', (req, res, next) => {
  Post.save(req.body, (err, id) => {
    if (err) {
      return next(err)
    }
    res.status(200).json({
      message: 'success',
      action: 'create',
      id: id
    })
    //res.redirect('/api/post/' + id)
  })
})
/*update post*/
router.post('/post/:id', (req, res, next) => {
  let id = req.params.id
  Post.update(id, req.body, (err, id) => {
    if (err) {
      return next(err)
    }
    res.status(200).json({
      message: 'success',
      action: 'update',
      id: id
    })
    //res.redirect('/api/post/' + id)
  })
})
/*delete post*/
router.post('/post/:id/delete', (req, res, next) => {
  let id = req.params.id
  Post.remove(id, () => {
    res.status(202).json({
      message: 'success',
      action: 'delete'
    })
  })
})
module.exports = router;
