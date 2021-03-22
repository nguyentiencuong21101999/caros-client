import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';

class messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt_messenger: "",
            current_value_messenger: [],
            value_messenger: [],
            icon: false,
            fileImage: []
        }
    }
    componentDidMount() {
        const user = JSON.parse(Cookies.get("user"));
        const val = { user: user.username, friend: this.props.friend.username };
        axios.post("/user/upload-value-message", val)
            .then(results => {
                this.setState({
                    value_messenger: results.data
                });
                this.scrollToBottom()
            })
        this.props.socket.on("request-send-messenger", async data => {
            this.setState({
                value_messenger: data
            });
        })
    }
    scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
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
        const value = document.getElementById("messenger").value;
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        const values = [{
            dateTime: date + " " + time,
            value_messenger: value,
            icon: "",
            image: "",
            user: user.username,
            friend: this.props.friend.username
        }
        ]
        this.props.socket.emit("send-messenger", values)
        this.setState({
            txt_messenger: ""
        });
        this.scrollToBottom()
    }
    sendIcon = () => {
        const user = JSON.parse(Cookies.get("user"));
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        const values = [{
            dateTime: date + " " + time,
            value_messenger: "",
            icon: "fas fa-heart",
            image: "",
            user: user.username,
            friend: this.props.friend.username
        }
        ]
        this.props.socket.emit("send-messenger", values)
        this.setState({
            txt_messenger: ""
        });
        this.scrollToBottom()
    }
    setCurrentMessage = (element) => {
        this.setState({ current_value_messenger: element });
    }
    changSize = (event) => {
        if (this.state.txt_messenger === "") {
            this.setState({
                icon: true
            });
        } else {
            this.setState({
                icon: false
            });
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

    getFile = (event) => {
        console.log(event.target.files);
        // const fileImage = []
        const fileImages = event.target.files
        if (fileImages.length > 0) {
            const fileImage = [];
            let arr_selectImg = event.target.files;
            for (let i = 0; i < arr_selectImg.length; i++) {
                fileImage.push(arr_selectImg[i])
            }
            this.setState({
                fileImage: fileImage
            });
            this.show_Img(event)
        }
        this.setState({
            txt_messenger: "a"
        });

    }
    show_Img = (event) => {
        var file = document.getElementById('img').files
        var myNode = document.getElementById("displayImg");
        myNode.innerHTML = '';
        for (let i = 0; i < file.length; i++) {
            if (file.length > 0) {
                var fileToLoad = event.target.files[i] // lay hinh dau tien
                var fileReder = new FileReader();
                fileReder.onload = (fileLoaderEvent) => {
                    console.log(fileLoaderEvent.target);
                    var srcData = fileLoaderEvent.target.result // chueyn sang dang base 64
                    var newImg = document.createElement('img');
                    newImg.src = srcData;
                    document.getElementById("displayImg").innerHTML += newImg.outerHTML;
                    this.scrollToBottom()
                }
                fileReder.readAsDataURL(fileToLoad);
            }

        }


    }
    render() {
        const value_messenger = () => {
            const user = JSON.parse(Cookies.get("user"));
            if (this.state.value_messenger.length > 0) {
                const sender = user.username + this.props.friend.username;
                return this.state.value_messenger.map(element => {
                    if (element.sender === sender) {
                        return element.messenger.map(results => {
                            if (user.username === results.sender) {
                                if (results.icon === "") {
                                    return (
                                        <div className="d-flex justify-content-end mb-2">
                                            <div className="msg_cotainer_send">
                                                {results.value_messenger}
                                                <span className="msg_time_send">{results.dateTime}</span>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="d-flex justify-content-end mb-2">
                                            <div className="msg_cotainer_send_1">
                                                <i className="fas fa-heart icons-send" ></i>
                                                <span className="msg_time_send">{results.dateTime}</span>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                            else {
                                if (results.icon === "") {
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
                                } else {
                                    return (
                                        <div className="d-flex justify-content-start mb-2">
                                            <div className="img_cont_msg">
                                                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" alt="" />
                                            </div>
                                            <div className="msg_cotainer_1">
                                                <i class="fas fa-heart icons"></i>
                                                <span className="msg_time">{results.dateTime}</span>

                                            </div>
                                        </div>

                                    )
                                }
                            }
                        })
                    }
                })
            }
        }
        const icon = () => {
            if (this.state.txt_messenger !== "") {
                return (
                    <div id="hidden" className="input-group-append1">
                        <div onClick={(event) => { this.sendMessenger(event) }} value=">" className=" send_btn a"><i style={{
                            // transform: "rotate(-90deg)",
                            position: "absolute",
                            marginLeft: "-8px",
                            fontSize: "30px",
                            marginTop: "15px",

                        }} class="fab fa-vuejs"></i></div>
                    </div>

                )
            } else {
                return (
                    <div id="hidden-icon" className="input-group-append1">
                        <div onClick={(event) => { this.sendIcon(event) }} value=">" className=" send_btn a"><i style={{
                            transform: "rotate(90deg)",
                            position: "absolute",
                            marginLeft: "-12px",
                            fontSize: "30px",
                            marginTop: "13px"
                        }} class="fas fa-heart"></i></div>
                    </div>
                )
            }
        }
        return (
            <div className="messenger" >
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
                                        clear: "both", height: "1px",
                                        color: "rgba(0,0,0,.03)"
                                    }} id="scroll" ref={el => { this.el = el; }} >12312312</div>
                                    {/* {this.scrollToBottom()} */}
                                </div>


                                <span className="displayImg" id="displayImg">
                                </span>
                                <div className="card-footer">

                                    <input id='img' className="inputFile" type='file'
                                        onChange={(event) => { this.getFile(event) }}
                                        name="fileImage"
                                        multiple
                                    ></input>
                                    <label for="img" className="input-group-text-1 attach_btn">
                                        <i className="fas fa-paperclip" />
                                    </label>
                                    <di id="group" className=" input-group">
                                        &ensp; &ensp;&ensp;<textarea autoComplete="off"
                                            onChange={(event) => { this.changSize(event) }}
                                            style={{ resize: "none", width: "200px", height: "35px", overflow: "hidden", marginLeft: "27px" }}
                                            id="messenger"
                                            value={this.state.txt_messenger}
                                            name="txt_messenger" type="text"
                                            className="form-control form1"
                                        />
                                    </di>
                                </div>

                                {icon()}
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default messenger;