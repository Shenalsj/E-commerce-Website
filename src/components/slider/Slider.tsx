import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img8 from "../../assets/images/img8.jpg";
import img6 from "../../assets/images/img6.jpg";
import "./Slider.scss";

import { Carousel } from "react-responsive-carousel";



const App: React.FC = () => {
  return (
    <div className="carasoul-style">
      <div className="CarouselContainer">
        <Carousel
          showArrows={true}
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          interval={3000}
        >
          <div className="slide">
            <img src={img8} alt="Image 1" />
            <p className="legend">Watches</p>
          </div>
          <div className="slide">
            <img src={img6} alt="Image 2" />
            <p className="legend">Mobile Phones</p>
          </div>
          <div className="slide">
            <img src={img8} alt="Image 2" />
            <p className="legend">Watches</p>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default App;
