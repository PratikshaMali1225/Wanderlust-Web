const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const{storage} = require("../cloudConfig.js");
const upload = multer({storage});


//INDEX ROUTE (P1)//CREATE ROUTE(P4)
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn, 
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//NEW ROUTE(P3)
router.get("/new", isLoggedIn, listingController.renderNewForm);

//SHOW ROUTE(P2)  //UPDATE ROUTE(P6)  //DELETE ROUTE
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//EDIT ROUTE(P5)
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
