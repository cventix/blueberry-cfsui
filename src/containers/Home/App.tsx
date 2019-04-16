import React, { Component } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Main } from "../../components/Main/Main";
import { SearchInput } from "../../components/ui-elements/SearchInput/SearchInput";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <Main><SearchInput withSetting={true}/></Main>
      </div>
    );
  }
}

export default App;
