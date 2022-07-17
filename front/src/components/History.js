import React, { Component } from 'react'
import axiosInstance from '../Instance';

export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            repo: [],
        };
    }
    componentDidMount() {
        axiosInstance.get('h/')
            .then((response) => {
                this.setState({
                    repo: response.data,
                    isLoaded: true
                })
            });
    }
    render() {
        if (this.state.repo.length === 0 & this.state.isLoaded) {
            return (<><nav className='between'>
                <b>История записей</b>
                <button className='back' onClick={() => this.props.back()}>Назад</button>
            </nav>< div className='container' ><b>Нет записей</b></div >
            </>)
        }
        return (
            <>
                <nav className='between'>
                    <b>История записей</b>
                    <button className='back' onClick={() => this.props.back()}>Назад</button>
                </nav>
                <div className='container'>
                    {this.state.repo.map((repos) => (
                        <div id={repos.id} className='block' key={repos.id}>
                            <b>Пользователь: {repos.user.username}</b>
                            <div><b>Действие: </b>{repos.action}</div>
                            <div>Предыдущее содержание: {repos.last_pub}</div>
                            <div>Содержание: {repos.pub}</div>
                            <hr></hr>
                        </div>
                    ))}
                </div>
            </>
        )
    }
}
