const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const booksCtrl = require('../controllers/books');

const router = express.Router();

router.get('/', booksCtrl.getAllBooks);
router.post('/', auth, multer.uploadMiddleware, booksCtrl.createBook);
router.get('/bestrating', booksCtrl.getBestBooks);
router.get('/:id', booksCtrl.getOneBook);
router.put('/:id', auth, multer.uploadMiddleware, booksCtrl.modifyBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.post('/:id/rating', auth, booksCtrl.rateABook);

module.exports = router;
