import React, { Component } from "react";
import "./App.css";
// import UseReducer from "./hooks/UseReducer";
// import UseRef from "./hooks/UseRef";
// import UseArray from "./hooks/UseArray";
// import UseBoolean from "./hooks/UseBoolean";
// import UseInput from "./hooks/UseInput";
// import UseMountUnmount from "./hooks/UseMountUnmount";
// import UseActive from "./hooks/UseActive";
// import UseInterval from "./hooks/UseInterval";
// import UseAsync from "./hooks/UseAsync";
import UseBattery from "./hooks/UseBattery";

class App extends Component {
  render() {
    return (
      <div className="App">
        <UseBattery />
      </div>
    );
  }
}

export default App;
