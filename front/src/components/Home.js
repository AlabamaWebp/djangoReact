import React, { Component } from "react";
import axiosInstance from "../Instance";
// import Home2 from "./Home2";
import { Link, } from 'react-router-dom';
import Pub from "./Pub";
// import Search from "./Search";
export default class Home extends Component {
    async handleLogout() {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            window.location.href = "/login"
            return response;
        }
        catch (e) {
            console.log(e);
        }
    };
    render() {
        return (
            <div>
                <nav className="nav between">
                    {/* <h3>Home</h3> */}
                    <Link to='create/' className="polubut lo">Создать</Link>
                    <button className="lo" onClick={this.handleLogout}>Выйти</button>
                </nav>
                {/* <Search /> */}
                <div className=''>
                    <Pub />
                </div>
            </div >

        )
    }
}
