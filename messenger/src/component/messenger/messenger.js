import React, { Component } from 'react';
import io from 'socket.io-client'
import axios from 'axios';
var socket = io("http://localhost:4000/");

// io("https://messenger-sever.herokuapp.com/");

class messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mesenger: ""
        }
    }

    componentDidMount() {

        socket.on('connect', () => {
            alert(socket.id)
            socket.emit("test", { a: "a" })
        }
        )

    }
    render() {
        return (
            <div>
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
                                            <span>Chat with Khalid</span>
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
                                    <div className="d-flex justify-content-start mb-4">
                                        <div className="img_cont_msg">
                                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                                        </div>
                                        <div className="msg_cotainer">
                                            Hi, how are you samim?
                                        <span className="msg_time">8:40 AM, Today</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end mb-4">
                                        <div className="msg_cotainer_send">
                                            Hi Khalid i am good tnx how about you?
                                        <span className="msg_time_send">8:55 AM, Today</span>
                                        </div>
                                        <div className="img_cont_msg">
                                            <img src="https://vcdn-ngoisao.vnecdn.net/2019/09/25/ANH-1-9778-1569408745.png" className="rounded-circle user_img_msg" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="input-group">
                                        <div className="input-group-append">
                                            <span className="input-group-text attach_btn"><i className="fas fa-paperclip" /></span>
                                        </div>
                                        <textarea name className="form-control type_msg" placeholder="Type your message..." defaultValue={""} />
                                        <div className="input-group-append">
                                            <span className="input-group-text send_btn"><i className="fas fa-location-arrow" /></span>
                                        </div>
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

export default messenger;