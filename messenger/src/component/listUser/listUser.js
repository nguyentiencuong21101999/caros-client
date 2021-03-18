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
            checkAddFriend: [],
            listAcceptFriend: [],
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

    postTxtSearch = async () => {
        var user = JSON.parse(Cookies.get("user"));
        const values = {
            txtSearch: this.state.txtSearch
        }

        await axios.post("/user/getUserByFullname", values)
            .then(
                async results => {

                    this.setState({
                        listSearch: results.data
                    })
                    console.log(results);
                    if (!results.data.status) {
                        results.data.map(element => {
                            const value = {
                                userId: user.id,
                                friendId: element.id
                            }
                            axios.post("/user/checkAddFriend", value).then(
                                results => {
                                    let checkAddFriend = [];
                                    const values = {
                                        friendId: JSON.parse(results.config.data).friendId,
                                        message: results.data.message
                                    }
                                    checkAddFriend.push(values);

                                    if (this.state.checkAddFriend.length < 1) {
                                        console.log("chua co gi");
                                        this.setState({
                                            checkAddFriend: checkAddFriend
                                        });
                                    } else {
                                        console.log(checkAddFriend[0]);
                                       const pos = this.state.checkAddFriend.map(function (e) { return e.friendId; }).indexOf(checkAddFriend[0].friendId);
                                        console.log(pos);
                                        if(pos < 0){
                                            this.state.checkAddFriend.push(checkAddFriend[0])
                                            this.setState({
                                                checkAddFriend:this.state.checkAddFriend
                                            });
                                        }else{
                                            this.state.checkAddFriend.splice(pos,1) 
                                            this.state.checkAddFriend.push(checkAddFriend[0])
                                            this.setState({
                                                checkAddFriend:this.state.checkAddFriend
                                            }); 
                                        }

                                    }
                                }
                            )
                        })

                    }

                })
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
                                        checkAddFriend={this.state.checkAddFriend}
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