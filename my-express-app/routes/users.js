const express = require('express');
const router = express.Router();

let users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];

router.get('/', (req, res) => {
    res.render('users', { title: 'Users', users });
});

router.post('/', (req, res) => {
    const user = { id: Date.now(), ...req.body };
    users.push(user);
    res.redirect('/users');
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUser = { ...users.find(user => user.id === id), ...req.body };
    users = users.map(user => user.id === id ? updatedUser : user);
    res.json(updatedUser);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(user => user.id !== id);
    res.json({ message: `User ${id} deleted` });
});

module.exports = router;
