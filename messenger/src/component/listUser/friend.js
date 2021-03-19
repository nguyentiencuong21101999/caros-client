import React, { Component } from 'react';

class friend extends Component {

    render() {
        const listFriend = () => {
            if (this.props.listFriend.length > 0) {
                return this.props.listFriend.map(element => {
                    return (
                        <li
                        // className="active"
                        >
                            <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                    <img alt="" src={element.image} className="rounded-circle user_img" />
                                    <span className="online_icon" />
                                </div>
                                <div className="user_info">
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