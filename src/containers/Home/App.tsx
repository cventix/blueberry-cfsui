import React, { Component } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Main } from "../../components/Main/Main";
import "./App.css";

import { Content } from "../../components/Content/Content";
import { Table } from "../../components/Table/Table";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <Main>
          <Content />
        </Main>
      </div>
    );
  }
}

export default App;
