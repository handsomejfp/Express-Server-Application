const express = require('express');
const router = express.Router();

let comments = [{ id: 1, text: 'First comment', author: 'Alice' }];

router.get('/', (req, res) => {
    res.render('comments', { title: 'Comments', comments });
});

router.post('/', (req, res) => {
    const comment = { id: Date.now(), ...req.body };
    comments.push(comment);
    res.redirect('/comments');
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedComment = { ...comments.find(comment => comment.id === id), ...req.body };
    comments = comments.map(comment => comment.id === id ? updatedComment : comment);
    res.json(updatedComment);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    comments = comments.filter(comment => comment.id !== id);
    res.json({ message: `Comment ${id} deleted` });
});

module.exports = router;
