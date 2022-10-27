const db = require('../models')
const Post = db.posts
const Op = db.Sequelize.Op

// create
exports.create = (req, res) => {
    // validate request
    if(!req.body.title) {
        req.status(400).send({
            message: 'Content can not be empty'
        })
        return
    }

    // create Post
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Post.create(post)
    .then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'some error occured while creating the Post'
        })
    });
}

// Retrive all
exports.findAll = (req, res) => {
    const title = req.query.title
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null

    Post.findAll({ where: condition })
    .then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error accured while find post'
        })
    })
}

// Find a single
exports.findOne = (req, res) => {

}

// Update a Post with ID
exports.update = (req, res) => {

}

// Delete a post
exports.delete = (req, res) => {

}