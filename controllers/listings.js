const Listing = require("../models/listing.js");

//INDEX ROUTE (P1)
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

//NEW ROUTE(P3)
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

//SHOW ROUTE(P2)
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

//CREATE ROUTE(P4)
module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename= req.file.filename;

  const newListing = new Listing(req.body.listing); //{title,des,img,..}= req.body;
  newListing.owner = req.user._id;

  newListing.image ={url,filename};

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

//EDIT ROUTE(P5)
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

//UPDATE ROUTE(P6)
module.exports.updateListing = async (req, res) => {


  
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if( typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename= req.file.filename;
    listing.image = {url,filename};
    await listing.save();
  }


  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

//DELETE ROUTE
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  const deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
