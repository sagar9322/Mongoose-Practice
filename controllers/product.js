const Product = require('../models/app-product');

exports.getProduct = (req, res, next) => {
    Product.find().then((product) => {
        res.send(JSON.stringify(product));
    });
};

exports.showDetails = (req, res, next)=> {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      res.status(200).json({product: product})
    })
    .catch(err => console.log(err));
}
exports.deleteProductDetail = (req, res, next) => {
    const prodId = req.params.productId;
    Product.delete(prodId)
    .then(result => {
      console.log("deleted Successfully");
    })
    .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    req.user
    .getCart()
    .then(product => {
      
            res.send(JSON.stringify(product));
        })
        .catch(err => console.log(err));

      }


exports.deleteCartItem = (req, res, next) => {
    const prodId = req.params.productId;
    
  req.user
    .deleteFromCart(prodId)
    .then(result => {
      console.log("deleted");
      res.status(200).json({success:true});
    })
    .catch(err => console.log(err));
}

exports.getOrderItem = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.send(JSON.stringify(orders));
      })
    .catch(err => console.log(err));
}