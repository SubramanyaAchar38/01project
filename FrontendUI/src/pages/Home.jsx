// import React from "react";
// import { Link } from "react-router-dom";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useNavigate } from "react-router-dom";

// import Slider from "react-slick";


// export default function Home() {


//    const settings = {
//     className: "center",
//     infinite: true,
//     centerPadding: "60px",
//     slidesToShow: 5,
//     swipeToSlide: true,
//     afterChange: function(index) {
//       console.log(
//         `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
//       );
//     }}

//   const navigate = useNavigate();

  
// const handleExploreClick = () => {
//   navigate("/findservices"); // Path to your FindServices route
// };


//     const services = [
//     { title: "Electricians", icon: "⚡" },
//     { title: "Tutors", icon: "📚" },
//     { title: "Cooks & Chefs", icon: "🍳" },
//     { title: "Drivers", icon: "🚗" },
//     { title: "Plumbers", icon: "🔧" },
//     { title: "Cleaners", icon: "🧹" },
//     { title: "Gardeners", icon: "🌱" },
//     { title: "Painters", icon: "🎨" },
//   ];
//   return (
  
// <>



//         <div className="px-4 mt-16 text-gray-800">
//       {/* Hero Section */}
//       <div className="flex flex-col items-center text-center">
//         <h1 className="text-4xl font-extrabold text-purple-600">ALL IN ONE</h1>
//         <h2 className="mt-2 text-xl font-medium sm:text-2xl">Hey Users 👋</h2>
//         <h3 className="mt-2 mb-4 text-2xl font-semibold sm:text-4xl">
//           Welcome to our app
//         </h3>
//         <p className="max-w-md mb-6 text-gray-600">
//           Let's start with a quick product tour and have you up and running in no time!
//         </p>
//         <button
//           onClick={handleExploreClick}
//           className="px-6 py-2 text-white bg-purple-600 rounded-full shadow-lg hover:bg-purple-700"
//         >
//           Explore Services
//         </button>


        
//       </div>
      
// </div>

// <div className="flex flex-col items-center py-10">
//       <h2 className="mb-2 text-2xl font-bold">Popular Service Categories</h2>
//       <p className="mb-8 text-center text-gray-500">
//         Discover skilled professionals in your area for all your needs
//       </p>
      
//       <div className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
//         {services.map((service, i) => (
          
//           <div
//             key={i}
//             className={`flex flex-col items-center justify-center border rounded-xl p-6 shadow-sm cursor-pointer transition ${
//               service.active ? "bg-indigo-50 border-indigo-400" : "bg-white"
//             }`}
//           >
//             <span className="mb-2 text-4xl">{service.icon}</span>
//             <p className="font-medium">{service.title}</p>
//           </div>
          
//         ))}
//       </div>
      

//       {/* <button className="px-6 py-2 mt-8 transition border border-gray-300 rounded-lg hover:bg-gray-100">
//         Browse All Categories →
//       </button> */}
//     </div>
    

//     </>






    
//   );
// }



import React from "react";
import { useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Home() {
  const navigate = useNavigate();

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "40px",
    slidesToShow: 4,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const handleExploreClick = () => {
    navigate("/findservices");
  };

  const services = [
    { title: "Electricians", icon: "⚡" },
    { title: "Tutors", icon: "📚" },
    { title: "Cooks & Chefs", icon: "🍳" },
    { title: "Drivers", icon: "🚗" },
    { title: "Plumbers", icon: "🔧" },
    { title: "Cleaners", icon: "🧹" },
    { title: "Gardeners", icon: "🌱" },
    { title: "Painters", icon: "🎨" }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="px-4 mt-16 text-gray-800">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold text-purple-600">ALL IN ONE</h1>
          <h2 className="mt-2 text-xl font-medium sm:text-2xl">Hey Users 👋</h2>
          <h3 className="mt-2 mb-4 text-2xl font-semibold sm:text-4xl">
            Welcome to our app
          </h3>
          <p className="max-w-md mb-6 text-gray-600">
            Let's start with a quick product tour and have you up and running in
            no time!
          </p>
          <button
            onClick={handleExploreClick}
            className="px-6 py-2 text-white bg-purple-600 rounded-full shadow-lg hover:bg-purple-700"
          >
            Explore Services
          </button>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="flex flex-col items-center w-full max-w-6xl py-10 mx-auto">
        <h2 className="mb-2 text-2xl font-bold">Popular Service Categories</h2>
        <p className="mb-8 text-center text-gray-500">
          Discover skilled professionals in your area for all your needs
        </p>

        <Slider {...settings} className="w-full px-4">
          {services.map((service, i) => (
            <div key={i} className="px-2">
              <div
                className="flex flex-col items-center justify-center p-6 transition bg-white border shadow-sm cursor-pointer rounded-xl hover:shadow-lg"
              >
                <span className="mb-2 text-4xl">{service.icon}</span>
                <p className="font-medium">{service.title}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      
    </>
  );
}
