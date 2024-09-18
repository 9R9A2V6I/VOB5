import React from 'react';
import './CancelAccount.css';
import { NavLink } from 'react-router-dom';
import SubmitBtn from '../../constant/submit-Btn/SubmitBtn';

const CancelAccount = () => {
  return (
    <>
      <div className="cancel-container">
        <div className="cancel-box">
          <h1 className='heading-font'>Cancel</h1>
          <p>
            Are you sure you want to cancel your [site title] virtual
            membership?
          </p>

         <SubmitBtn title={"Keep"}/>
          <NavLink to="/account/cancel/reason">
          <button type="button" className="cancel-button">
            Cancel
          </button>
          </NavLink>

          
        </div>
        <hr className='hr-line-cancel' />
      </div>
    </>
  );
};

export default CancelAccount;
