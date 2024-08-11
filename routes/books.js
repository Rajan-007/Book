const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllBooks, getBookById, insertBook, deleteBookByName, buyBook } = require('../controllers/bookController');

// Common routes
router.get('/', auth, getAllBooks);
router.get('/:id', auth, getBookById);

// Manager routes
router.post('/', auth, insertBook);
router.delete('/:name', auth, deleteBookByName);

// Customer route
router.post('/buy', auth, buyBook);

module.exports = router;
