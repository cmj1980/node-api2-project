// implement your posts router here
const Posts = require('./posts-model');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({
                message: "The posts information could not be retrieved",
            });
        })
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(posts => {
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "The post information could not be retrieved"
            });
        })
});

router.post('/', (req, res) => {
    const {
        title,
        contents
    } = req.body;
    if (typeof title !== 'string' || title === '') {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        });
        return;
    }
    if (typeof contents !== 'string' || contents === '') {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        });
        return;
    }
    Posts.insert(req.body)
        .then(newPostId => {
            Posts.findById(newPostId.id)
                .then(newPost => {
                    res.status(201).json(newPost)
                })
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database",
            });
        })
});

router.put('/:id', (req, res) => {
    const {
        title,
        contents
    } = req.body;
    if (typeof title !== 'string' || title === '') {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        });
        return;
    }
    if (typeof contents !== 'string' || contents === '') {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        });
        return;
    }
    Posts.findById(req.params.id)
        .then(post => {
            if (post == null) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                });
                return;
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be retrieved",
            })
        })
    Posts.update(req.params.id, req.body)
        .then(count => {
            Posts.findById(count)
                .then(post => res.json(post))
                .catch(err => {
                    res.status(500).json({
                        message: "The post information could not be retrieved",
                    });
                })
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be modified",
            });
        })
});

router.delete('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post == null) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                });
                return;
            }
            Posts.remove(req.params.id)
                .then(deleteCount => {
                    res.json(post)
                })
                .catch(err => {
                    res.status(500).json({
                        message: "The post could not be removed",
                    });
                })
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be retrieved",
            });
        })
});

router.get('/:id/comments', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post == null) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
                return;
            }
            Posts.findPostComments(req.params.id)
                .then(comments => {
                    res.json(comments)
                })
                .catch(err => {
                    res.status(500).json({
                        message: "The comments information could not be retrieved"
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        })
});
module.exports = router;