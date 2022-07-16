import React, { Component } from 'react';
import axiosInstance from '../Instance';
export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = { content: "", response: [] };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this)
    }
    handleBack() {
        this.props.back()
    }
    handleChange(event) {
        this.setState({ content: event.target.value });
    }
    async handleSubmit(event) {
        event.preventDefault();
        axiosInstance.post('/p/', { content: this.state.content, })
        axiosInstance.post('/h/', {
            action: "Создание",
            pub: this.state.content
        })
        this.handleBack()
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
                    <button className='back' onClick={() => this.handleBack()}>Назад</button>
                </nav>
                <form className="container" onSubmit={this.handleSubmit} >
                    <textarea placeholder="Введите сообщение..." style={{ fontSize: 22, height: 200, maxWidth: '100%', minWidth: '100%', minHeight: 70 }}
                        className="search" type="text" value={this.state.content}
                        onChange={this.handleChange} />
                    <input className="but" type="submit" value="Готово" />
                </form>
            </>
        )
    }
}
