import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../context/AuthContext";
import "../styles/stylemain.css";
import "../styles/productMain.css";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [imgFiles, setImgFiles] = useState([]);
  const [error, setError] = useState(null);
  const [imgPath, setImgPath] = useState("");
  const [currentImg, setCurrentImg] = useState("");
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [numberOfReviews, setNumberOfReviews] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/product/${productId}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProduct(data.product);
        setImgFiles(data.imgFiles);
        setImgPath(data.imgPath);
        setCurrentImg(`${data.imgPath}/img1.png`);

        if (user) {
          const wishlistResponse = await fetch(
            `http://localhost:5000/user/wishlist`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );
          if (wishlistResponse.status === 401) {
            navigate("/login");
            return;
          }
          const wishlistData = await wishlistResponse.json();
          setIsInWishlist(
            wishlistData.products.some((item) => item._id === productId)
          );

        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
  }, [productId, user, navigate]);

  const handleWishlistSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/user/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/user/wishlist/${productId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const result = await response.json();
      if (response.ok) {
        setIsInWishlist(!isInWishlist);
        alert(
          result.message.includes("added")
            ? "Product added to wishlist"
            : "Product removed from wishlist"
        );
      } else {
        alert("Error updating wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

const handleCartSubmit = async (e) => {
  e.preventDefault();
  if (!user) {
    navigate("/user/login");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/user/cart/${productId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (response.ok) {
      const result = await response.json();
      if (result.message.includes("This item is already in your cart.")) {
        alert("Product already in cart");
      } else {
        alert("Product added to cart");
      }
    } else {
      alert("Error adding product to cart");
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};


  const handleImageClick = (img) => {
    setCurrentImg(`${imgPath}/${img}`);
  };

  const getBackgroundColorStyle = (averageRating) => {
    if (averageRating >= 4) {
      return { backgroundColor: "green", color: "white" };
    } else if (averageRating >= 2) {
      return { backgroundColor: "orange", color: "white" };
    } else {
      return { backgroundColor: "red", color: "white" };
    }
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
              src={currentImg}
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
              <i
                className="fa-solid fa-heart fa-xl"
                style={{
                  color: isInWishlist
                    ? "rgb(253, 82, 82)"
                    : "rgba(176, 176, 176, 0.9)",
                }}
              ></i>
            </button>
          </form>

          <div className="small-img-section">
            {imgFiles.map((img, index) => (
              <div
                className="small-img-block"
                key={index}
                onClick={() => handleImageClick(img)}
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
                <h3>Add to Cart</h3>
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
          </div>
          <div className="review-section">
            <h3>Reviews</h3>
            <form
              id="reviewForm"
              data-product-id={product._id}
              // onSubmit={handleReviewSubmit}
            >
              <textarea
                name="review"
                id="review"
                cols="30"
                rows="3"
                placeholder="Write your review here"
                required
              ></textarea>
              <button className="review-btn" type="submit">
                Submit Review
              </button>
            </form>
            {product.reviews && product.reviews.length > 0 ? (
              <ul>
                {product.reviews.map((review, index) => (
                  <li key={index} className="review-item">
                    <p>
                      <b>{review.username}</b> - {review.date}
                    </p>
                    <p>{review.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
