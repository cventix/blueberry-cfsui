import React, { Component } from "react";
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
        <Main></Main>
      </div>
    );
  }
}

export default App;
