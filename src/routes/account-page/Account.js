import React, { useState } from 'react';
import './Account.css';
import { IoPersonSharp } from 'react-icons/io5';
import { FaCamera } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function Account() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Generate a URL for the uploaded image
    }
  };

  return (
    <>
      <div className="account-container">
        <div className="account-content">
          <h3 className="account-save">Save</h3>
          <div className="profile-section">
            <div className="profile-avatar">
              <div className="account-icon-box">
                {image ? (
                  <img
                    src={image}
                    alt="Profile Avatar"
                    className="profile-image"
                  />
                ) : (
                  <IoPersonSharp className="account-icon" />
                )}
              </div>
              <div className="edit-avatar-button">
                <label htmlFor="file-input">
                  <FaCamera size={17} color="grey" />
                </label>
                {/* <input
                  type="file"
                  id="file-input"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleImageChange}
                /> */}
              </div>
            </div>
          </div>
          <div className="basic-info">
            <h3 className="heading-font">Basic</h3>
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Demo IPSTUDIO" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="text" placeholder="Demo" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <input type="text" placeholder="Active:[insert membership]" />
              </div>
              <div className="form-group">
                <label>Renewal Date</label>
                <input type="date" placeholder="MM/DD/YYYY" />
              </div>
              <div className="form-actions">
                <NavLink to="/account/cancel">
                  <button type="button" className="cancel-button">
                    Cancel
                  </button>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
