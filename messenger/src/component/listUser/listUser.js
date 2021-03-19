import React, { Component } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios'
import { Redirect } from 'react-router';
import Modal from './modal'
import Friend from './friend.js'
import User from './user'
import io from 'socket.io-client'
var socket =
    //io("https://messengers-server.herokuapp.com/");
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
            user: {},
            massage_errors: ""

        }
    }
    componentDidMount() {
        if (Cookies.get("user")) {
            var user = JSON.parse(Cookies.get("user"));
            this.setState({
                user: user
            });
            axios.post("/user/getFriend", { userId: user.id }).then(
                results => {
                    this.setState({
                        listFriend: results.data
                    });
                }
            )
            socket.on('connect', () => {
                const rooms = this.state.user.username + "s";
                socket.emit("rooms-addfriend", rooms);

                socket.on("request-invation", results => {
                    alert(results);
                })
                socket.on("request-upload-massage", data => {
                    let checkAddFriend = [];
                    const values = {
                        friendId: data.userId,
                        message: data.message
                    }
                    checkAddFriend.push(values);

                    if (this.state.checkAddFriend.length < 1) {
                        this.setState({
                            checkAddFriend: checkAddFriend
                        });
                    } else {
                        const pos = this.state.checkAddFriend.map(function (e) { return e.friendId; }).indexOf(checkAddFriend[0].friendId);
                        if (pos < 0) {
                            this.state.checkAddFriend.push(checkAddFriend[0])
                            this.setState({
                                checkAddFriend: this.state.checkAddFriend
                            });
                        } else {
                            this.state.checkAddFriend.splice(pos, 1)
                            this.state.checkAddFriend.push(checkAddFriend[0])
                            this.setState({
                                checkAddFriend: this.state.checkAddFriend
                            });
                        }

                    }
                })

                socket.on("request-upload-friend", data => {
                    this.setState({ listFriend: data });
                })
            })
        }

    }

    postTxtSearch = async (event) => {
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
                                        this.setState({
                                            checkAddFriend: checkAddFriend
                                        });
                                    } else {
                                        const pos = this.state.checkAddFriend.map(function (e) { return e.friendId; }).indexOf(checkAddFriend[0].friendId);
                                        if (pos < 0) {
                                            this.state.checkAddFriend.push(checkAddFriend[0])
                                            this.setState({
                                                checkAddFriend: this.state.checkAddFriend
                                            });
                                        } else {
                                            this.state.checkAddFriend.splice(pos, 1)
                                            this.state.checkAddFriend.push(checkAddFriend[0])
                                            this.setState({
                                                checkAddFriend: this.state.checkAddFriend
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


        const btnSearch = () => {
            if (this.state.txtSearch !== "") {
                return (
                    <button onClick={(event) => { this.setState(() => { this.postTxtSearch() }); }} type="button" className="input-group-text search_btn " data-toggle="modal" data-target="#exampleModal">
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
        if (!Cookies.get("user")) {
            console.log("a");
            return <Redirect to="/" />
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
                                    socket={socket}
                                    txtSearch={this.state.txtSearch}
                                />
                                {/* end Modal */}

                                <div className="input-group">
                                    <User user={this.state.user} />

                                    <input onChange={(event) => { this.setState({ txtSearch: event.target.value }); }} type="text" placeholder="Search..." name className="form-control search  " />
                                    <div className="input-group-prepend">
                                        {btnSearch()}
                                        {/* //<span className="input-group-text search_btn"></span> */}

                                    </div>

                                </div>
                                <div className="icon-messenger"><i class="fab fa-facebook-messenger icon"></i>
                                    <div className="btn-group dropleft">
                                        <button type="button" className="btn btn-secondary " id="action_menu_btn1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-ellipsis-v drop1" />
                                        </button>
                                        <div className="dropdown-menu action_menu1" id="action_menu">
                                            <div className="ul">
                                                <div style={{ color: "red" }} onClick={() => { }} className="li"  >Xóa Tin   &ensp; <i class="fas fa-trash delete"></i> </div>
                                                <hr style={{ width: "80%", margin: "0px", marginLeft: "17px ", backgroundColor: "white" }}></hr>
                                                <div className="li"
                                                    onClick={() => {
                                                        Cookies.remove('user')
                                                        this.setState({
                                                            txtSearch: "",
                                                           
                                                        });
                                                    }}>
                                                    Đăng Xuất
                                                    <i class="fas fa-sign-out-alt signout"></i>
                                                </div>
                                            </div>

                                        </div>
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