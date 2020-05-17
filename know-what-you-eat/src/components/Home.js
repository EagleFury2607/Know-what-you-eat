import React, { Component } from "react";
import NavBar from "./NavbarComponent";
import './css/home.css';
import backgroundImage from './css/assests/landingBackground.jpg';
import historyImageHome from './css/assests/list.png';

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar userLogginStatus={"Login"} />
        <div id="Main">
          <img src={backgroundImage} id="background-home" alt="background-img" />
          <div id="MainText">
            We built an application to help you track calorie with ease.
          </div>
        </div>
        <div id="BottomBar">
          <img src={historyImageHome} id="historyButton" alt="history-img" />
          <div id="trackContent">Track your History</div>
        </div>
      </div>
    );
  }
}
export default Home;
