import React, { useState } from 'react'

const Input = ({ value, onChange, label, placeholder, type }) => {

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <label className='text-[13px] text-slate-800 dark:text-white'>{label}</label>

            <div className='input-box'>
                <input
                    type={type == 'password' ? showPassword ? 'text' : 'password' : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e)}
                    className='w-full bg-transparent outline-none'
                />
                {type === 'password' && (
                    <button type="button" onClick={toggleShowPassword}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                )}

                {/* If type is 'password', the expression inside (...) will be rendered.
                If not, React will skip rendering this part. */}

            </div>

        </div>
    )
}

export default Input
// import React, { useState } from 'react'
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

// const Input = (({ value, onChange, placeholder, label, type }) => {
//   const [showPassword, setShowPassword] = useState(false);

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div>
//       <label className="text-[13px] text-slate-800">{label}</label>

//       <div className="input-box">
//         <input
//           type={type === 'password' ? showPassword ? 'text' : 'password' : type}
//           placeholder={placeholder}
//           className="w-full bg-transparent outline-none"
//           value={value}
//           onChange={(e) => onChange(e)}
//         />
//         {type === "password" && (
//   showPassword ? (
//     <FaRegEye
//       size={22}
//       className="text-primary cursor-pointer"
//       onClick={() => toggleShowPassword()}
//     />
//   ) : (
//     <FaRegEyeSlash
//       size={22}
//       className="text-slate-400 cursor-pointer"
//       onClick={() => toggleShowPassword()}
//     />
//   )
// )}
//       </div>
//     </div>
//   )
// })

// export default Input