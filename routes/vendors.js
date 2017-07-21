const express        = require('express');
const Vendor         = require('../models/vendor');
const Dish           = require("../models/dish");
const Order          = require("../models/order");
const router         = express.Router();
const session        = require("express-session");
const customerData   = require('connect-mongo') (session);
const vendorData     = require('connect-mongo') (session);

//MIDDLEWARE TO ENSURE ALL FOLLOWING ROUTES ARE ACCESSIBLE ONLY BY SINGNED IN USERS
router.use((req, res, next) => {
  if (req.session.currentVendor) { 
    next(); }
  else { res.redirect("/vendor-login"); }
});


//GET DASHBOARD 
router.get("/dashboard", (req, res, next) => {
  //get the signed-in user's id from the Session
  const currentUser = req.session.currentVendor;
  const menuPrompt = "tell us what you are cooking today!";
  const orderPrompt = "Your orders will appear here";

  //query mongo with that id to get the current vendor object
  Vendor.findById(currentUser._id, (err, theVendorFound) => {
    var check;
      if(err){
        console.log(err);
      }
      if (!theVendorFound.get('dish')) {
        check = false;
      } else {
        check = true;
      }
        // console.log("the check:", check);
       // console.log(theVendorFound);

//GET ORDERS ON VENDOR DASHBOARD
     Order.find({_orderedFrom : currentUser._id}, (err, theOrdersFound) => {
      if(err){
        return next(err);
      }
      console.log("these are the orders found for the vendor: ", theOrdersFound);
      //pass the vendor object to the view to surface it's values
      res.render("vendors/dashboard", { theVendorFound, check, menuPrompt, orderPrompt, theOrdersFound});
      });
    });
  });


//RENDER ADD BIO TO YOUR PROFILE
router.get("/addbio", (req, res, next) => {
        res.render("vendors/addbio");
});

//POST NEW BIO TO BE INCLUDED ON YOUR PROFILE
router.post("/addbio", (req, res, next) => { 
  
  const currentUser = req.session.currentVendor;

  const newBio = {
        about  : req.body.about
  }

  Vendor.findByIdAndUpdate(currentUser._id, newBio, (err, theVendorFound) => {
    if(err){
      return next(err);
    }
    res.redirect("/vendors/dashboard");
    });

});

//RENDER ADD A NEW DISH TO YOUR MENU
router.get("/newdish", (req, res, next) => {
        res.render("vendors/newdish");
});

//POST NEW DISH TO BE INCLUDED IN THE MENU
router.post("/newdish", (req, res, next) => { 
  
  const currentUser = req.session.currentVendor;

  const newDish = {
          dishName    : req.body.dishName,
          dishQuantity: req.body.dishQuantity,
          dishPrice   : req.body.dishPrice
  }

    Vendor.findByIdAndUpdate(currentUser._id, { $set: { dish : newDish }}, (err, vendorFound) => {
    if(err){
        return next(err);
    }
    console.log("the dish i found in the vendor",vendorFound.dish);
    res.redirect("/vendors/dashboard");
    });
});



module.exports = router;