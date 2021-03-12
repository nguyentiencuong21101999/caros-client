import React, { Component } from 'react';
import io from 'socket.io-client'
import axios from 'axios';
var socket = io("http://localhost:4000/");

// io("https://messenger-sever.herokuapp.com/");

class messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt_messenger: "",
            auth: true,
            txt_name: "",
            txt_password: "",
            rooms: [],
            currentRoom: -1,
            value_messenger: [],
            name: ""

        }
    }

    componentDidMount() {

        socket.on('connect', () => {

            socket.on("list-rooms", (results) => {
                this.setState({
                    rooms: results
                });
            })

            socket.on("value-messenger", results => {
                console.log(results);
                this.setState({
                    value_messenger: results
                });
            })
        }
        )

    }
    sendMessenger = (event) => {
        const value = document.getElementById("messenger").value;
        const values = {
            messenger: value,
            currentRoom: this.state.currentRoom,
            name: this.state.txt_name
        }
        socket.emit("send-messenger", values)
        this.setState({
            txt_messenger: ""
        });

    }

    getValue = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    authPassword = (currentRoom) => {
        const values = {
            name: this.state.txt_name,
            password: this.state.txt_password,
            currentRoom: currentRoom
        }
        socket.emit("create-rooms", values)
        this.setState({
            name: this.state.txt_name,
            auth: false,
            currentRoom: currentRoom
        });
    }
    render() {
        const rooms = () => {
            if (this.state.txt_name !== "" && this.state.txt_password !== "") {
                if (this.state.rooms.length > 0) {
                    return (
                        <button
                            onClick={() => { this.authPassword(this.state.rooms[0].roomName) }}
                            type="button"
                            class="btn btn-danger">
                            rooms {this.state.rooms[0].roomName}
                        </button>
                    )
                }
            }
        }
        const password = () => {
            if (this.state.auth) {
                return (
                    <div>

                        <div style={{ marginLeft: "20%" }} className="form-group">
                            <label for="usr">Name :</label>
                            <input onChange={(event) => { this.getValue(event) }} style={{
                                width: "200px",
                            }} type="text" className="form-control" name="txt_name" id="usr" />
                        </div>
                        <div style={{ marginLeft: "20%" }} className="form-group">
                            <label for="usr">Password :</label>
                            <input onChange={(event) => { this.getValue(event) }} style={{
                                width: "200px",
                            }} type="text" className="form-control" name='txt_password' id="usr" /> <br></br>
                            {rooms()}

                        </div>
                    </div>
                )
            }
        }
        const value_messenger = () => {
            if (this.state.value_messenger.length > 0) {
                return this.state.value_messenger.map(element => {
                    if (element.name === this.state.name) {
                        return (
                            <div className="d-flex justify-content-start mb-4">
                                <div className="img_cont_msg">
                                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                                </div>
                                <div className="msg_cotainer">
                                    {element.messenger}
                                <span className="msg_time">8:40 AM, Today</span>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="d-flex justify-content-end mb-4">
                                <div className="msg_cotainer_send">
                                {element.messenger}
                                        <span className="msg_time_send">8:55 AM, Today</span>
                                </div>
                                <div className="img_cont_msg">
                                    <img src="https://vcdn-ngoisao.vnecdn.net/2019/09/25/ANH-1-9778-1569408745.png" className="rounded-circle user_img_msg" />
                                </div>
                            </div>
                        )
                    }

                })

            }
        }

        const messenger = () => {
            if (!this.state.auth) {
                return (
                    <div className="container-fluid h-100">
                        <div className="row justify-content-center h-100">
                            <div className="col-md-8 col-xl-6 chat">
                                <div className="card">
                                    <div className="card-header msg_head">
                                        <div className="d-flex bd-highlight">
                                            <div className="img_cont">
                                                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" />
                                                <span className="online_icon" />
                                            </div>
                                            <div className="user_info">
                                                <span>Trang óc cặc</span>
                                                <p>1767 Messages</p>
                                            </div>
                                            <div className="video_cam">
                                                <span><i className="fas fa-video" /></span>
                                                <span><i className="fas fa-phone" /></span>
                                            </div>
                                        </div>
                                        <span id="action_menu_btn"><i className="fas fa-ellipsis-v" /></span>
                                        <div className="action_menu">
                                            <ul>
                                                <li><i className="fas fa-user-circle" /> View profile</li>
                                                <li><i className="fas fa-users" /> Add to close friends</li>
                                                <li><i className="fas fa-plus" /> Add to group</li>
                                                <li><i className="fas fa-ban" /> Block</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-body msg_card_body">
                                        {value_messenger()}
                                    </div>
                                    <div className="card-footer">
                                        <div className="input-group">
                                            <div className="input-group-append">
                                                <span className="input-group-text attach_btn"><i className="fas fa-paperclip" /></span>
                                            </div>
                                            <input onChange={(event) => { this.getValue(event) }} style={{ width: "200px" }} id="messenger" value={this.state.txt_messenger} name="txt_messenger" type="text" className="form-control" />
                                            <div className="input-group-append">
                                                {/* <i className="fas fa-location-arrow" /> */}
                                                <input onClick={(event) => { this.sendMessenger(event) }} value="send" type="submit" className="input-group-text send_btn"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return (

            <div className="messenger">
                {password()}
                {messenger()}
            </div>
        )
    }
}

export default messenger;