import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input'
import { validEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'

const SignUp = () => {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const { updateUser } = useContext(UserContext)

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!fullName) { setError("Enter your full name"); return }
    if (!validEmail(email)) { setError("Enter a valid email address"); return }
    if (!password) { setError("Enter a password"); return }

    setError("")

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl: "",
      })

      const { token, user } = response.data

      if (token) {
        localStorage.setItem("token", token)
        updateUser(user)
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError(error.message)
      }
    }
  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create New Account</h3>
        <p className='text-[13px] text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              type="text"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Aanchal Borse"
            />
            <Input
              type="text"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder='aanchalborse@gmail.com'
            />
            <div className='col-span-2'>
              <Input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder='Min 4 characters'
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary cursor-pointer'>
            SIGN UP
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?
            <Link className='font-medium text-primary underline' to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
// import React, { useContext, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import AuthLayout from '../../components/layouts/AuthLayout'
// import Input from '../../components/Inputs/Input';
// import { validEmail } from '../../utils/helper';
// // import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
// import axiosInstance from '../../utils/axiosInstance';
// import { API_PATH } from '../../utils/apiPaths';
// import { UserContext } from '../../context/userContext';
// import uploadImage from '../../utils/uploadImage';


// const SignUp = () => {

//   const navigate = useNavigate();

//   // const [profilePic, setProfilePic] = useState("")
//   const [fullName, setFullName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const [error, setError] = useState(null)

//   const { updateUser } = useContext(UserContext)

//   const handleSignUp = async (e) => {
//     e.preventDefault()

//     let profileImageUrl = ""

//     if (!fullName) {
//       setError("Enter your full name")
//       return
//     }
//     if (!validEmail(email)) {
//       setError("enter valid emailId")
//       return
//     }

//     if (!password) {
//       setError("enter password")
//       return
//     }

//     setError("")

//     // SignUp API call

//     try {

//       // upload image if present
//       if (profilePic) {
//         const imgUploadRes = await uploadImage(profilePic)
//         profileImageUrl = imgUploadRes.imageUrl || "";
//       }

//       const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
//         fullName,
//         email,
//         password,
//         profileImageUrl,
//       });

//       const { token, user } = response.data;

//       if (token) {
//         localStorage.setItem("token", token);
//         updateUser(user)
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         setError(error.response.data.message)
//       } else {
//         setError(error.message)
//       }
//     }
//   }

//   return (
//     <AuthLayout>



//       <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
//         <h3 className='text-xl font-semibold text-black'>
//           Create New Account
//         </h3>
//         <p className='text-[13px] text-slate-700 mt-[5px] mb-6'>
//           Join us today by entering your details below.
//         </p>

//         <form onSubmit={handleSignUp}>

//           <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

//           <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//             <Input
//               type="text"
//               value={fullName}
//               onChange={({ target }) => setFullName(target.value)}
//               label="Full name"
//               placeholder="Aanchal Borse"
//             />

//             <Input
//               type="text"
//               value={email}
//               onChange={({ target }) => setEmail(target.value)}
//               label="Email Address"
//               placeholder='aanchalborse@gmail.com'
//             />

//             <div className='col-span-2'>
//               <Input
//                 type="password"
//                 value={password}
//                 onChange={({ target }) => setPassword(target.value)}
//                 label="Password"
//                 placeholder='password'
//               />
//             </div>
//           </div>

//           {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

//           <button type='submit' className='btn-primary cursor-pointer'>
//             SIGN UP
//           </button>

//           <p className='text-[13px] text-slate-800 mt-3'>
//             Already have an account?
//             <Link className='font-medium text-primary underline' to="/login"> Login</Link>
//           </p>

//         </form>
//       </div>

//     </AuthLayout>
//   )
// }

// export default SignUp// import React, { useState } from 'react'
// // import AuthLayout from '../../components/layouts/AuthLayout'
// // import { useNavigate, Link } from 'react-router-dom';
// // import Input from "../../components/Inputs/Input";
// // import { validateEmail } from '../../utils/helper';

// // const SignUp = () => {
// //   const [profilePic, setProfilePic] = useState(null);
// //   const [fullName, setFullName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const [error, setError] = useState(null);

// //   const navigate = useNavigate();

// //   // Handle Sign Up Form Submit
// //   const handleSignUp = async (e) => {
// //     e.preventDefault();

// // let profileImageUrl = "";

// // if (!fullName) {
// // setError("Please enter your name");
// // return;
// // }

// // if (!validateEmail(email)) {
// // setError("Please enter a valid email address.");
// // return;
// // }

// // if (!password) {
// // setError("Please enter the password");
// // return;
// // }

// // setError("");

// // // SignUp API Call
// //    };

// //   return (
// //     <AuthLayout>
// //       <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center
// // ">
// //         <h3 className="text-xl font-semibold text-black">Create an Account</h3>
// //         <p className="text-xs text-slate-700 mt-[5px] mb-6">
// //           Join us today by entering your details below.
// //         </p>
// //         <form onSubmit={handleSignUp}>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <Input
// //               value={fullName}
// //               onChange={({ target }) => setFullName(target.value)}
// //               label="Full Name*"
// //               placeholder=" "
// //               type="text"
// //             />
// //             <Input
// //               value={email}
// //               onChange={(({ target }) => setEmail(target.value))}
// //               label="Email Address*"
// //               placeholder="xyz@example.com"
// //               type="text"
// //             />
// //             <div className="col-span-2">

// //               <Input
// //                 value={password}
// //                 onChange={({ target }) => setPassword(target.value)}
// //                 label="Password*"
// //                 placeholder="Minimum 8 characters"
// //                 type="password"
// //               />
// //             </div>

// //           </div>
// //           {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

// // <button type="submit" className="btn-primary">
// //   SIGN UP
// // </button>

// // <p className="text-[13px] text-slate-800 mt-3">
// //   Already have an account?{" "}
// //   <Link className="font-medium text-primary" to="/login">
// //     Login
// //   </Link>
// // </p>

// //         </form>
// //       </div>
// //     </AuthLayout>
// //   );
// // };


// // export default SignUp