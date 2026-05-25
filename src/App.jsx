import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from './context/userContext';
import {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <UserProvider>
      <div className='text-xl font-medium text-black'>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signUp" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOption={{
          className: "",
          style: {
            fontSize: "13px"
          },
        }}
      />
    </UserProvider>
  )
}

const Root = () => {
  // check if token exist in localstorage
  const isAuthenticated = !!localStorage.getItem("token");

  // redirect to dashboard if login otherwise to login
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
}

export default App


// Router (or BrowserRouter)
// Wraps your entire app.
// Enables client-side routing (changing pages without refreshing).
// Tracks the URL in the address bar and shows the correct page/component.

// Routes
// A container for all your Routes.
// Think of it as a switchboard: it reads the current URL and matches it to a Route.

// Route
// Defines a URL path and which component should render when that path is visited.// // import { Navigate, Route, Routes } from 'react-router-dom';
// // import './App.css';
// // import Login from './pages/Login';
// // import Signup from './pages/Signup';
// // import Home from './pages/Home';
// // import { useState } from 'react';
// // import RefrshHandler from './RefrshHandler';

// // function App() {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);

// //   const PrivateRoute = ({ element }) => {
// //     return isAuthenticated ? element : <Navigate to="/login" />
// //   }

// //   return (
// //     <div className="App">
// //       <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
// //       <Routes>
// //         <Route path='/' element={<Navigate to="/login" />} />
// //         <Route path='/login' element={<Login />} />
// //         <Route path='/signup' element={<Signup />} />
// //         <Route path='/home' element={<PrivateRoute element={<Home />} />} />
// //       </Routes>
// //     </div>
// //   );
// // }

// // 
// import React from 'react'
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Login from "./pages/Auth/Login";
// import SignUp from "./pages/Auth/SignUp";
// import Home from "./pages/Dashboard/Home";
// import Income from "./pages/Dashboard/Income";
// import Expense from "./pages/Dashboard/Expense";


// const App = () => {
//   // const navigate = useNavigate();
//    return (
//     <div>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Root />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" exact element={<SignUp />} />
//           <Route path="/dashboard" exact element={<Home />} />
//           <Route path="/income" exact element={<Income />} />
//           <Route path="/expense" exact element={<Expense />} />
//         </Routes>
//       </Router>
//     </div>
//   );

//     // navigate("yourdesiredlocation");
  
// };


// export default App;

// const Root = () => {
//   // Check if token exists in localStorage
//   const isAuthenticated = !!localStorage.getItem("token");

//   // Redirect to dashboard if authenticated, otherwise to login
//   return isAuthenticated ? (
//     <Navigate to="/dashboard" />
//   ) : (
//     <Navigate to="/login" />
//   );
// };
// // export default App;