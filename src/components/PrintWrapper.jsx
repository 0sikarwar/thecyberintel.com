import React from "react";
import ReactDOM from "react-dom";
import { handlePrint } from "../utils";
const printRoot = document.getElementById("print-area");
class PrintWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.el.classList.add("print-screen");
    this.currentTitle = document.title;
  }
  handelAfterPrint = () => {
    document.getElementById("print-area").innerHTML = "";
    document.body.classList.remove("printing");
    this.props.setPrintingFlag(false);
    document.title = this.currentTitle;
  };

  componentDidMount() {
    printRoot.appendChild(this.el);
    window.addEventListener("afterprint", this.handelAfterPrint);
    document.title = this.props.title;
    handlePrint();
  }
  componentWillUnmount() {
    window.removeEventListener("afterprint", this.handelAfterPrint);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default PrintWrapper;
