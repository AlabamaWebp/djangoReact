import React, { Component } from 'react';
import axiosInstance from '../Instance';
import { Link } from "react-router-dom";
export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            id: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ content: event.target.value });
    }
    handleSubmit() {
        axiosInstance.put('p/' + this.state.id, {
            content: this.state.content
        })
            .then(() => {
                window.location.reload();
            });
    }
    componentDidMount() {
        this.state.id = this.props.id
    }
    render() {
        return (
            <>
                <nav className='between'>
                    <b>Редактирование записи</b>
                    <Link to="/">Назад</Link>
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
