import React, { Component } from 'react';
import Cookies from 'js-cookie';
class modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSearch: this.props.listSearch,

        }
    }
    addFriend = (friendId) => {
        console.log(friendId);
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
                    if (user.fullname !== element.fullname) {
                        return (
                            <div className="modal-body">
                                <img alt="" src={element.image} style={{ width: "40px", height: "40px", borderRadius: "25px" }}></img>
                                <div className="info">
                                    <lable className="name">{element.fullname}</lable>
                                    <div className="role">Bạn bè</div>
                                </div>
                                <label onClick={() => { this.addFriend(element._id) }} className="add-friend">Thêm Bạn Bè</label>
                            </div>
                        )
                    }
                    return null;

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