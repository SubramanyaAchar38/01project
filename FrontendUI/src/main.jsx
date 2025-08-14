import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/pages/home.jsx' 
import FindServices from './components/pages/FindServices.jsx'
import ContactUs from './components/pages/ContactUs.jsx'
import HowItWorks from './components/pages/HowItWorks.jsx'
import SignIn from './components/pages/SignIn.jsx'
import ProviderProfile from './components/pages/ProviderProfile.jsx'


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
    <Route path='HowItWorks' element={<HowItWorks/>}/>
    
    

    </Route>
    <Route path='/SignIn' element={<SignIn/>}/>
    <Route path='/ProviderProfile' element={<ProviderProfile/>}/>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
