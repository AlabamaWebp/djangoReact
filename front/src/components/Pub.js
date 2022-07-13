import React, { Component } from 'react'
// import Home2 from './Home2'
// import { Link, } from 'react-router-dom';
import axiosInstance from '../Instance';
import Edit from './Edit';
// const repo = Home2()
export default class pub extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            id: 0,
            repo: [],
            isEdit: false
        };
        this.handleClick = this.handleClickDel.bind(this);
        this.handleClick = this.handleClickEd.bind(this);
    }
    handleClickDel(id) {
        axiosInstance.delete('p/' + id)
            .then(() => {
                window.location.reload();
            });
    }
    handleClickEd(id) {
        this.setState({
            id: id,
            isEdit: true
        }
        )
    }
    componentDidMount() {
        axiosInstance.get('p/')
            .then((response) => {
                this.setState({
                    repo: response.data,
                    isLoaded: true
                })
            });
    }
    render() {
        if (this.state.isEdit) {
            return (
                <Edit id={this.state.id} />
            )
        }
        if (!this.state.isLoaded) {
            return (
                < div className='container' >
                    <b>Идёт загрузка...</b>
                </div >
            )
        }
        if (this.state.repo.length === 0 & this.state.isLoaded) {
            return (
                < div className='container' >
                    <b>Нет записей</b>
                </div >
            )
        }
        return (
            <div className='container'>
                {this.state.repo.map((repos) => (
                    <div id={repos.id} className='block' key={repos.id}>
                        <b>Пользователь: {repos.user.username}</b>
                        <div>{repos.content}</div>
                        <div className='right'>
                            {/* <Link to="edit/" className='ed'>Редактировать</Link> */}
                            <button onClick={() => this.handleClickEd(repos.id)} className='ed'>Редактировать</button>
                            <button onClick={() => this.handleClickDel(repos.id)} className='ed del'>Удалить</button>
                        </div>
                        <hr></hr>
                    </div>
                ))}
            </div>
        )
    }
}
