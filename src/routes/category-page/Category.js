import React, { useState, useEffect } from 'react';
import { useParams, NavLink, useSearchParams } from 'react-router-dom';
import { IoChevronDownSharp } from 'react-icons/io5';
import axios from 'axios';
import './Category.css';
import { AiFillFileUnknown } from "react-icons/ai";

const Category = () => {
  const { id } = useParams();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [instructorDropdownOpen, setInstructorDropdownOpen] = useState(false);
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [catData, setCatData] = useState(null);
  const [isErrorInstructors, setIsErrorInstructors] = useState(false);
  const [isErrorVideos, setIsErrorVideos] = useState(false);
  const [error, setError] = useState(null);

  const selectedInstructor = searchParams.get('instructor') || '';
  const selectedDuration = decodeURIComponent(searchParams.get('duration') || '');

  useEffect(() => {
    // Fetch instructors
    const fetchInstructors = async () => {
      try {
        const response = await axios.post(
          'https://vodv3.ipstudio.co/wp-admin/admin-ajax.php',
          new URLSearchParams({
            action: 'get_video_filter',
          })
        );
        setInstructors(response.data.data);
      } catch (err) {
        setIsErrorInstructors(true);
      }
    };

    fetchInstructors();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const params = new URLSearchParams();
        params.append('action', 'video_by_category');
        params.append('cat_slug', id); 
        params.append('instructor', selectedInstructor || ''); 
        params.append('duration', selectedDuration || ''); 
        params.append('per_page', '100'); 
        params.append('is_single', 'true'); 

        const response = await axios.post(
          'https://vodv3.ipstudio.co/wp-admin/admin-ajax.php',
          params
        );

        setCatData(response.data.data);
      } catch (err) {
        setIsErrorVideos(true);
        setError(err);
      }
    };

    fetchCategoryData();
  }, [id, selectedInstructor, selectedDuration]);

  const selectedInstructorNameV = instructors?.find(
    (instructor) => instructor.term_id == selectedInstructor
  )?.name;

  const toggleInstructorDropdown = () =>
    setInstructorDropdownOpen(!instructorDropdownOpen);
  const toggleDurationDropdown = () =>
    setDurationDropdownOpen(!durationDropdownOpen);

  const selectInstructor = (instructorId) => {
    setSearchParams({ instructor: instructorId, duration: selectedDuration });
    setInstructorDropdownOpen(false);
  };

  const selectDuration = (duration) => {
    const durationParam = duration === '60+ mins' ? '1hr' : duration;
    setSearchParams({
      instructor: encodeURIComponent(selectedInstructor),
      duration: encodeURIComponent(durationParam),
    });
    setDurationDropdownOpen(false);
  };

  const clearSelectionInstructor = () => {
    setSearchParams({ instructor: '', duration: selectedDuration }); // Clear only instructor
    setInstructorDropdownOpen(false);
  };

  const clearSelectionDuration = () => {
    setSearchParams({ instructor: selectedInstructor, duration: '' }); // Clear only duration
    setDurationDropdownOpen(false);
  };

  const formatDuration = (duration) => {
    const parts = duration.split(':');
    return parts.length === 3 && parts[0] === '00'
      ? `${parts[1]}:${parts[2]}`
      : duration;
  };

  if (isErrorVideos) return <div>{error?.message || 'Error fetching video data'}</div>;
  if (isErrorInstructors) return <div>Error fetching instructor data</div>;

  return (
    <div className="cat-container">
      <div className="category-detail">
        <h1 className='heading-font'>{catData?.cat_detail?.cat_name}</h1>
        <p className='title-font'>{catData?.cat_detail?.category_description}</p>
      </div>

      <div className="cat-filter">
        <div className="filter-group">
          <label>Instructor</label>
          <div className="custom-dropdown">
            <div
              className="dropdown-selected"
              onClick={toggleInstructorDropdown}
            >
              {selectedInstructorNameV || 'Choose an option'}
              <IoChevronDownSharp
                size={16}
                className={instructorDropdownOpen ? 'rotate-icon' : ''}
              />
            </div>
            {instructorDropdownOpen && (
              <ul className="dropdown-options">
                <li onClick={clearSelectionInstructor}>All</li>
                {instructors?.map((instructor) => (
                  <li
                    key={instructor.term_id}
                    onClick={() => selectInstructor(instructor.term_id)}
                  >
                    {instructor.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="filter-group">
          <label>Duration</label>
          <div className="custom-dropdown">
            <div className="dropdown-selected" onClick={toggleDurationDropdown}>
              {selectedDuration || 'Choose an option'}
              <IoChevronDownSharp
                size={16}
                className={durationDropdownOpen ? 'rotate-icon' : ''}
              />
            </div>
            {durationDropdownOpen && (
              <ul className="dropdown-options">
                <li onClick={clearSelectionDuration}>All</li>
                {['0-20 mins', '20-30 mins', '30-45 mins', '45-60 mins', '60+ mins'].map((duration, index) => (
                  <li key={index} onClick={() => selectDuration(duration)}>
                    {duration}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Show "No Data Found" message if no videos are present */}
      {catData?.repeater_data?.length === 0 && <div className='not-data-msg'><AiFillFileUnknown size={32} color="#D9D9D9"/> <h1>No Result Found</h1></div>}

      <div className="cat-videos-container">
        {catData?.repeater_data?.length > 0 &&
          catData.repeater_data.map((item) => (
            <NavLink
              className="cat-link-style"
              to={`/video/${item.ID}`}
              key={item.ID}
            >
              <div className="cat-items">
                <img src={item.thumbnail} alt={item.title} />
                <div className="cat-items-dur-c">
                  <p>{formatDuration(item.duration)}</p>
                </div>
              </div>
              <p className='title-font'>{item.title}</p>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default Category;
