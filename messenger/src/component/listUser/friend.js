import Cookies from 'js-cookie';
import React, { Component } from 'react';

class friend extends Component {

    submitFriend = (element) => {
        const user = JSON.parse(Cookies.get("user"))

        this.props.showMessenger(true, element);
        this.props.socket.emit("join-rooms", {user:user.username,friend:element.username})
    }

    render() {
        const listFriend = () => {
            if (this.props.listFriend.length > 0) {
                return this.props.listFriend.map(element => {
                    return (
                        <li
                        // className="active"
                        >
                            <div onClick={() => {
                                this.submitFriend(element)
                                //this.props.showMessenger(true, element);
                            }}
                                className="d-flex bd-highlight">
                                <div className="img_cont">
                                    <img alt="" src={element.image} className="rounded-circle user_img" />
                                    <span className="online_icon" />
                                </div>
                                <div className="user_info1">
                                    <span>{element.fullname}</span>
                                    <p> online</p>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        }
        return (
            <div className="card-body contacts_body">
                <ui className="contacts">
                    {listFriend()}

                </ui>
            </div>
        );
    }
}

export default friend;