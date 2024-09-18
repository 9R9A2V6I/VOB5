import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import axios from 'axios';

import CurouselScroll from '../../utils/CarouselScroll';

import './VideoPlayer.css';

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [favoriteBtn, setFavoritesBtn] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const toggleHeart = () => {
    setFavoritesBtn(!favoriteBtn);
  };

  const formatDuration = (duration = '00:00:00') => {
    const parts = duration.split(':');
    return parts.length === 3 && parts[0] === '00'
      ? `${parts[1]}:${parts[2]}`
      : duration;
  };

  const handleNavigation = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        // Correct way to send POST request with parameters using axios
        const response = await axios.post(
          'https://vodv3.ipstudio.co/wp-admin/admin-ajax.php',
          new URLSearchParams({
            action: 'get_video',
            post_id: id,
          })
        );

        setVideoData(response.data.data);
      } catch (err) {
        setIsError(true);
        setError(err);
      }
    };

    fetchVideoData();
  }, [id]);
  console.log(videoData?.thumbnail)

  if (isError) return <div>{error?.message || 'Error fetching video data'}</div>;

  return (
    <>
      <div className="video-container" >
        <div className='video-img-box' style={{ backgroundImage: `url(${videoData?.thumbnail || ''})` }}>

        </div>
        
        <div className="overlay"  >
          <h2>Sign Up To Access</h2>
          <p>Please visit [vod site URL] to purchase Video On Demand access</p>
        </div>
      </div>

      <div className="video-title-container">
        <div className="video-title-head">
          <div className="category-btn">Category</div>
          <div className="video-title-right">
            <p>Add to favorites</p>
            {favoriteBtn ? (
              <IoIosHeart
                onClick={toggleHeart}
                className="heart-icon"
                color="#FF6600"
              />
            ) : (
              <IoIosHeartEmpty
                onClick={toggleHeart}
                className="heart-icon"
                color="#FF6600"
              />
            )}
          </div>
        </div>

        <div className="video-details-holder">
          <p className="video-details-title">{videoData?.title || '-'}</p>

          <div className="video-about-section">
            <h1 className='heading-font'>About</h1>
            <p  className="title-font" dangerouslySetInnerHTML={{ __html: videoData?.about || '-' }} />
          </div>

          <div className="video-about-section">
            <h1 className='heading-font'>Equipment</h1>
            <div className="equipment-items-box">
              {videoData?.equipments ? (
                Object.entries(videoData.equipments).map(([key, src]) => (
                  <div key={key} className="equipment-item">
                    <img
                      src={src || 'default-equipment.svg'}
                      alt={key}
                      className="equipment-svg"
                      lazy="loading"
                    />
                  </div>
                ))
              ) : (
                <p className='title-font'>No equipment available</p>
              )}
            </div>
          </div>
        </div>

        <div className="video-related-section">
          <h1 className='heading-font'>Related</h1>
          <div className="cat-carousel-container">
            <div className="cat-carousel">
              {videoData?.related_video?.length ? (
                videoData.related_video.map((item, itemIndex) => (
                  <CurouselScroll
                    key={itemIndex}
                    title={item.title || '-'}
                    thumbnail={item.thumbnail || 'default-thumbnail.jpg'}
                    duration={item.duration}
                    formatDuration={formatDuration}
                    onClick={() => handleNavigation(item.ID)}
                  />
                ))
              ) : (
                <p>No related videos available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
