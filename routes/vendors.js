const express = require('express');
const Vendor  = require('../models/vendor');
const router  = express.Router();

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

    //query mongo with that id to get the current vendor object
    Vendor.findById(currentUser._id, (err, theVendorFound) => {
    if(err){
        console.log(err);
    }
    
    //pass the vendor object to the view to surface it's values
    res.render("vendors/dashboard", { theVendorFound })
    })
});

router.get("/", (req, res, next) => { 

    Vendor.find({}, (err, theVendorsRetrieved) => {
    if(err){
        console.log(err);
    }
    res.render("vendors/index", { theVendorsRetrieved })//PASS tobeRendered AS AN OBJECT! );
    })
});

router.get("/:id/new", (req, res, next) => {
    const vendorId = req.params.id;
    Vendor.findById(vendorId, (err, vendorReturned) => {
        if(err){
            return next(err);
        }
        res.render("vendors/new", {vendorReturned});
    }); 
});


//GET THE NEW DISH FORM
router.get("/:id", (req, res, next) => {
    const vendorId = req.params.id;
        Vendor.findById(vendorId, (err, vendorReturned) => {
    if(err){
        return next(err);
    }
    //console.log(vendorReturned.menu);
    res.render("vendors/profile", {vendorReturned});
    }); 
});


//POST NEW DISH TO BE INCLUDED IN THE MENU
router.post("/vendors/vendor.id/new", (req, res, next) => { 
  let vendorId = req.params.id;
  console.log('vendor post: ', vendorId);
  res.redirect(`vendors/${vendor._id}`);
});

module.exports = router;