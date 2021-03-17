import React, { Component } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios'
import { Redirect } from 'react-router';
import Modal from './modal'
import Friend from './friend.js'
import io from 'socket.io-client'
import friend from './friend.js';
var socket =
    //io("https://messenger-sever.herokuapp.com/");
    io("http://localhost:4000/");
class listUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSearch: "",
            listUser: [],
            listSearch: [],
            listFriend: [],
            massage_errors: ""

        }
    }
    componentDidMount() {
        var user = JSON.parse(Cookies.get("user"));
        // socket.on('connect', () => { })

        axios.post("/user/getFriend", { userId: user.id }).then(
            results => {
                this.setState({
                    listFriend: results.data
                });
            }
        )
    }

    postTxtSearch = () => {
        const values = {
            txtSearch: this.state.txtSearch
        }
        axios.post("/user/getUserByFullname", values)
            .then(
                results => {

                    this.setState({
                        listSearch: results.data
                    });
                }
            )
    }
    render() {
        if (!Cookies.get("user")) {
            return <Redirect to="/" />
        }

        const btnSearch = () => {
            if (this.state.txtSearch !== "") {
                return (
                    <button onClick={() => { this.postTxtSearch() }} type="button" className="input-group-text search_btn " data-toggle="modal" data-target="#exampleModal">
                        <i className="fas fa-search" />
                    </button>
                )
            }
        }
        const friend = () => {
            if (this.state.listFriend.length > 0) {
                return (
                    <Friend listFriend={this.state.listFriend} />
                )
            }

        }

        return (
            <div>
                <div className="container-fluid h-100">
                    <div className="row justify-content-center h-100">
                        <div className="col-md-4 col-xl-3 chat"><div className="card mb-sm-3 mb-md-0 contacts_card">
                            <div className="card-header">
                                {/* Modal */}
                                <Modal listSearch={this.state.listSearch}
                                />
                                {/* end Modal */}
                                <div className="input-group">
                                    <input onChange={(event) => { this.setState({ txtSearch: event.target.value }); }} type="text" placeholder="Search..." name className="form-control search " />
                                    <div className="input-group-prepend">
                                        {btnSearch()}
                                        {/* //<span className="input-group-text search_btn"></span> */}
                                    </div>
                                </div>
                            </div>
                            {friend()}
                        </div>
                        </div></div></div>
            </div>
        )
    }
}

export default listUser;