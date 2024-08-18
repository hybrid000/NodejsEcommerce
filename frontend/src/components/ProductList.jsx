import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/productList.css'; // Importing the CSS file
import { Link } from 'react-router-dom';
function ProductList() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    fetch(`http://localhost:5000/category/${categoryName}`, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Error: ${response.status} ${response.statusText}\n${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.products);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch products');
      });

  }, [categoryName]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{categoryName}</h1>
      <div className="productz">
        {products.map(product => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <div className="product-container">
              <img src={product.imagePath} className="laptop" width="13rem" alt="" />
              <div className="product-info">
                <button><i className="fa-solid fa-heart fa-xl"></i></button>
                <h4>{product.productName}</h4>
                <div className="rev">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                  <h6>{product.reviews.length} Ratings</h6>
                </div>
                <h4><i className="fa fa-inr"></i> {product.discountedPrice}</h4>
                <h5 className="disc">{product.productPrice}</h5>
                <h5 className="disc1">
                  {Math.floor(((product.productPrice - product.discountedPrice) / product.productPrice) * 100)} % off
                </h5>
                <h5>Free Delivery</h5>
                <ul>
                  <li>{product.descriptionPoints[0]}</li>
                  <li>{product.descriptionPoints[1]}</li>
                  <li>{product.descriptionPoints[2]}</li>
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
