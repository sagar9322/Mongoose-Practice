const Product = require('../models/app-product');
const User = require('../models/user');

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
    Product.findByIdAndRemove(prodId)
    .then(result => {
      console.log("deleted Successfully");
    })
    .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
  User.findById(req.user._id)
    .populate('cart.items.productId')
    .exec()
    .then(user => {
      const product = user.cart.items;
      
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