import React from "react";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {


    const services = [
    { title: "Electricians", icon: "⚡" },
    { title: "Tutors", icon: "📚" },
    { title: "Cooks & Chefs", icon: "🍳" },
    { title: "Drivers", icon: "🚗" },
    { title: "Plumbers", icon: "🔧" },
    { title: "Cleaners", icon: "🧹" },
    { title: "Gardeners", icon: "🌱" },
    { title: "Painters", icon: "🎨" },
  ];
  return (
  
<>
{/* <div className='flex flex-col items-center px-4 mt-20 text-center text-gray-800 mb-15'>
      <h1 className="text-3xl font-bold text-purple-500">ALL IN ONE</h1>

      <h1 className='flex items-center gap-2 mb-2 text-xl font-medium sm:text-3xl'>
        Hey Users
        
      </h1>

      <h2 className="mb-4 text-3xl font-semibold sm:text-5xl">Welcome to our app</h2>
      <p className="mb-8 max-w-md:">Let's start with a quick product tour and we will have you up and running in no time!</p>
      
    </div> */}


        <div
          className="px-4 mt-16 text-gray-800"
          style={{
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold text-purple-600">ALL IN ONE</h1>
        <h2 className="mt-2 text-xl font-medium sm:text-2xl">Hey Users 👋</h2>
        <h3 className="mt-2 mb-4 text-2xl font-semibold sm:text-4xl">
          Welcome to our app
        </h3>
        <p className="max-w-md mb-6 text-gray-600">
          Let's start with a quick product tour and have you up and running in no time!
        </p>
        <Link
          to="/FindServices"
          className="px-6 py-2 text-white bg-purple-600 rounded-full shadow-lg hover:bg-purple-700"
        >
          Explore Services
        </Link>
      </div>
      
</div>
    

    </>






    
  );
}



// import React, { useEffect, useRef } from "react";

// export default function ServiceScroller() {
//   const servicesRef = useRef(null);
//   const lastScrollY = useRef(window.scrollY);
//   const animationFrame = useRef(null);
//   const directionRef = useRef(null);

//   const services = [
//     { title: "Electricians", icon: "⚡" },
//     { title: "Tutors", icon: "📚" },
//     { title: "Cooks & Chefs", icon: "🍳" },
//     { title: "Drivers", icon: "🚗" },
//     { title: "Plumbers", icon: "🔧" },
//     { title: "Cleaners", icon: "🧹" },
//     { title: "Gardeners", icon: "🌱" },
//     { title: "Painters", icon: "🎨" },
//   ];

//   useEffect(() => {
//     const moveCarousel = () => {
//       if (!servicesRef.current || !directionRef.current) return;

//       servicesRef.current.scrollLeft += directionRef.current === "left" ? 2 : -2;

//       // Infinite looping effect
//       if (servicesRef.current.scrollLeft <= 0 && directionRef.current === "right") {
//         servicesRef.current.scrollLeft = servicesRef.current.scrollWidth;
//       }
//       if (
//         servicesRef.current.scrollLeft >=
//           servicesRef.current.scrollWidth - servicesRef.current.clientWidth &&
//         directionRef.current === "left"
//       ) {
//         servicesRef.current.scrollLeft = 0;
//       }

//       animationFrame.current = requestAnimationFrame(moveCarousel);
//     };

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > lastScrollY.current) {
//         directionRef.current = "left";
//       } else if (currentScrollY < lastScrollY.current) {
//         directionRef.current = "right";
//       }

//       lastScrollY.current = currentScrollY;

//       cancelAnimationFrame(animationFrame.current);
//       animationFrame.current = requestAnimationFrame(moveCarousel);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       cancelAnimationFrame(animationFrame.current);
//     };
//   }, []);

//   return (


    

//     <div className="mt-12">
    
//  <div className='flex flex-col items-center px-4 mt-20 text-center text-gray-800 mb-15'>
//       <h1 className="text-3xl font-bold text-purple-500">ALL IN ONE</h1>
//        <h1 className='flex items-center gap-2 mb-2 text-xl font-medium sm:text-3xl'>
//          Hey Users
        
//      </h1>
//       <h2 className="mb-4 text-3xl font-semibold sm:text-5xl">Welcome to our app</h2>
//       <p className="mb-8 max-w-md:">Let's start with a quick product tour and we will have you up and running in no time!</p>
      
//     </div>



//       <h2 className="mb-2 text-2xl font-bold text-center">
//         Popular Service Categories
//       </h2>
//       <p className="mb-6 text-center text-gray-500">
//         Discover skilled professionals in your area for all your needs
//       </p>

//       <div
//         ref={servicesRef}
//         className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide"
//         style={{ scrollBehavior: "auto", whiteSpace: "nowrap" }}
//       >
//         {[...services, ...services].map((service, index) => (
//           <div
//             key={index}
//             className="flex flex-col items-center justify-center flex-shrink-0 h-24 transition bg-white border shadow-md w-36 rounded-xl hover:shadow-lg"
//           >
//             <span className="text-2xl">{service.icon}</span>
//             <h3 className="mt-1 text-sm font-medium">{service.title}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }








