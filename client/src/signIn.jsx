import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './css/signIn.css';


export default function SignIn() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
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

    try {
      const response = await fetch("http://localhost:5000/api/users/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        console.log("Logged in");
        navigate("/dashboard");
      } else {
        const data = await response.json();
        console.error("Error logging in:", data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle unexpected errors
    }
  };

    return(
        <div className="container__si">
            <div className="banner__si">
                <div className="bannerImg__si"></div>
                <div className="bannerText__si">
                    <div className="bannerTitle__si">Welcome to SkillBuddy</div>
                    <div className="bannerContent__si">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
                </div>
            </div>
            <div className="signInBox">
                <div className="logo__si">
                    <img src="" alt="logo"></img>
                    <div className="home__si">
                        <a href="/">Back To Home</a>
                    </div>
                </div>
                <h1>Login into your account</h1>
                <form id="signInForm" onSubmit={handleSubmit}>
                    <div className="formGroup__si">
                        <label className="formLabel__si">Username or Email Address</label>
                        <input type="text" name="usernameOrEmail" className="formInput__si" value={formData.usernameOrEmail} onChange={handleChange} required/>
                    </div>
                    <div className="formGroup__si">
                        <label className="formLabel__si">Password</label>
                        <input type="password" name="password" className="formInput__si" value={formData.password} onChange={handleChange} required/>
                    </div>
                    <div className="formGroupCheck__si">
                        <div className="remember__si">
                            <input type="checkbox" className="formCheck__si"/>
                            <label className="rememberLabel__si">
                                Remember Me
                            </label>
                        </div>
                        <div className="forgot__si">
                            <span>
                                <a href="/">Forgot Password?</a>
                            </span>
                        </div>
                    </div>
                    <div className="submit__si">
                        <button type="submit" className="submitButton__si">Login</button>
                    </div>
                </form>

            </div>
        </div>
    );
}