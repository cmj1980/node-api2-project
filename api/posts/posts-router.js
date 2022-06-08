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
            err: err.message,
            stack: err.stack
          });
      })
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
       .then(posts => {
           if (posts) {
               res.status(200).json(posts);
           } else {
               res.status(404).json({ message: "The post with the specified ID does not exist" });
           }
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({ message: "The post information could not be retrieved" });
       })
})
module.exports = router;
