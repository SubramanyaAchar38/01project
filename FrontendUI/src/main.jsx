import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import Layout from './Layout.jsx'
import Home from './components/pages/home.jsx' 
import FindServices from './components/pages/FindServices.jsx'
import ContactUs from './components/pages/ContactUs.jsx'
import HowItWorks from './components/pages/HowItWorks.jsx'
import SignIn from './components/pages/SignIn.jsx'
import ProviderProfile from './components/pages/ProviderProfile.jsx'
import ProviderSignUp from './components/pages/ProviderSignUp.jsx'
import CustomerSignUp from './components/pages/CustomerSignUp.jsx'
import MyBookings from './components/pages/MyBookings.jsx'

// const router =createBrowserRouter([
//   {
//     path:'/',
//     element:<Layout/>,
//     children:[
//     {
//       path:"",
//       element:<Home/>
//     },{
//       path:"FindServices",
//       element: <FindServices/>
//     },
//     {
//       path:"ContactUs",
//       element:<ContactUs/>
//     },
//     {
//       path:"HowItWorks",
//       element:<HowItWorks/>
//     }
  
//     ]

//   }
// ])

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
    <Route path='' element={<Home/>}/>
    <Route path='ContactUs' element={<ContactUs/>}/>
    <Route path='FindServices' element={<FindServices/>}/>
  {/* Alias for lowercase path */}
  <Route path='find-services' element={<FindServices/>}/>
    <Route path='HowItWorks' element={<HowItWorks/>}/>
    <Route path='MyBookings' element={<MyBookings/>}/>
    

    </Route>
  <Route path='/SignIn' element={<SignIn/>}/>
  {/* Alias for lowercase path */}
  <Route path='/signin' element={<SignIn/>}/>
    <Route path='/ProviderProfile' element={<ProviderProfile/>}/>
    <Route path='/provider-signup' element={<ProviderSignUp/>}/>
    <Route path='/customer-signup' element={<CustomerSignUp/>}/>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
