import React from "react";
import { Link } from "react-router-dom";
import { landingPageImage } from "../../assets";
import "./LandingPage.css";
import { onAuthStateChanged } from "firebase/auth";
import   { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";
import { auth } from "../../firebase";

const LandingPage = () => {
  const navigate = useNavigate();
 
  const handleLogout = () => {               
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/login");
      console.log("Signed out successfully")
    }).catch((error) => {
      // An error happened.
    });
  };

  return (
    <div className="hero-banner-section">
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '30px' }}>
         
          <Link to="/login"><button>Login</button></Link>
          <Link to="/signup"><button>Sign Up</button></Link>
       
        <button onClick={handleLogout} style={{  width:'auto' }}>Sign Out</button>
      </div>

  

      <div className="banner-img">
        <div className="headings" style={{  height: 'auto' }}>
          <div className="banner-heading-1" style={{  textAlign: 'left' }}  >Team Introduction:</div>
          
         </div>

        <div className="banner-paragraph">
        Mounika Sanaboyina (Student Id: 16354670)        </div>
        <div className="banner-paragraph">
        Snigdhasetty Chandaluri (Student Id: 16352688)        </div>
        <div className="banner-paragraph">
        Prudhvi Cherukuri (Student Id: 16352686)        </div>
        <div className="banner-paragraph">
        Apoorva Vatturi (Student Id: 16354389)        </div>
      </div>
      <div className="banner-text">
        <div className="headings">
        
          <div className="banner-heading-1">Event Planner</div>
          <div className="word-snapchat">using </div>
          <div className="banner-heading-2">Cloud Tech</div>
        </div>

        <div className="banner-paragraph">
        Transforming Events Management: Driven by Cloud Technology
        </div>
      </div>

      <Link to="/create-event">
        <button className="button">
          <p className="button-text">🎉 Create my event</p>
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
