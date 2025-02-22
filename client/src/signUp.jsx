import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import './css/signUp.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add validation here

    try {
      const response = await fetch("http://localhost:5000/api/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User created successfully");
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
        navigate("/dashboard")
      } else {
        const data = await response.json();
        console.error("Error creating user:", data.error);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle unexpected errors
    }
  };

  return (
    <div className="container__su">
      <div className="banner__su">
        <div className="bannerImg__su"></div>
        <div className="bannerText__su">
          <div className="bannerTitle__su">Welcome to SkillBuddy</div>
          <div className="bannerContent__su">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
        </div>
      </div>
      <div className="signUpBox">
        <div className="logo__su">
          <img src="" alt="logo"></img>
          <div className="home__su">
            <a href="/">Back To Home</a>
          </div>
        </div>
        <h1>Login into your account</h1>
        <form id="signUpForm" onSubmit={handleSubmit}>
          <div className="formName__su">
            <div className="formGroup__su">
              <label className="formLabel__su">First Name</label>
              <input type="text" name="firstname" className="formInput__su" value={formData.firstname} onChange={handleChange} required />
            </div>
            <div className="formGroup__su">
              <label className="formLabel__su">Last Name</label>
              <input type="text" name="lastname" className="formInput__su" value={formData.lastname} onChange={handleChange} required />
            </div>
          </div>
          <div className="formGroup__su">
            <label className="formLabel__su">Username</label>
            <input type="text" name="username" className="formInput__su" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="formGroup__su">
            <label className="formLabel__su">Email Address</label>
            <input type="text" name="email" className="formInput__su" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="formGroup__su">
            <label className="formLabel__su">Password</label>
            <input type="password" name="password" className="formInput__su" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="submit__su">
            <button type="submit" className="submitButton__su">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}
