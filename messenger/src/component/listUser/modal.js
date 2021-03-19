import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
// import friend from './friend';
// import { Button, Modal } from 'react-bootstrap'
// import io from 'socket.io-client'
// // var socket =
// //     //io("https://messenger-sever.herokuapp.com/");
// //     io("http://localhost:4000/");

class modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSearch: this.props.listSearch,
            accept: 0,
        }
    }


    addFriend = async (element, massage, event) => {
        const user = JSON.parse(Cookies.get("user"))
        if (massage === "Gửi lời mời") {
            const values = {
                to: element.username + "s",
                send: user.fullname

            }
            this.props.socket.emit("send-invatition", values)
            const values_user = {
                userId: user.id,
                friendId: element.id,
                send: user.id
            }
            const values_friend = {
                userId: element.id,
                friendId: user.id,
                send: user.id
            }
            const value_upload =
            {
                userId: user.id,
                friendId: element.id,
                toMe: user.username + "s",
                toYou: element.username + "s"
            }
            axios.post("/user/addFriend", [values_user, values_friend]).then(results => {
                console.log(results);
                this.props.socket.emit("upload-message", value_upload)
            }

            )


        }
        if (massage === "Chấp Nhận") {
            const value_upload =
            {
                userId: user.id,
                friendId: element.id,
                toMe: user.username + "s",
                toYou: element.username + "s"
            }
            this.props.socket.emit("upload-message", value_upload)

            const values = {
                userId: user.id,
                friendId: element.id
            }

            axios.post("/user/acceptFriend", values)
                .then(
                    () => {
                        this.props.socket.emit("upload-friend", value_upload)
                    }
                )
        }

    }
    // acceptFriend = (user, friend) => {
    //     const value = {
    //         userId: user,
    //         friendId: friend
    //     }
    //     axios.post("/user/acceptFriend", value)
    // }
    cancleFriend = (element) => {
        const user = JSON.parse(Cookies.get("user"));
        const values = {
            userId: user.id,
            friendId: element.id
        }
        const value_upload =
        {
            userId: user.id,
            friendId: element.id,
            toMe: user.username + "s",
            toYou: element.username + "s"
        }
        axios.post("/user/cancleFriend", values)
            .then(
                () => {
                    console.log("delete thanh cong");
                    this.props.socket.emit("upload-message", value_upload)
                }
            )
    }

    render() {

        const infoUser = () => {
            if (this.props.listSearch.status === "error") {
                return (
                    <div className="modal-body">
                        <p>{this.props.listSearch.message}</p>
                    </div>
                )
            } else {
                const user = JSON.parse(Cookies.get("user"));
                return this.props.listSearch.map(element => {
                    return this.props.checkAddFriend.map(results => {
                        if (element.id === results.friendId) {
                            if (user.fullname !== element.fullname) {
                                if (results.message === "Chấp Nhận") {
                                    return (
                                        <div className="modal-body">
                                            <img alt="" src={element.image} style={{ width: "40px", height: "40px", borderRadius: "25px" }}></img>
                                            <div className="info">
                                                <lable className="name">{element.fullname}</lable>
                                                <div className="role">Bạn bè</div>
                                            </div>
                                            {/* {accept(element)} */}
                                            <button onClick={() => { this.addFriend(element, results.message) }} className="add-friend">{results.message} </button>
                                            <button onClick={() => { this.cancleFriend(element) }} id="btnCancle" value="Hủy" className="add-friend1">Hủy</button>
                                        </div>
                                    )
                                }
                                if (results.message === "Đã Gửi Lời Mời") {
                                    return (
                                        <div className="modal-body">
                                            <img alt="" src={element.image} style={{ width: "40px", height: "40px", borderRadius: "25px" }}></img>
                                            <div className="info">
                                                <lable className="name">{element.fullname}</lable>
                                                <div className="role">Bạn bè</div>
                                            </div>
                                            {/* {accept(element)} */}
                                            <button className="add-friend3">{results.message} </button>
                                            <button onClick={() => { this.cancleFriend(element) }} className="add-friend1">Hủy </button>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="modal-body">
                                            <img alt="" src={element.image} style={{ width: "40px", height: "40px", borderRadius: "25px" }}></img>
                                            <div className="info">
                                                <lable className="name">{element.fullname}</lable>
                                                <div className="role">Bạn bè</div>
                                            </div>
                                            {/* {accept(element)} */}
                                            <button onClick={() => { this.addFriend(element, results.message) }} className="add-friend">{results.message} </button>
                                        </div>
                                    )
                                }
                            }
                        }

                        return null;

                    })


                })
            }
        }
        return (
            <div>
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Mọi Người</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            {infoUser()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default modal;