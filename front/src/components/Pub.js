import React, { Component } from 'react'
import axiosInstance from '../Instance';
import Edit from './Edit';
import Search from './Search';
export default class pub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            id: 0,
            repo: [],
            isEdit: false,
            content: "",
            flagId: false,
            flagAl: false
        };
        this.handleClick = this.handleClickDel.bind(this);
        this.handleClick = this.handleClickEd.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.sortId = this.sortId.bind(this);
        this.sortAl = this.sortAl.bind(this);
    }
    setSearch(value) {
        axiosInstance.get('pubserch/?search=' + value)
            .then((response) => {
                this.setState({ repo: response.data, })
                console.log(response.data)
            });
    }
    handleClickDel(id, content) {
        axiosInstance.delete('p/' + id).then(() => { this.componentDidMount() });
        axiosInstance.post('/h/', { action: "Удаление", pub: content })
    }
    handleClickEd(id, cont) {
        this.setState({ id: id, isEdit: true, content: cont });
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
    handleBack() { this.setState({ isEdit: false }); this.forceUpdate(); }
    // window.location.reload()
    sortId() {
        this.state.flagId = !this.state.flagId
        if (this.state.flagId) {
            this.state.repo.sort((a, b) => a.id > b.id ? -1 : 1);
        }
        else {
            this.state.repo.sort((a, b) => a.id > b.id ? 1 : -1);
        }
        this.forceUpdate();
    }
    sortAl() {
        this.state.flagAl = !this.state.flagAl
        if (this.state.flagAl) {
            this.state.repo.sort((a, b) => a.content > b.content ? 1 : -1);
        }
        else {
            this.state.repo.sort((a, b) => a.content > b.content ? -1 : 1);
        }
        this.forceUpdate();
    }
    render() {
        if (this.state.isEdit) {
            return (<Edit id={this.state.id} back={this.handleBack}
                lastContent={this.state.content} />)
        }
        if (!this.state.isLoaded) {
            return (<div className='container'><b>Идёт загрузка...</b></div>)
        }
        if (this.state.repo.length === 0 & this.state.isLoaded) {
            return (<div className='container'><b>Нет записей</b></div>)
        }
        return (
            <div className='container'>
                <Search setSearch={this.setSearch} />
                <div>Сортировка по: <button className='sort' onClick={() => this.sortId()}>id</button> <button className='sort' onClick={() => this.sortAl()}>Алфавиту</button></div>
                {this.state.repo.map((repos) => (
                    <div className='block' key={repos.id}>
                        <b>Пользователь: {repos.user.username}</b>
                        <div>{repos.content}</div>
                        <div className='right'>
                            <button onClick={() => this.handleClickEd(repos.id, repos.content)} className='ed'>Редактировать</button>
                            <button onClick={() => this.handleClickDel(repos.id, repos.content)} className='ed del'>Удалить</button>
                        </div>
                        <hr></hr>
                    </div>
                ))}
            </div>
        )
    }
}
