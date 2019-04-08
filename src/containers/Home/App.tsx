import React, { Component } from "react";
import logo from "./logo.svg";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar text="arezoo"/>
        <Sidebar text="arezoo"/>
      </div>
      
    );
  }
}

export default App;
