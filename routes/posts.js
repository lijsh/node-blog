'use strict'
const express = require('express');
const router = express.Router();
const md = require('markdown').markdown
const Post = require('../models/Post')
/*add new post*/
router.get('/add', (req, res, next) => {
  res.render('edit', {title: '新建文章'})
})
/*get a post by id*/
router.get('/:id', (req, res, next) => {
  Post.getById(req.params.id, (err, post) => {
    if (err) {
      return next(err)
    }
    if (!post) {
      return res.status(404).end('not found')
    }
    res.render('post', {
      title: post.title,
      content: md.toHTML(post.content),
      id: req.params.id
    })
  })
})
/*get post update page by id*/
router.get('/:id/edit', (req, res, next) => {
  Post.getById(req.params.id, (err, post) => {
    if (err) {
      return next(err)
    }
    if (!post) {
      return res.status(404).end('not found')
    }
    res.render('edit', {
      id: req.params.id,
      title: '修改文章',
      postTitle: post.title,
      content: post.content
    })
  })
})

module.exports = router