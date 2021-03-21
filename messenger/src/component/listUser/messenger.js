import Cookies from 'js-cookie';
import React, { Component } from 'react';
import user from './user';


class messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt_messenger: "",
            current_value_messenger: []
        }

    }
    componentDidMount() {
        //#region 
        // console.log(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString());
        // navigator.serviceWorker.register('../../../public/index.html');
        // if (Notification.permission === 'granted') {
        //     // navigator.serviceWorker.ready.then(function (registration) {
        //     //     registration.showNotification('Notification with ServiceWorker');
        //     // });
        //     this.showNotication()
        // } else if (Notification.permission !== 'denied') {
        //     Notification.requestPermission().then(permission => {
        //         console.log(permission);
        //         // if (Notification.permission === 'granted') {
        //         //     this.showNotication()
        //         // }
        //         if (permission === 'granted') {
        //             navigator.serviceWorker.ready.then(function (registration) {
        //                 registration.showNotification('Notification with ServiceWorker');
        //             });
        //         }

        //     })
        // }
        //#endregion


    }
    leaveRooms = (element) => {
        const user = JSON.parse(Cookies.get("user"));
        this.props.showMessenger(element)
        const values = {
            user: user.username,
            friend: this.props.friend.username

        }
        this.props.socket.emit("leave-rooms", values)
    }

    sendMessenger = () => {
        const user = JSON.parse(Cookies.get("user"));
        // if (!this.state.auth) {
        //     this.scrollToBottom();
        // }
        const value = document.getElementById("messenger").value;
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const current_value_messenger = this.props.value_messenger;

        const values = [{
            dateTime: date + " " + time,
            value_messenger: value,
            icon: "",
            image: "",
            user: user.username,
            friend: this.props.friend.username
        },
            current_value_messenger
        ]
        console.log(values);
        this.props.socket.emit("send-messenger", values)
    }
    setCurrentMessage = (element) => {
        this.setState({ current_value_messenger: element });
    }
    changSize = (event) => {
        let textArea = document.getElementById("messenger");

        if (textArea.value === "") {
            document.getElementById("hidden").style.display = "none";
            document.getElementById("hidden-icon").style.display = "block";
        } else {

            document.getElementById("hidden").style.display = "block";
            document.getElementById("hidden-icon").style.display = "none";
        }
        this.setState({ txt_messenger: event.target.value });
        var tx = document.getElementsByTagName('textarea');
        for (var i = 0; i < tx.length; i++) {
            tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
            tx[i].addEventListener("input", OnInput, false);
        }

        function OnInput(event) {
            this.style.height = '10px';
            this.style.height = (this.scrollHeight) + 'px';
        }
    }
    render() {
        const value_messenger = () => {
            const user = JSON.parse(Cookies.get("user"));
            if (this.props.value_messenger.length > 0) {
                const sender = user.username + this.props.friend.username;
                return this.props.value_messenger.map(element => {
                    console.log(element);
                    console.log(sender);
                    if (element.sender === sender) {
                        return element.messenger.map(results => {
                            if (user.username === results.sender) {
                                console.log(results.dateTime);
                                return (
                                    <div className="d-flex justify-content-end mb-2">
                                        <div className="msg_cotainer_send">
                                            {results.value_messenger}

                                            <span className="msg_time_send">{results.dateTime}</span>
                                        </div>
                                        {/* <div className="img_cont_msg">
                                                <img src="https://vcdn-ngoisao.vnecdn.net/2019/09/25/ANH-1-9778-1569408745.png" className="rounded-circle user_img_msg" />
                                            </div> */}
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="d-flex justify-content-start mb-2">
                                        <div className="img_cont_msg">
                                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" alt="" />
                                        </div>
                                        <div className="msg_cotainer">
                                            {results.value_messenger}
                                            <span className="msg_time">{results.dateTime}</span>

                                        </div>
                                    </div>

                                )
                            }
                        })
                    }






                })
            }
        }

        const messenger = () => {
            return (
                <div className="container-fluid h-100">
                    <div className="row justify-content-center h-100">
                        <div className="col-md-8 col-xl-6 chat">
                            <div className="card">
                                <div className="card-header msg_head">
                                    <div className="d-flex bd-highlight">
                                        <i onClick={() => { this.leaveRooms(false) }} class="fas fa-chevron-left back"></i>
                                        <div className="img_cont">
                                            <img src={this.props.friend.image} className="rounded-circle user_img1" alt="" />
                                            <span className="online_icon1" />
                                        </div>
                                        <div className="user_info">
                                            {this.props.friend.fullname}
                                            <span>{this.state.name}</span>
                                            <p>:))</p>
                                        </div>
                                        <div className="video_cam">
                                            <span><i className="fas fa-video" /></span>
                                            <span><i className="fas fa-phone" /></span>
                                            <div
                                                //style={{ margin- left: 74%; margin-top: -50%;}} 
                                                className="btn-group dropleft">
                                                <button type="button" className="btn btn-secondary " id="action_menu_btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fas fa-ellipsis-v drop" />
                                                </button>
                                                <div className="dropdown-menu action_menu" id="action_menu">
                                                    <div className="ul">
                                                        <div style={{ color: "red" }}
                                                            //onClick={() => { this.deleteMessenger() }} 
                                                            className="li"  >Xóa Tin   &ensp; <i class="fas fa-trash delete"></i> </div>
                                                        <hr style={{ width: "80%", margin: "0px", marginLeft: "17px ", backgroundColor: "white" }}></hr>
                                                        <div className="li"
                                                            onClick={() => { this.signOut() }}
                                                        >Đăng Xuất<i class="fas fa-sign-out-alt signout"></i> </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                                <div className="card-body msg_card_body">
                                    {value_messenger()}
                                    <br></br>
                                    <div style={{
                                        marginTop: "-60px", clear: "both", height: "1px",
                                        color: "rgba(0,0,0,.03)"
                                    }} id="scroll" ref={el => { this.el = el; }} >.</div>
                                    {/* {this.scrollToBottom()} */}
                                </div>



                                <div className="card-footer">
                                    <input id='img' className="inputFile" type='file'></input>
                                    <label for="img" className="input-group-text-1 attach_btn">
                                        <i className="fas fa-paperclip" />
                                    </label>
                                    <di id="group" className=" input-group">
                                        &ensp; &ensp;&ensp;<textarea autoComplete="off" onChange={(event) => { this.changSize(event) }} style={{ resize: "none", width: "200px", height: "35px", overflow: "hidden", marginLeft: "27px" }} id="messenger" value={this.state.txt_messenger} name="txt_messenger" type="text" className="form-control form1" />
                                    </di>
                                </div>

                                <div style={{ display: 'none' }} id="hidden" className="input-group-append1">
                                    <div onClick={(event) => { this.sendMessenger(event) }} value=">" className=" send_btn a"><i style={{
                                        // transform: "rotate(-90deg)",
                                        position: "absolute",
                                        marginLeft: "-8px",
                                        fontSize: "30px",
                                        marginTop: "15px",

                                    }} class="fab fa-vuejs"></i></div>
                                </div>
                                <div id="hidden-icon" className="input-group-append1">
                                    <div onClick={(event) => { this.sendMessenger(event) }} value=">" className=" send_btn a"><i style={{
                                        transform: "rotate(90deg)",
                                        position: "absolute",
                                        marginLeft: "-12px",
                                        fontSize: "30px",
                                        marginTop: "13px"
                                    }} class="fas fa-heart"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )


        }

        return (

            <div className="messenger" >
                {/* {password()} */}
                { messenger()}
            </div >
        )
    }
}

export default messenger;