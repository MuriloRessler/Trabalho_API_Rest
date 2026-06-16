const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { create, getAll, getById, update, delete: deleteProduct } = require('../controllers/productController');

router.use(auth); // Todas as rotas de produto exigem autenticação

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleteProduct);

module.exports = router;