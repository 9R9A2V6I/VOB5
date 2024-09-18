// import React ,{useState,useEffect} from 'react';
// import Carousel from './Carousel';
// import axios from 'axios';

// const Slider = () => {
//   const items = [
//     <div style={{ background: 'lightblue', height: '200px' }}>Item 1</div>,
//     <div style={{ background: 'lightcoral', height: '200px'}}>Item 2</div>,
//     <div style={{ background: 'lightgreen', height: '200px' }}>Item 3</div>,
//   ];


//   const [slides, setSlides] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSlides = async () => {
//       try {
//         const response = await axios.get(
//           'https://vodv3.ipstudio.co/wp-admin/admin-ajax.php?action=get_self'
//         );
//         setSlides(response?.data?.data);
//       } catch (err) {
//         setIsError(true);
//         setError(err.message || 'Error fetching slider data');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSlides();
//   }, []);

//   return (
//     <div>
//       <h1>Centered Carousel</h1>
//       <Carousel items={slides} />
//     </div>
//   );
// };

// export default Slider;
