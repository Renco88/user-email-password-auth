import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth/cordova";
import auth from "../../firebase.config";
import { useState } from "react";

import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accpeted =e.target.terms.checked;
    console.log(email, password , accpeted);
    setRegisterError("");
    setSuccess("");
    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer");
      return;
    } 
    else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your Password should have at lest one upper case characters"
      );
      return;
    }
    else if (!accpeted){
      setRegisterError('please accept our terms and condition');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("User Create Successfull");
        //update profile
        updateProfile(result.user, {
          displayName:name,
          photoURL:""
        })
        .then(() => console.log('profile update'))
        .catch()
        // send verification email
        sendEmailVerification(result.user)
        .then( () => {
          alert('please check your email and verify your email address')
        })
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div>
      <div className="mx-auto md:w-1/2">
        <h3 className="text-3xl font-bold mb-8 t">Please Register </h3>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 w-full  px-2 py-2"
            type="name"
            placeholder="Your Name"
            name="name"
            id=""
            required
          />
          <input
            className="mb-4 w-full  px-2 py-2"
            type="email"
            placeholder="Email Address"
            name="email"
            id=""
            required
          />
          <br />
          <div className="relative mb-4">
          <input
            className=" w-full  px-2 py-2"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            name="password"
            id=""
            required
          />
          <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <IoEye></IoEye> : <IoMdEyeOff> </IoMdEyeOff>}
          </span>
          </div>
          <br />
          <div>
            <input type="checkbox" name="terms" id="terms" />
            <label className="ml-2" htmlFor="terms">Accpet Our <a  href="">Terms and condition</a></label>
          </div>
          <br />
          <input
            className="btn btn-secondary mb-4 w-full"
            type="submit"
            value="submit"
          />
        </form>
        {registerError && <p className="text-red-600">{registerError}</p>}

        {success && <p className="text-green-600">{success}</p>}
        <p>Already Have an Account Please <Link to='/login'>Log In</Link></p>
      </div>
    </div>
  );
};

export default Register;
