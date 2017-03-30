var Product = require('./models/product.js');
var User = require('./models/user.js');
var Review = require('./models/review.js');

module.exports.init = function(req, res) {
  var wines = {
    top10Reds: [],
    top10Wines: [],
    topRated: [],
  };

  Product.top10Reds(function(error, topReds) {
    if (error) {
      res.send(error);
    } else {
      wines.top10Reds = topReds;
      Product.top10Whites(function(error, topWhites) {
        if(error){
          res.send(error)
        } else {
          wines.top10Whites = topWhites;
          res.send(wines);
        }
      });
    }
  });
}

module.exports.getWines = function(req, res) {
  // can be modified to take in a price from req/res later
  var price = 10;

  wineApiUtils.topRed(price, function(error, results) {
    Product.storeWines(results.Products.List, function() {
      wineApiUtils.topWhite(price, function(error, results) {
        Product.storeWines(results.Products.List, function() {
          res.send('storage of red and white wines complete!');
        });
      });
    });
  });
}

module.exports.search = function(req, res) {
  var query = req.body.search;
  var price = req.body.price || 10;

  Product.searchWines(query, price, function(error, results) {
    if(error){
      console.log('Error from server API request', error);
      res.sendStatus(404).send('not found')
    } else {
      res.send(results);
    }
  })
}

module.exports.signup = function(req, res) {
  var user = req.body.username;
  var pass = req.body.password;

  //check for valid username, i.e. currently not in use
  User.checkuserName(user, function(error, valid, results){
    if(error){
      res.send('error inside checkuserName index');
    } else if (!valid) {
      res.send('duplicate username')
    } else if (valid) {
      User.addUser(user, pass, function(error, success, results){
        if(error) {
          res.send('error inside addUser index.js');
        } else if (success) {
          res.send(results);
        }
      })
    }
  })
}

module.exports.usersUsername = function(req, res) {
  var username = req.body.username;

  User.checkuserName(username, function(error, valid, results){
    if(error){
      console.error(error)
      res.send(error);
    } else {
      console.log('results from checkuserName', results);
      res.send(results);
    }
  });
}

module.exports.review = function(req, res) {
  var content = req.body.review;
  var rating = req.body.rating;
  var product = req.body.product;
  var username = req.body.username;
  var product_id = req.body.product_id;
  var review = {
    content: content,
    rating: rating,
    product: product,
    username: username,
    product_id: product_id
  }
  Review.addReview(review, function(error, results){
    if(error){
      console.log('error inside dbUtils addReview', error);
    } else {
      console.log('success after add wine review', results);
      res.send(results)
    }
  })
}

module.exports.reviews = function(req, res) {
  var product_id = req.body.product_id;
  console.log('product inside reviews GET all', product_id);

  Review.getReviews(product_id, function(error, reviews){
    if(error){
      console.log('error in post-reviews')
      res.send(error)
    } else {
      res.send(reviews)
    }
  })
}

module.exports.login = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.validateUser(username, password, function(error, results) {
    if(error){
      console.log(error)
    } else {
      res.send(results);
    }
  })
}