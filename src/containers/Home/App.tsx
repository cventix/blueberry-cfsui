import React, { Component } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Main } from "../../components/Main/Main";
import { Checkbox } from "../../components/ui-elements/Checkbox/Checkbox";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <Main>
        <Checkbox type="indeterminate" disabled={true} checked={true}/>
        </Main>
      </div>
    );
  }
}

export default App;
