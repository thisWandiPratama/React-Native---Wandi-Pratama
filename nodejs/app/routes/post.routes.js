module.exports = app => {
    const posts = require('../controllers/post.controller')

    let router = require('express').Router()

    // create a new post
    router.post('/', posts.create)

    // Retrieve all posts
    router.get('/', posts.findAll)

    app.use('/api/posts', router)
}