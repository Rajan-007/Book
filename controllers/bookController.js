const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        console.error('Error fetching all books:', err.message);
        res.status(500).send('Server error');
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        console.error('Error fetching book by ID:', err.message);
        res.status(500).send('Server error');
    }
};

exports.insertBook = async (req, res) => {
    const { bookName, status } = req.body;

    try {
        let book = await Book.findOne({ bookName });
        if (book) {
            return res.status(400).json({ msg: 'Book already exists' });
        }

        book = new Book({ bookName, status });

        await book.save();
        res.json(book);
    } catch (err) {
        console.error('Error inserting book:', err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteBookByName = async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ bookName: req.params.name });
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        res.json({ msg: 'Book deleted successfully' });
    } catch (err) {
        console.error('Error deleting book by name:', err.message);
        res.status(500).send('Server error');
    }
};

exports.buyBook = async (req, res) => {
    const { bookName, status } = req.body;

    try {
        let book = await Book.findOne({ bookName });
        if (!book || book.status === 'SOLD') {
            return res.status(400).json({ msg: 'Book not available for purchase' });
        }

        book.status = status;
        await book.save();
        res.json(book);
    } catch (err) {
        console.error('Error buying book:', err.message);
        res.status(500).send('Server error');
    }
};
