// implement your server here
// require your posts router and connect it here
const express = require('express');

const server = express();

server.use(express.json());

const postsRouter = require('./posts/posts-router');
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h1>Posts Api</h1>
    <p>Welcome to the Posts API</p>
    `)
})

module.exports = server