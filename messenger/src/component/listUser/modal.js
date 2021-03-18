import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import friend from './friend';
class modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSearch: this.props.listSearch,
            accept: 0
        }
    }
    addFriend = (element, massage) => {
        const user = JSON.parse(Cookies.get("user"))
        console.log(massage);
        if (massage === "Gửi lời mời") {
            console.log(element);

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


            axios.post("/user/addFriend", [values_user, values_friend]).then(          
                    alert("Gửi thành công lời mời kết bạn ...")
            )
        }
        if (massage === "Chấp Nhận") {
            console.log(element);
            const values = {
                userId: user.id,
                friendId: element.id
            }
            axios.post("/user/acceptFriend",values)
            .then(
                alert("Chấp Nhận Thành Công")
            )

        }


    }
    acceptFriend = (user, friend) => {
        const value = {
            userId: user,
            friendId: friend
        }
        axios.post("/user/acceptFriend", value)
        console.log("element", user);
        console.log("element", friend);

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
                        console.log("search", element);
                        console.log("check", results);
                        console.log(element.id === results.friendId);
                        if (element.id === results.friendId) {
                            if (user.fullname !== element.fullname) {
                                if (results.message === "Đã Gửi Lời Mời" ) {
                                    return (
                                        <div className="modal-body">
                                            <img alt="" src={element.image} style={{ width: "40px", height: "40px", borderRadius: "25px" }}></img>
                                            <div className="info">
                                                <lable className="name">{element.fullname}</lable>
                                                <div className="role">Bạn bè</div>
                                            </div>
                                            {/* {accept(element)} */}
                                            <button className="add-friend">{results.message} </button>
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