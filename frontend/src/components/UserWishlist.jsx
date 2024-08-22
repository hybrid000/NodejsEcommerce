import React from "react";
import "../styles/productList.css"; // Ensure the CSS file is imported

const UserWishlist = ({ products }) => {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/productList.css" />
        <title>Wishlist</title>
      </head>

      <body>

        <div id="layer2">
          {/* Check if products exist and are not empty */}
          {!products || products.length === 0 ? (
            <h3>No products in wishlist</h3>
          ) : (
            <div className="productz">
              {products.map((product) => (
                <a href={`/product/${product._id}`} key={product._id}>
                  <div className="product-container">
                    <img
                      src={product.imagePath}
                      className="laptop"
                      width="13rem"
                      alt={product.productName}
                    />
                    <div className="product-info">
                      <button>
                        <i className="fa-solid fa-heart fa-xl"></i>
                      </button>
                      <h4>{product.productName}</h4>
                      <div className="rev">
                        {/* Star ratings and other information can go here */}
                      </div>
                      <h4>
                        <i className="fa fa-inr"></i>
                        {product.discountedPrice}
                      </h4>
                      <h5 className="disc">{product.productPrice}</h5>
                      <h5 className="disc1">
                        {((product.productPrice - product.discountedPrice) /
                          product.productPrice) *
                          100}
                        % off
                      </h5>
                      <h5>Free Delivery</h5>
                      <ul>
                        <li>{product.descriptionPoints[0]}</li>
                        <li>{product.descriptionPoints[1]}</li>
                        <li>{product.descriptionPoints[2]}</li>
                      </ul>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

    
      </body>
    </>
  );
};

export default UserWishlist;
