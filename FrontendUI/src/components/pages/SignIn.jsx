// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import { useToast } from "@/components/ui/use-toast";
// import { useAuth } from "@/components/AuthProvider";

// const AuthPage = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [showResetPassword, setShowResetPassword] = useState(false);

//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   const handleSignIn = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const formData = new FormData(event.currentTarget);
//     const email = formData.get("email");
//     const password = formData.get("password");

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       toast({
//         variant: "destructive",
//         title: "Error signing in",
//         description: error.message,
//       });
//     } else {
//       toast({
//         title: "Successfully signed in!",
//         description: "Welcome back!",
//       });
//       navigate("/");
//     }

//     setLoading(false);
//   };

//   const handleSignUp = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const formData = new FormData(event.currentTarget);
//     const email = formData.get("email");
//     const password = formData.get("password");
//     const confirmPassword = formData.get("confirmPassword");

//     if (password !== confirmPassword) {
//       toast({
//         variant: "destructive",
//         title: "Error signing up",
//         description: "Passwords do not match",
//       });
//       setLoading(false);
//       return;
//     }

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         emailRedirectTo: window.location.origin,
//       },
//     });

//     if (error) {
//       toast({
//         variant: "destructive",
//         title: "Error signing up",
//         description: error.message,
//       });
//     } else {
//       toast({
//         title: "Check your email!",
//         description: "We've sent you a confirmation link.",
//       });
//     }

//     setLoading(false);
//   };

//   const handleResetPassword = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const formData = new FormData(event.currentTarget);
//     const email = formData.get("email");

//     const { error } = await supabase.auth.resetPasswordForEmail(email, {
//       redirectTo: `${window.location.origin}/auth`,
//     });

//     if (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: error.message,
//       });
//     } else {
//       toast({
//         title: "Check your email",
//         description: "We've sent you a password reset link.",
//       });
//       setShowResetPassword(false);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="container flex items-center justify-center min-h-screen py-8">
//       <Card className="w-full max-w-md">
//         <Tabs defaultValue="signin" className="w-full">
//           <CardHeader>
//             <div className="flex justify-center mb-4">
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="signin">Sign In</TabsTrigger>
//                 <TabsTrigger value="signup">Sign Up</TabsTrigger>
//               </TabsList>
//             </div>
//             <CardTitle className="text-2xl text-center">
//               Welcome to ALL IN ONE
//             </CardTitle>
//             <CardDescription className="text-center">
//               Connect with local service providers
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <TabsContent value="signin">
//               {!showResetPassword ? (
//                 <form onSubmit={handleSignIn} className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="signin-email">Email</Label>
//                     <Input id="signin-email" name="email" type="email" required />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="signin-password">Password</Label>
//                     <Input id="signin-password" name="password" type="password" required />
//                   </div>
//                   <Button
//                     type="button"
//                     variant="link"
//                     className="h-auto p-0 text-sm font-normal text-muted-foreground"
//                     onClick={() => setShowResetPassword(true)}
//                   >
//                     Forgot your password?
//                   </Button>
//                   <Button type="submit" className="w-full" disabled={loading}>
//                     {loading ? "Signing in..." : "Sign In"}
//                   </Button>
//                 </form>
//               ) : (
//                 <form onSubmit={handleResetPassword} className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="reset-email">Email</Label>
//                     <Input id="reset-email" name="email" type="email" required />
//                   </div>
//                   <div className="flex gap-2">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       className="flex-1"
//                       onClick={() => setShowResetPassword(false)}
//                     >
//                       Back to Sign In
//                     </Button>
//                     <Button type="submit" className="flex-1" disabled={loading}>
//                       {loading ? "Sending..." : "Reset Password"}
//                     </Button>
//                   </div>
//                 </form>
//               )}
//             </TabsContent>

//             <TabsContent value="signup">
//               <form onSubmit={handleSignUp} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-email">Email</Label>
//                   <Input id="signup-email" name="email" type="email" required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-password">Password</Label>
//                   <Input
//                     id="signup-password"
//                     name="password"
//                     type="password"
//                     required
//                     minLength={6}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-confirm-password">Confirm Password</Label>
//                   <Input
//                     id="signup-confirm-password"
//                     name="confirmPassword"
//                     type="password"
//                     required
//                     minLength={6}
//                   />
//                 </div>
//                 <Button type="submit" className="w-full" disabled={loading}>
//                   {loading ? "Signing up..." : "Sign Up"}
//                 </Button>

//                 <div className="pt-2 text-sm text-center text-muted-foreground">
//                   Want to offer your services?
//                   <Button
//                     variant="link"
//                     className="h-auto pl-1"
//                     onClick={() => navigate("/register-provider")}
//                   >
//                     Register as a provider
//                   </Button>
//                 </div>
//               </form>
//             </TabsContent>
//           </CardContent>

//           <CardFooter className="text-sm text-center text-muted-foreground">
//             By continuing, you agree to our Terms of Service and Privacy Policy
//           </CardFooter>
//         </Tabs>
//       </Card>
//     </div>
//   );
// };

// export default AuthPage;




// export default function SignIn() {
//   return (
//     <>
//       {/*
//         This example requires updating your template:

//         ```
//         <html class="h-full bg-white">
//         <body class="h-full">
//         ```
//       */}
//       <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//          <h2 className="w-auto h-10 mx-auto"> ALL IN ONE</h2>
            
            
          
//           <h2 className="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9">
//             Sign in to your account
//           </h2>
//         </div>

//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//           <form action="#" method="POST" className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block font-medium text-gray-900 text-sm/6">
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   autoComplete="email"
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <label htmlFor="password" className="block font-medium text-gray-900 text-sm/6">
//                   Password
//                 </label>
//                 <div className="text-sm">
//                   <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                     Forgot password?
//                   </a>
//                 </div>
//               </div>
//               <div className="mt-2">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   autoComplete="current-password"
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>

//           <p className="mt-10 text-center text-gray-500 text-sm/6">
//             Not a member?{' '}
//             <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//               Start a 14 day free trial
//             </a>
//           </p>
//         </div>
//       </div>
//     </>
//   )
// }



// import React, { useState } from "react";

// const SignIn = () => {
//   const [activeTab, setActiveTab] = useState("worker");

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     location: "",
//     service: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     if (activeTab === "worker") {
//       console.log("Registering as Worker:", formData);
//     } else {
//       const { service, ...customerData } = formData;
//       console.log("Registering as Customer:", customerData);
//     }
//   };

//   const switchTab = (tab) => {
//     setActiveTab(tab);
//     // Reset formData when switching
//     setFormData({
//       name: "",
//       phone: "",
//       email: "",
//       location: "",
//       service: "",
//       password: "",
//       confirmPassword: "",
//     });
//   };

//   return (
//     <div className="max-w-md p-6 mx-auto mt-10 bg-white border shadow rounded-xl">
//       <div className="flex justify-between mb-4">
//         <button
//           onClick={() => switchTab("worker")}
//           className={`w-1/2 py-2 font-semibold ${
//             activeTab === "worker"
//               ? "bg-indigo-600 text-white"
//               : "bg-gray-200 text-black"
//           }`}
//         >
//           Register as Worker
//         </button>
//         <button
//           onClick={() => switchTab("customer")}
//           className={`w-1/2 py-2 font-semibold ${
//             activeTab === "customer"
//               ? "bg-indigo-600 text-white"
//               : "bg-gray-200 text-black"
//           }`}
//         >
//           Register as Customer
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded"
//           required
//         />
//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={formData.location}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded"
//           required
//         />
//         {activeTab === "worker" && (
//           <input
//             type="text"
//             name="service"
//             placeholder="Service (e.g., Electrician, Plumber)"
//             value={formData.service}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded"
//             required
//           />
//         )}
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignIn;


// import React, { useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const SignIn = () => {
//   const [activeTab, setActiveTab] = useState("worker"); // worker | customer
//   const [showLogin, setShowLogin] = useState(false);

//   const [registerData, setRegisterData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     location: "",
//     service: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loginData, setLoginData] = useState({
//     phone: "",
//     password: "",
//   });

//   const handleRegisterChange = (e) => {
//     setRegisterData({ ...registerData, [e.target.name]: e.target.value });
//   };

//   const handleLoginChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const handleRegisterSubmit = (e) => {
//     e.preventDefault();
//     if (registerData.password !== registerData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     if (activeTab === "worker") {
//       console.log("Registering as Worker:", registerData);
//     } else {
//       const { service, ...customerData } = registerData;
//       console.log("Registering as Customer:", customerData);
//     }
//   };

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     console.log("Logging in:", loginData);
//   };

//   const switchTab = (tab) => {
//     setActiveTab(tab);
//     setRegisterData({
//       name: "",
//       phone: "",
//       email: "",
//       location: "",
//       service: "",
//       password: "",
//       confirmPassword: "",
//     });
//   };

//   return (
//     <div className="max-w-md p-6 mx-auto mt-10 bg-white border shadow rounded-xl">
//       {!showLogin ? (
//         <>
//           {/* Register Tabs */}
//           <div className="flex justify-between mb-4">
//             <button
//               onClick={() => switchTab("worker")}
//               className={`w-1/2 py-2 font-semibold ${
//                 activeTab === "worker"
//                   ? "bg-indigo-600 text-white"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               Register as Worker
//             </button>
//             <button
//               onClick={() => switchTab("customer")}
//               className={`w-1/2 py-2 font-semibold ${
//                 activeTab === "customer"
//                   ? "bg-indigo-600 text-white"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               Register as Customer
//             </button>
//           </div>

//           {/* Register Form */}
//           <form onSubmit={handleRegisterSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={registerData.name}
//               onChange={handleRegisterChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone"
//               value={registerData.phone}
//               onChange={handleRegisterChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={registerData.email}
//               onChange={handleRegisterChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             <input
//               type="text"
//               name="location"
//               placeholder="Location"
//               value={registerData.location}
//               onChange={handleRegisterChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             {activeTab === "worker" && (
//               <input
//                 type="text"
//                 name="service"
//                 placeholder="Service (e.g., Electrician)"
//                 value={registerData.service}
//                 onChange={handleRegisterChange}
//                 className="w-full px-4 py-2 border rounded"
//                 required
//               />
//             )}
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={registerData.password}
//               onChange={handleRegisterChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={registerData.confirmPassword}
//               onChange={handleRegisterChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
//             >
//               Submit
//             </button>
//           </form>

//           <p className="mt-4 text-sm text-center">
//             Already registered?{" "}
//             <span
//               onClick={() => setShowLogin(true)}
//               className="text-indigo-600 cursor-pointer hover:underline"
//             >
//               Login
//             </span>
//           </p>
//         </>
//       ) : (
//         <>
//           {/* Login Form */}
//           <h2 className="mb-4 text-xl font-bold text-center">Login</h2>
//           <form onSubmit={handleLoginSubmit} className="space-y-4">
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone"
//               value={loginData.phone}
//               onChange={handleLoginChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={loginData.password}
//               onChange={handleLoginChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
//             >
//               Login
//             </button>
//           </form>

//           <p className="mt-4 text-sm text-center">
//             New here?{" "}
//             <span
//               onClick={() => setShowLogin(false)}
//               className="text-indigo-600 cursor-pointer hover:underline"
//             >
//               Register
//             </span>
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default SignIn;







// import React, { useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";


// const SignIn = () => {

//   const navigate = useNavigate();  //newline
  
//   const [activeTab, setActiveTab] = useState("user");
//   const [showLogin, setShowLogin] = useState(false);

//   const [registerData, setRegisterData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     location: "",
//     service: "", // Only for provider
//     password: "",
//     confirmPassword: "",
//   });

//   const [loginData, setLoginData] = useState({
//     phone: "",
//     password: "",
//   });

//   const handleRegisterChange = (e) => {
//     setRegisterData({ ...registerData, [e.target.name]: e.target.value });
//   };

//   const handleLoginChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     const {
//       name,
//       phone,
//       email,
//       location,
//       service,
//       password,
//       confirmPassword,
//     } = registerData;

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     try {
//       const endpoint =
//         activeTab === "user"
//           ? "http://localhost:5000/api/users/register"
//           : "http://localhost:5000/api/providers/register";

//       const payload =
//         activeTab === "user"
//           ? { name, phone, email, location, password }
//           : { name, phone, email, location, service, password };

//       const res = await axios.post(endpoint, payload);
//       toast.success("Registration successful!");
//       //  newline // Switch to login after registration
//       localStorage.setItem("user", JSON.stringify(res.data.user)); // Save user info
// navigate("/"); // ✅ Redirect to homepage
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Registration failed. Try again."
//       );
//     }
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const { phone, password } = loginData;

//     try {
//       const endpoint =
//         activeTab === "user"
//           ? "http://localhost:5000/api/users/login"
//           : "http://localhost:5000/api/providers/login";

//       const res = await axios.post(endpoint, { phone, password });

//       toast.success("Login successful!");

//       // Save token and redirect if needed
//       localStorage.setItem("token", res.data.token);

//       if (activeTab === "user") {
//         window.location.href = "/available-services"; // show service list
//       } else {
//         window.location.href = "/provider-profile"; // show provider profile
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Login failed. Try again."
//       );
//     }
//   };

//   return (
//     <div className="max-w-md p-6 mx-auto mt-10 bg-white border shadow rounded-x1">
//       <ToastContainer />
//       <div className="flex justify-center mb-4">
//         <button
//           onClick={() => setActiveTab("user")}
//           className={`px-4 py-2 font-semibold rounded-l ${
//             activeTab === "user"
//               ? "bg-indigo-600 text-white"
//               : "bg-gray-200 text-gray-800"
//           }`}
//         >
//           Register as Customer
//         </button>
//         <button
//           onClick={() => setActiveTab("provider")}
//           className={`px-4 py-2 font-semibold rounded-r ${
//             activeTab === "provider"
//               ? "bg-indigo-600 text-white"
//               : "bg-gray-200 text-gray-800"
//           }`}
//         >
//           Register as Worker
//         </button>
//       </div>

//       {!showLogin ? (
//         <>
//           <h2 className="mb-4 text-xl font-bold text-center">
//             {activeTab === "user" ? "User" : "Provider"} Registration
//           </h2>
//           <form onSubmit={handleRegisterSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={registerData.name}
//               onChange={handleRegisterChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone"
//               value={registerData.phone}
//               onChange={handleRegisterChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={registerData.email}
//               onChange={handleRegisterChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             <input
//               type="text"
//               name="location"
//               placeholder="Location"
//               value={registerData.location}
//               onChange={handleRegisterChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             {activeTab === "provider" && (
//               <input
//                 type="text"
//                 name="service"
//                 placeholder="Service (e.g., Electrician)"
//                 value={registerData.service}
//                 onChange={handleRegisterChange}
//                 className="w-full px-4 py-2 border rounded"
//                 required
//               />
//             )}
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={registerData.password}
//               onChange={handleRegisterChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={registerData.confirmPassword}
//               onChange={handleRegisterChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
//             >
//               Register
//             </button>
//           </form>
//           <p className="mt-4 text-sm text-center">
//             Already registered?{" "}
//             <span
//               onClick={() => setShowLogin(true)}
//               className="text-indigo-600 cursor-pointer hover:underline"
//             >
//               Login
//             </span>
//           </p>
//         </>
//       ) : (
//         <>
//           <h2 className="mb-4 text-xl font-bold text-center">
//             {activeTab === "user" ? "User" : "Provider"} Login
//           </h2>
//           <form onSubmit={handleLoginSubmit} className="space-y-4">
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone"
//               value={loginData.phone}
//               onChange={handleLoginChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={loginData.password}
//               onChange={handleLoginChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
//             >
//               Login
//             </button>
//           </form>
//           <p className="mt-4 text-sm text-center">
//             New here?{" "}
//             <span
//               onClick={() => setShowLogin(false)}
//               className="text-indigo-600 cursor-pointer hover:underline"
//             >
//               Register
//             </span>
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default SignIn;




// import React, { useState } from "react";
// import axios from "axios";
// import { toast, Toaster } from "react-hot-toast";

// const SignIn = () => {
//   const [activeTab, setActiveTab] = useState("worker"); // "worker" or "customer"
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     category: "", // For worker
//     password: "",
//   });

//   const [loginData, setLoginData] = useState({
//     phone: "",
//     password: "",
//   });

//   const handleRegisterChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLoginChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const endpoint =
//         activeTab === "worker"
//           ? "http://localhost:5000/api/providers/register"
//           : "http://localhost:5000/api/customers/register";

//       const res = await axios.post(endpoint, formData);

//       const user = {
//         _id: res.data._id,
//         name: res.data.name,
//         phone: res.data.phone,
//       };

//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", res.data.token);

//       toast.success("Registration successful!");

//       if (activeTab === "worker") {
//         window.location.href = "/provider-profile";
//       } else {
//         window.location.href = "/available-services";
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed");
//     }
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const { phone, password } = loginData;

//     try {
//       const endpoint =
//         activeTab === "worker"
//           ? "http://localhost:5000/api/providers/login"
//           : "http://localhost:5000/api/customers/login";

//       const res = await axios.post(endpoint, { phone, password });

//       toast.success("Login successful!");

//       const user = {
//         _id: res.data._id,
//         name: res.data.name,
//         phone: res.data.phone,
//       };

//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", res.data.token);

//       if (activeTab === "worker") {
//         window.location.href = "/provider-profile";
//       } else {
//         window.location.href = "/available-services";
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Login failed. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="max-w-md p-6 mx-auto mt-10 border rounded-lg shadow-md">
//       <Toaster />
//       <div className="flex justify-center mb-4">
//         <button
//           className={`px-4 py-2 mr-2 ${
//             activeTab === "worker" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => setActiveTab("worker")}
//         >
//           Worker
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeTab === "customer" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => setActiveTab("customer")}
//         >
//           Customer
//         </button>
//       </div>

//       <form onSubmit={handleRegisterSubmit}>
//         {activeTab === "worker" && (
//           <>
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleRegisterChange}
//               className="w-full p-2 mb-3 border rounded"
//               required
//             />
//             <input
//               type="text"
//               name="category"
//               placeholder="Category (e.g., Plumber)"
//               value={formData.category}
//               onChange={handleRegisterChange}
//               className="w-full p-2 mb-3 border rounded"
//               required
//             />
//           </>
//         )}
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleRegisterChange}
//           className="w-full p-2 mb-3 border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleRegisterChange}
//           className="w-full p-2 mb-3 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full py-2 text-white bg-green-500 rounded"
//         >
//           Register
//         </button>
//       </form>

//       <hr className="my-6" />

//       <form onSubmit={handleLoginSubmit}>
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={loginData.phone}
//           onChange={handleLoginChange}
//           className="w-full p-2 mb-3 border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={loginData.password}
//           onChange={handleLoginChange}
//           className="w-full p-2 mb-3 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full py-2 text-white bg-blue-500 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignIn;



import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user");
  const [showLogin, setShowLogin] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    service: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      phone,
      email,
      location,
      service,
      password,
      confirmPassword,
    } = registerData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const endpoint =
        activeTab === "user"
          ? "http://localhost:5000/api/users/register"
          : "http://localhost:5000/api/providers/register";

      const payload =
        activeTab === "user"
          ? { name, phone, email, location, password }
          : { name, phone, email, location, service, password };

      const res = await axios.post(endpoint, payload);

      const user = res.data.user || {
        _id: res.data._id,
        name: res.data.name,
        phone: res.data.phone,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", res.data.token);

      toast.success("Registration successful!");

      if (activeTab === "user") {
        navigate("/available-services");
      } else {
        navigate("/provider-profile");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { phone, password } = loginData;

    try {
      const endpoint =
        activeTab === "user"
          ? "http://localhost:5000/api/users/login"
          : "http://localhost:5000/api/providers/login";

      const res = await axios.post(endpoint, { phone, password });

      const user = res.data.user || {
        _id: res.data._id,
        name: res.data.name,
        phone: res.data.phone,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful!");

      if (activeTab === "user") {
        navigate("/available-services");
      } else {
        navigate("/provider-profile");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white border shadow rounded-x1">
      <ToastContainer />
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setActiveTab("user")}
          className={`px-4 py-2 font-semibold rounded-l ${
            activeTab === "user"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Register as Customer
        </button>
        <button
          onClick={() => setActiveTab("provider")}
          className={`px-4 py-2 font-semibold rounded-r ${
            activeTab === "provider"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Register as Worker
        </button>
      </div>

      {!showLogin ? (
        <>
          <h2 className="mb-4 text-xl font-bold text-center">
            {activeTab === "user" ? "User" : "Provider"} Registration
          </h2>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={registerData.name}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={registerData.phone}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={registerData.location}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            {activeTab === "provider" && (
              <input
                type="text"
                name="service"
                placeholder="Service (e.g., Electrician)"
                value={registerData.service}
                onChange={handleRegisterChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already registered?{" "}
            <span
              onClick={() => setShowLogin(true)}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </>
      ) : (
        <>
          <h2 className="mb-4 text-xl font-bold text-center">
            {activeTab === "user" ? "User" : "Provider"} Login
          </h2>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={loginData.phone}
              onChange={handleLoginChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            New here?{" "}
            <span
              onClick={() => setShowLogin(false)}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default SignIn;
