import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/stylemain.css";
import "../styles/productMain.css";

const Product = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const [product, setProduct] = useState(null);
  const [imgFiles, setImgFiles] = useState([]);
  const [error, setError] = useState(null);
  const [imgPath, setImgPath] = useState("");
  const [currentImg, setCurrentImg] = useState(""); // New state for current image

  const [rating, setRating] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [numberOfReviews, setNumberOfReviews] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/product/${productId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data); // Check the structure of data here
        setProduct(data.product);
        setImgFiles(data.imgFiles);
        setImgPath(data.imgPath); 
        setCurrentImg(`${data.imgPath}/img1.png`); // Initialize with the first image
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleImageClick = (img) => {
    setCurrentImg(`${imgPath}/${img}`);
  };

  const handleWishlistSubmit = (e) => {
    e.preventDefault();
    // Handle wishlist submission
  };

  const handleCartSubmit = (e) => {
    e.preventDefault();
    // Handle cart submission
  };

  const handleStarClick = (starValue) => {
    setRating(starValue);
    // Handle star rating
  };

  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Helmet>
        <title>{product.productName}</title>
      </Helmet>
      <div id="llayer2">
        <div id="left">
          <div className="main-img-block">
            <img
              src={currentImg} // Use currentImg state
              width="90%"
              height="100%"
              id="main-img"
              alt={product.productName}
            />
          </div>

          <form
            id="wishlistForm"
            data-product-id={product._id}
            onSubmit={handleWishlistSubmit}
          >
            <button id="wishlistBtn" type="submit">
              <i className="fa-solid fa-heart fa-xl"></i>
            </button>
          </form>

          <div className="small-img-section">
            {imgFiles.map((img, index) => (
              <div
                className="small-img-block"
                key={index}
                onClick={() => handleImageClick(img)} // Set the clicked image as current image
              >
                <img
                  src={`${imgPath}/${img}`}
                  width="100%"
                  height="100%"
                  className="smallimg"
                  alt={product.productName}
                />
              </div>
            ))}
          </div>
          <div className="buy-cart">
            <form
              id="cartForm"
              data-product-id={product._id}
              onSubmit={handleCartSubmit}
            >
              <button className="cart-btn" type="submit">
                <i className="fa-solid fa-cart-shopping fa-xl"></i>
                <h3> Add to Cart</h3>
              </button>
            </form>
            <form id="buyForm" action="/buy" method="GET">
              <input type="hidden" name="product" value={product._id} />
              <button className="buy-btn" type="submit">
                <i className="fa-regular fa-credit-card fa-xl"></i>
                <h3> Buy Now</h3>
              </button>
            </form>
          </div>
        </div>
        <div id="right">
          <div className="product-details">
            <p style={{ display: "flex" }} className="category-heading">
              <a href="/category">Categories</a> &nbsp; &nbsp;
              <a href={`/category/${product.category.categoryName}`}>
                {product.category.categoryName}
              </a>
            </p>
            <h3>{product.productName}</h3>
            <h3>
              <i className="fa fa-inr"></i> {product.discountedPrice}
            </h3>
            <h4 className="regular-price">{product.productPrice}</h4>
            <h4 className="off-percentage">
              {Math.floor(
                ((product.productPrice - product.discountedPrice) /
                  product.productPrice) *
                  100
              )}{" "}
              % off
            </h4>
            <div className="rating-screen">
              {numberOfRatings > 0 && (
                <>
                  <button style={getBackgroundColorStyle(averageRating)}>
                    <i className="fa-solid fa-star fa-2xs"></i>{" "}
                    {averageRating.toFixed(1)}
                  </button>
                  <p>
                    {numberOfRatings} Ratings and {numberOfReviews} Reviews
                  </p>
                </>
              )}
            </div>
            <i className="fa-solid fa-truck-fast"></i>
            <h4 className="shipping">Free Shipping</h4>
            {product.offers && product.offers.length > 0 && (
              <>
                <h4>Available Offers</h4>
                <ul className="offer-list">
                  {product.offers.map((offer, index) => (
                    <li key={index}>
                      <span>
                        <i className="fa-solid fa-tag"></i> {offer}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="description">
            <h3>Description</h3>
            <p style={{ marginBottom: "0.5rem" }}>{product.description}</p>
            <hr />
            {product.warranty && (
              <div className="warranty">
                <p>
                  <i className="fa-solid fa-clipboard-check fa-lg"></i> &nbsp;{" "}
                  {product.warranty}
                </p>
                <a href="#" className="TnC">
                  T&C applied
                </a>
              </div>
            )}
          </div>
          <div className="ratingsNreviews">
            <div className="rating-screen">
              {numberOfRatings > 0 && (
                <>
                  <button style={getBackgroundColorStyle(averageRating)}>
                    <i className="fa-solid fa-star fa-2xs"></i>{" "}
                    {averageRating.toFixed(1)}
                  </button>
                  <p>
                    {numberOfRatings} Ratings and {numberOfReviews} Reviews
                  </p>
                </>
              )}
            </div>
            <div className="userReviewInput">
              <h3>Rate and review this product</h3>
              <form
                className="review-form"
                action={`/product/review/${product._id}`}
                method="post"
              >
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <span
                    className={`star ${rating >= starValue ? "activate" : ""}`}
                    key={starValue}
                    onClick={() => handleStarClick(starValue)}
                    data-rating={starValue}
                  >
                    <i className="fa-solid fa-star"></i>
                  </span>
                ))}
                <input type="hidden" id="rating" name="rating" value={rating} />
                <textarea
                  name="reviewText"
                  cols="30"
                  rows="10"
                  placeholder="Write a review. (Optional)"
                ></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>
            <div className="userReviewContainer">
              <h3>Product Reviews:</h3>
              {product.reviews &&
              product.reviews.length > 0 &&
              product.reviews.some((review) => review.review) ? (
                product.reviews.map(
                  (review, index) =>
                    review.review && (
                      <div className="userReviewBlock" key={index}>
                        <div className="rating-screen-detailed">
                          <button
                            style={getBackgroundColorStyle(review.rating)}
                          >
                            <i className="fa-solid fa-star fa-2xs"></i>{" "}
                            {review.rating}
                          </button>
                          <p>{ratingTocomment[review.rating]}</p>
                        </div>
                        <p className="userReviewContent">{review.review}</p>
                        <p className="userReviewName">
                          {review.user},{" "}
                          {new Date(review.reviewDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    )
                )
              ) : (
                <p
                  style={{
                    fontSize: "medium",
                    color: "darkgray",
                    textAlign: "center",
                    border: "1px solid rgba(184, 184, 184, 0.742)",
                    boxSizing: "border-box",
                    padding: "0.7rem 0.8rem 0.7rem 1rem",
                  }}
                >
                  No reviews yet
                </p>
              )}
            </div>
          </div>
          <div className="context">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate, sit commodi esse ea tenetur obcaecati est, deserunt
              temporibus illo, magni quibusdam perspiciatis alias aliquid unde
              voluptatibus dolore. Tempore, mollitia fugit!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const getBackgroundColorStyle = (rating) => ({
  backgroundColor:
    rating >= 4 ? "darkgreen" : rating >= 3 ? "darkorange" : "darkred",
});

const ratingTocomment = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export default Product;
