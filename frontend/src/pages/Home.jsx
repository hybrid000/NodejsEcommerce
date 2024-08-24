import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/home.css"; 

const Home = () => {
  const categories = [
    {
      name: "Laptops",
      imageSrc: "resources/laptop2.jpeg",
      link: "/category/Laptops",
    },
    {
      name: "Mobile",
      imageSrc: "resources/iphoneset.jpeg",
      link: "/category/Smartphones",
    },
    {
      name: "Tablets",
      imageSrc: "resources/tab.jpeg",
      link: "/category/Tablets",
    },
    {
      name: "Smart Wearables",
      imageSrc: "resources/swatch.jpeg",
      link: "/category/Smart_Wearables",
    },
    {
      name: "Audio Devices",
      imageSrc: "resources/earphones.jpeg",
      link: "/category/Audio_Devices",
    },
    {
      name: "Accessories",
      imageSrc: "resources/lap.jpeg",
      link: "/category/Accessories",
    },
  ];

  const slides = [
    "./resources/slll.png",
    "./resources/sll2.png",
    "./resources/sll4.png",
    "./resources/sll3.png",
  ];

  const products = [
    "resources/p1.png",
    "resources/p333.png",
    "resources/p4.png",
    "resources/p22.png",
    "resources/p.png",
    "resources/p6.png",
  ];

  const contextText1 = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt culpa maxime, accusantium
commodi, eos corrupti quidem, magni alias ducimus tenetur aspernatur voluptatem!
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, magni!
Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, suscipit?Lorem ipsum dolor sit
amet, consectetur adipisicing elit. Laboriosam, eaque nostrum omnis adipisci provident neque, iste
quos odit laborum fugit, sequi ipsa corrupti voluptatem.`;

  const contextText2 = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate, sit commodi esse ea
tenetur obcaecati est, deserunt temporibus illo, magni quibusdam perspiciatis eum eaque voluptate. Distinctio
cumque itaque veritatis amet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt culpa maxime, accusantium
commodi, eos corrupti quidem, magni alias ducimus tenetur aspernatur voluptatem!
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, magni!
Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, suscipit?Lorem ipsum dolor sit
amet, consectetur adipisicing elit. Laboriosam, eaque nostrum omnis adipisci provident neque, iste
quos odit laborum fugit, sequi ipsa corrupti voluptatem sapiente!`;

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div id="layer2">
        <div className="category-set">
          <div className="block">
            <div className="category-heading">
              <h2>Shop by Category</h2>
              <h4>Explore our categories</h4>
            </div>
            {categories.map((category, index) => (
              <div className="items" key={index}>
                <Link to={category.link}>
                  <img src={category.imageSrc} alt={category.name} />
                  <h6>{category.name}</h6>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="slider-container">
          <div className="slider">
            {slides.map((slide, index) => (
              <div className="slide" key={index}>
                <img src={slide} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          <button className="prev-button">
            <i className="fa-solid fa-chevron-left fa-lg"></i>
          </button>
          <button className="next-button">
            <i className="fa-solid fa-chevron-right fa-lg"></i>
          </button>
        </div>

        {/* STATIC CONTENT $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */}
        <div className="context">
          <p>{contextText1}</p>
        </div>

        <div className="Banner">
          <Link to="/category/Laptops">
            <img src="resources/lap.png" alt="Laptops" />
          </Link>
        </div>

        <div className="most-bought-items">
          <h1>Most Purchased Items</h1>
          <div className="prodemo">
            {products.map((product, index) => (
              <div className="pro" key={index}>
                <Link to="#">
                  <img src={product} alt={`Product ${index + 1}`} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="Banner">
                    <h1>Get on with gaming with Lenovo</h1>
                    <Link to="#">
                        <img src="resources/idp.png" alt="Gaming with Lenovo" />
                    </Link>
                </div> */}

        <div className="context">
          <p>{contextText2}</p>
        </div>
      </div>
    </>
  );
};

export default Home;
