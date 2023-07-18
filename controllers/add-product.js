const Product = require('../models/app-product');
const mongoDb = require('mongodb');
const Order = require('../models/order');
const User = require('../models/user');


exports.addProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.image;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {

      console.log('Created Product');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.editProduct = (req, res, next) => {
  
  const prodId = req.params.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.image;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
 Product.findById(prodId).then(product => {
  product.title = updatedTitle;
  product.imageUrl = updatedImageUrl;
  product.price = updatedPrice;
  product.description = updatedDescription;
     return product.save()
 })
 
    .then((result) => {
      console.log(`product updated.`);
    })
    .catch((error) => {
      console.error(error);
    });
}

exports.addToCart = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.status(200).json({ success: true })
    });
}


exports.orderPost = (req, res, next) => {
  User.findById(req.user._id)
    .populate('cart.items.productId')
    .exec()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.status(200).json({success:true});
    })
    .catch(err => console.log(err));
}