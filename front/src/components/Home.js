import React, { Component } from "react";
import axiosInstance from "../Instance";
import Pub from "./Pub";
import Create from "./Create";
import History from "./History";
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create: false,
            history: false
        };
        this.handleBack = this.handleBack.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleHistory = this.handleHistory.bind(this);
    }
    handleHistory() { this.setState({ history: true }) }
    handleCreate() { this.setState({ create: true }) }
    handleBack() { this.setState({ create: false, history: false }); this.forceUpdate(); }
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
        if (this.state.create) { return (<Create back={this.handleBack} />) }
        if (this.state.history) { return (<History back={this.handleBack} />) }
        else {
            return (
                <div>
                    <nav className="nav between">
                        <div><b style={{ fontSize: 26 }}>Записи</b></div>
                        <div>
                            <button onClick={() => this.handleHistory()} className="polubut lo margin">История</button>
                            <button onClick={() => this.handleCreate()} className="polubut lo margin">Создать</button>
                            <button className="lo margin" onClick={this.handleLogout}>Выйти</button>
                        </div>
                    </nav>
                    <div className=''>
                        <Pub />
                    </div>
                </div >

            )
        }
    }
}
