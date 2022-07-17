import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import axiosInstance from "../Instance";
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "", err: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    async handleSubmit(event) {
        this.state.err = ""
        event.preventDefault();
        axiosInstance.post('/u/c', {
            username: this.state.email,
            email: "",
            password: this.state.password
        }).then(() => {
            axiosInstance.post('/token/', {
                username: this.state.email,
                password: this.state.password
            })
                .then(function (response) {
                    axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);
                    window.location.href = "/";
                })
        }).catch((e) => {
            if (e.response.status === 400) { this.state.err = "Неверный ввод" }
            if (e.response.status === 500) { this.state.err = "Пользователь с таким Email уже существует" }
            alert(this.state.err)
        })
    }
    render() {
        // const { error } = this.state.err;
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
                        {/* <span>{error}</span> */}
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