 import React from "react";
import { Link,NavLink } from "react-router-dom";
 
export default function Footer() {
  return (
  //   <footer className="border-t bg-muted/50">
  //     <div className="container py-8 md:py-12">
  //       <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
  //         <div>
  //           <Link to="/" className="inline-flex">
  //             <span className="text-lg font-bold text-blue-700 text-primary">ALL IN ONE</span>
  //           </Link>
  //           <p className="mt-2 text-sm text-muted-foreground">
  //             The hyperlocal marketplace connecting skilled service providers with people who need help nearby.
  //           </p>
  //         </div>

  //         <div className="grid grid-cols-2 gap-4">
  //           <div>
  //             <h4 className="text-sm font-semibold">Platform</h4>
  //             <ul className="mt-2 space-y-2">
  //               <li>
  //                 <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary">
  //                   How It Works
  //                 </Link>
  //               </li>
  //               <li>
  //                 <Link to="/search" className="text-sm text-muted-foreground hover:text-primary">
  //                   Find Services
  //                 </Link>
  //               </li>
  //            <li>
  //                 <Link to="/register-provider" className="text-sm text-muted-foreground hover:text-primary">
  //                   Join as Provider
  //                 </Link>
  //               </li>
  //             </ul>
  //           </div>

  //           <div>
  //             <h4 className="text-sm font-semibold">Company</h4>
  //             <ul className="mt-2 space-y-2">
  //               <li>
  //                 <Link to="/about-us" className="text-sm text-muted-foreground hover:text-primary">
  //                   About Us
  //                 </Link>
  //               </li>
  //               <li>
  //                 <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
  //                   Contact
  //                 </Link>
  //               </li>
  //               <li>
  //                 <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
  //                   Privacy Policy
  //                 </Link>
  //               </li>
  //               <li>
  //                 <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
  //                   Terms of Service
  //                 </Link>
  //               </li>
  //             </ul>
  //           </div>
  //         </div>

  //         <div>
  //           <h4 className="text-sm font-semibold">Contact Us</h4>
  //           <ul className="mt-2 space-y-2">
  //             <li className="text-sm text-muted-foreground">
  //               Email: contact@allinone.com
  //             </li>
  //             <li className="text-sm text-muted-foreground">
  //               Phone: +1 (123) 456-7890
  //             </li>
  //             <li className="text-sm text-muted-foreground">
  //               Address: navilgone Honnavar Po:581 338
  //             </li>
  //           </ul>
  //         </div>
  //       </div>

  //       <div className="pt-6 mt-8 border-t">
  //         <p className="text-sm text-center text-muted-foreground">
  //            ALL IN ONE. All rights reserved.
  //         </p>
  //       </div>
  //     </div>
  //   </footer>
  // );
   
  //   <footer className="px-6 py-10 text-gray-600 bg-gray-50">
  //     <div className="grid grid-cols-1 gap-4 mx-auto max-w-7xl md:grid-cols-4">
  //       <div>
  //         <h2 className="text-lg font-bold text-indigo-600">ALL IN ONE</h2>
  //         <p className="mt-2 text-sm">
  //           The hyperlocal marketplace connecting skilled service providers with people who need help nearby.
  //         </p>
  //       </div>
        
  //       <div>
  //         <h3 className="font-semibold text-black">Platform</h3>
  //         <ul className=" space-y-0.2 text-sm">
  //           <li><a href="#" className="hover:underline">How It Works</a></li>
  //           <li><a href="#" className="hover:underline">Find Services</a></li>
  //           <li><a href="#" className="hover:underline">Sign In to Register</a></li>
  //         </ul>
  //       </div>

  //       <div>
  //         <h3 className="font-semibold text-black">Company</h3>
  //         <ul className=" space-y-0.2 text-sm">
  //           <li><a href="#" className="hover:underline">About Us</a></li>
  //           <li><a href="#" className="hover:underline">Contact</a></li>
  //           <li><a href="#" className="hover:underline">Privacy Policy</a></li>
  //           <li><a href="#" className="hover:underline">Terms of Service</a></li>
  //         </ul>
  //       </div>
        
  //       <div>
  //         <h3 className="font-semibold text-black">Contact Us</h3>
  //         <p className="text-sm ">Email: contact@allinone.com</p>
  //         <p className="text-sm">Phone: +1 (123) 456-7890</p>
  //         <p className="text-sm">Address: nvilgone Honnavar Po:581 338</p>
  //       </div>
  //     </div>
      
  //     <hr className="my-6 border-gray-300" />
      
  //     <p className="text-sm text-center text-gray-500">
  //       © 2025 ALL IN ONE. All rights reserved.
  //     </p>
  //   </footer>
  // );
   
//     <footer className="border-t bg-muted/50">
//       <div className="container md:py-12">
//         <div className="grid grid-cols-1 gap-5 pl-20 md:grid-cols-3">
//           <div>
//             <Link to="/" className="inline-flex">
//               <span className="text-lg font-bold text-indigo-600 text-primary">ALL IN ONE</span>
//             </Link>
//             <p className="mt-2 text-sm text-muted-foreground">
//               The hyperlocal marketplace connecting skilled service providers with people who need help nearby.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 gap-8 pl-4">
//             <div>
//               <h4 className="text-sm font-semibold">Platform</h4>
//               <ul className="mt-2 space-y-2">
//                 <li>
//                   <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary">
//                     How It Works
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/search" className="text-sm text-muted-foreground hover:text-primary">
//                     Find Services
//                   </Link>
//                 </li>
//                <li>
//   <Link to="/register-provider" className="text-sm text-muted-foreground hover:text-primary">
//     Join as Provider
//   </Link>
// </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-sm font-semibold">Company</h4>
//               <ul className="mt-2 space-y-2">
//                 <li>
//                   <Link to="/about-us" className="text-sm text-muted-foreground hover:text-primary">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
//                     Contact
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
//                     Terms of Service
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-sm font-semibold">Contact Us</h4>
//             <ul className="mt-2 space-y-2">
//               <li className="text-sm text-muted-foreground">
//                 Email: contact@allinone.com
//               </li>
//               <li className="text-sm text-muted-foreground">
//                 Phone: +1 (123) 456-7890
//               </li>
//               <li className="text-sm text-muted-foreground">
//                 Address: navilgone Honnavar Po:581 338
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="pt-6 mt-8 border-t">
//           <p className="">
//             © ALL IN ONE. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

<footer className="border-t bg-muted/50">
  <div className="w-full max-w-screen-xl p-4 py-6 mx-auto lg:py-8 bg-slate-100">
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
      {/* Brand Info */}
      <div>
        <Link to="/" className="inline-flex">
          <span className="text-lg font-bold text-purple-500">ALL IN ONE</span>
        </Link>
        <p className="mt-3 text-sm text-muted-foreground">
          The hyperlocal marketplace connecting skilled service providers with people who need help nearby.
        </p>
      </div>

      {/* Navigation Links */}
      <div className="grid grid-cols-2 gap-8">
        {/* Platform Links */}
        <div>
          <h4 className="text-sm font-semibold">Platform</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/search" className="text-sm text-muted-foreground hover:text-primary">
                Find Services
              </Link>
            </li>
            <li>
              <Link to="/register-provider" className="text-sm text-muted-foreground hover:text-primary">
                Join as Provider
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/about-us" className="text-sm text-muted-foreground hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="text-sm font-semibold">Contact Us</h4>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>Email: contact@allinone.com</li>
          <li>Phone: +1 (123) 456-7890</li>
          <li>Address: Navilgone, Honnavar, PO: 581 338</li>
        </ul>
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="pt-6 mt-10 border-t">
      <p className="text-sm text-center text-muted-foreground">
        © {new Date().getFullYear()} ALL IN ONE. All rights reserved.
      </p>
    </div>
  </div>
</footer>
  );
};