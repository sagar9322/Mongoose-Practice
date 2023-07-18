const express = require('express');

const router = express.Router();
const addProductController = require('../controllers/add-product');
const productController = require('../controllers/product');

router.post('/add-product', addProductController.addProduct);
// router.get('/add-product', addProductController.editProduct);
router.get('/products', productController.getProduct);
router.delete('/:productId', productController.deleteProductDetail);
router.post('/edit-product/:productId', addProductController.editProduct);
// router.get('/add-to-cart/:productId', addProductController.addToCart);
// router.get('/get-cart', productController.getCart);
// router.delete('/delete-cart/:productId', productController.deleteCartItem);
// router.get('/order-now', addProductController.orderPost);
// router.get('/order-item', productController.getOrderItem);
router.get('/show-detail/:productId', productController.showDetails)
module.exports = router;