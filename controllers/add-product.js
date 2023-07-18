const Product = require('../models/app-product');
const mongoDb = require('mongodb');


exports.addProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.image;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl
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
  const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, new mongoDb.ObjectId(prodId));
  product.update()
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
  req.user
    .addOrder()
    .then(result => {
      console.log('orderd');
      res.status(200).json({ success: true });
    })
    .catch(err => console.log(err));
}