import React, { Component } from 'react'
import axiosInstance from '../Instance';
import { Link } from "react-router-dom"
export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = { content: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
    }
    handleChange(event) {
        this.setState({ content: event.target.value });
    }
    async handleSubmit(event) {
        event.preventDefault();
        axiosInstance.post('/p/', {
            content: this.state.content,
        })
            .then(function (response) {
                console.log(response);
                window.location.href = "/"
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidMount() {
        if (!localStorage.getItem('access_token')) {
            window.location.href = "/login";
        }
    }
    render() {
        return (
            <>
                <nav className='between'>
                    <b>Создание записи</b>
                    <Link to="/">Назад</Link>
                </nav>
                <form className="container" onSubmit={this.handleSubmit} >
                    {/* <input
                        onChange={this.handleChange}
                        name='content'
                        type="text"
                        value={this.state.content}
                        // onChange={e => setSearch(e.target.value)}
                        placeholder="Введите сообщение..."
                        style={{ fontSize: 22 }}
                        className="search"
                    /> */}
                    <textarea placeholder="Введите сообщение..." style={{ fontSize: 22, height: 200, maxWidth: '100%', minWidth: '100%', minHeight: 70 }}
                        className="search" type="text" value={this.state.content}
                        onChange={this.handleChange} />
                    <input className="but" type="submit" value="Готово" />
                </form>
            </>
        )
    }
}
