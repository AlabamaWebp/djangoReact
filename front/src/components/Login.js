import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../Instance";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    async handleSubmit(event) {
        event.preventDefault();
        axiosInstance.post('/token/', {
            username: this.state.email,
            password: this.state.password
        }).then(function (response) {
            axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            window.location.href = "/";
        }).catch(() => {
            alert("Неверный ввод")
        })
    }
    render() {
        return (
            <div>
                <nav className="bord-b">
                    <Link className={"nav-link"} to={"/signup/"}>Регистрация</Link>
                </nav>
                <form className="cont bord padd" onSubmit={this.handleSubmit}>
                    <h3>Вход</h3>
                    <div className="cont child">
                        <p>Email:</p>
                        <input name="email" type="email" value={this.state.email} onChange={this.handleChange} />
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