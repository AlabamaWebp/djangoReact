import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import axiosInstance from "../Instance";
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    async handleSubmit(event) {
        event.preventDefault();
        axiosInstance.post('/u/c', {
            username: this.state.email,
            email: this.state.email,
            password: this.state.password
        })
            .then(function (response) {
                console.log(response);
                window.location.href = "/login"
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <nav className="bord-b">
                    <Link className={"nav-link"} to={"/login/"}>Войти</Link>
                </nav>
                <form className="cont bord padd" onSubmit={this.handleSubmit}>
                    <h3>Регистрация</h3>
                    <div className="cont child">
                        <p>Email:</p>
                        <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="cont child">
                        <p>Пароль:</p>
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <input className="but" type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}