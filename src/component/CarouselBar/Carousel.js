import React, { useEffect, useState, Suspense } from 'react';
import './Carousel.css';
import axios from 'axios';
import { apiURL } from '../../config';
import { NavLink } from 'react-router-dom';
import "../../constant/Css-Files/ConstStyle.css"

// Lazy-load the CarouselScroll component
const CurouselScroll = React.lazy(() => import('../../utils/CarouselScroll'));

const Carousel = () => {
  const [catData, setCatData] = useState([]);

  const fetchCarouselData = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/admin-ajax.php?action=category_carousel`
      );
      setCatData(response.data.data);
    } catch (error) {
      console.error('Error fetching carousel data:', error);
    }
  };

  useEffect(() => {
    fetchCarouselData();
  }, []);

  const formatDuration = (duration) => {
    const parts = duration.split(':');
    return parts.length === 3 && parts[0] === '00'
      ? `${parts[1]}:${parts[2]}`
      : duration;
  };

  return (
    <>
    <div className='category-main-section'>
      {catData.map((categoryItem, categoryIndex) => (
        <div className="category-carousel" key={categoryIndex}>
          <div className="carousel-heading">
            <h1 className='heading-font'>{categoryItem.category.name}</h1>
            <NavLink className='link-style' to={`category/${categoryItem.category.slug}`}>
              <p>View All</p>
            </NavLink>
          </div>

          <div className="cat-carousel-container">
            <div className="cat-carousel">
              {categoryItem.data.map((item, itemIndex) => (
                <Suspense  key={itemIndex}>
                  <CurouselScroll
                    to={`/video/${item.ID}`}
                    title={item.title}
                    thumbnail={item.thumbnail}
                    duration={item.duration}
                    formatDuration={formatDuration}
                    loading="lazy" 
                  />
                </Suspense>
              ))}
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

export default Carousel;
