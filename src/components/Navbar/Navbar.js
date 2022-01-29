import React from "react";
import '../../App.css';


class Navbar extends React.Component {

  constructor(props){
    super(props)
    this.state={
    }
  }

  render(){
    return (
        <div>
        <section id="nav-bar">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

            <a className="navbar-brand" href="/">Stark</a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarColor01"
                aria-controls="navbarColor01"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home</a>
                    
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/table">
                    Projects
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/dashboard">
                    Dashboard
                    </a>
                </li>
                </ul>
            </div>
            </nav>
        </section>
        </div>
    )};
}

export default Navbar;
