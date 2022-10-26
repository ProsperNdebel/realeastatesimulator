import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//this is for authenticating our users
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
//this is for sacing the signed up user in the database
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowrightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  //this state manages all form inputs rather than having a state for each form input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //then we destructure to get the data in the fields of  the forms
  const { name, email, password } = formData;

  //also initialize the useNavigate
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  //for submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //Register User
      const auth = getAuth();
      //registers the user, this returns a promise
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //getting the actual user infor for the data base
      const user = userCredential.user;
      //updating the display name
      updateProfile(auth.currentUser, { displayName: name });
      //this is how you redirect in reactjs

      //Add user to the database
      //I dont want to change the formData state
      const formDataCopy = {
        ...formData,
      };

      //I want to exclude the password when storing in the database
      delete formDataCopy.password;
      //giving this user the time of creation
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with registration");
    }
  };

  return (
    <>
      <div className="paigeContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="nameInput"
              placeholder="name"
              id="name"
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              className="emailInput"
              placeholder="email"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={() => {
                  setShowPassword((prevState) => !prevState);
                }}
              />
            </div>
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>
            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowrightIcon fill="#fff" width="34px" height="34px" />
              </button>
            </div>
          </form>
          <OAuth />
          <Link to="/sign-up" className="registerLink">
            Sign In instead
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
