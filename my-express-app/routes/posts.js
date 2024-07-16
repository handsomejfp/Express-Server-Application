const express = require('express');
const router = express.Router();

let posts = [{ id: 1, title: 'First Post', content: 'This is the first post.' }];

router.get('/', (req, res) => {
    res.render('posts', { title: 'Posts', posts });
});

router.post('/', (req, res) => {
    const post = { id: Date.now(), ...req.body };
    posts.push(post);
    res.redirect('/posts');
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedPost = { ...posts.find(post => post.id === id), ...req.body };
    posts = posts.map(post => post.id === id ? updatedPost : post);
    res.json(updatedPost);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== id);
    res.json({ message: `Post ${id} deleted` });
});

module.exports = router;
