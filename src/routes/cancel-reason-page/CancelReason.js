import React, { useState } from 'react';
import { IoChevronDownSharp } from 'react-icons/io5';
import './CancelReason.css';
import SubmitBtn from '../../constant/submit-Btn/SubmitBtn';

const CancelReason = () => {
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [submitted, setSubmitted] = useState(false); // Track submission status

  const toggleDurationDropdown = () =>
    setDurationDropdownOpen(!durationDropdownOpen);

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
    setDurationDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedReason === 'Other' && otherReason.trim() === '') {
      alert('Please provide a reason if you selected "Other".');
      return;
    }
    setSubmitted(true); // Mark form as submitted
  };

  return (
    <>
      <div className="cancel-container">
        {!submitted ? (
          <>
            <div className="cancel-box">
              <h1 className='cancel-reason-head'>Reason for your cancellation</h1>

              <div className="cancel-group">
                <label>Please choose one</label>
                <div className="custom-dropdown">
                  <div
                    className="cancel-dropdown-selected"
                    onClick={toggleDurationDropdown}
                  >
                    {selectedReason || 'Choose an option'}
                    <IoChevronDownSharp
                      size={16}
                      className={durationDropdownOpen ? 'rotate-icon' : ''}
                    />
                  </div>
                  {durationDropdownOpen && (
                    <ul className="dropdown-options">
                      {[
                        'No longer use the service',
                        'Service is too expensive',
                        'Using another service',
                        'Other',
                      ].map((duration, index) => (
                        <li
                          key={index}
                          onClick={() => handleReasonSelect(duration)}
                        >
                          {duration}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {selectedReason === 'Other' && (
                  <div className="other-reason-input">
                    <textarea
                      type="text"
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      placeholder="Start typing here..."
                    />
                  </div>
                )}
              </div>

              <SubmitBtn title={'Submit'} action={handleSubmit}/>
            </div>
            <hr className="hr-line-cancel-reason" />
          </>
        ) : (
          <>
          
          <div className="cancel-box">
            <div className="confirmation-message">
              <h3>We’ve received your request</h3>
              <p>
                We’ve received your request and will process it as soon as
                possible.
              </p>
            </div>
          </div>
          <hr className="hr-line-cancel-msg" />
          </>
        )}

        
      </div>
    </>
  );
};

export default CancelReason;
