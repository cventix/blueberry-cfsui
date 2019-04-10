import React, { Component } from "react";
import logo from "./logo.svg";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Main } from "../../components/Main/Main";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <Main>content</Main>
      </div>
      
    );
  }
}

export default App;
