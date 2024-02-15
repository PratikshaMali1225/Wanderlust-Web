const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

//REVIEWS POST ROUTE
module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review); //obj body -show.ejs-review[comment]
  newReview.author = req.user._id;
  listing.reviews.push(newReview); //listing.js(models) -reviews

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

//DELETE ROUTE FOR REVIEWS
module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", " Review Deleted!");
  res.redirect(`/listings/${id}`);
};
