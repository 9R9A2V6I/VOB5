// CustomNavLink.js

import React from 'react';
import { NavLink } from 'react-router-dom';

const CurouselScroll = ({ to, title, thumbnail, duration, formatDuration, onClick }) => {
  return (
    <NavLink className="link-style" to={to} onClick={onClick}>
      <div className="cat-items2 ">
        <img src={thumbnail} alt={title} loading="lazy" />
        <div className="cat-items-dur">
          <p>{formatDuration(duration)}</p>
        </div>
      </div>
      <p className="title-font">{title}</p>
    </NavLink>
  );
};

export default CurouselScroll;
