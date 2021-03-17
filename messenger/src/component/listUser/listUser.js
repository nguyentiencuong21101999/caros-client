import React, { Component } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios'
import { Redirect } from 'react-router';
import Modal from './modal'
class listUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSearch: "",
            listUser: [],
            listSearch: [],
            massage_errors:""

        }
    }
    componentDidMount() {
        const values = {
            username: "tiencuong",
            password: "cuong"
        }
        axios.get("/user/listUser")
            .then(
                results => {
                    this.setState({
                        listUser: results.data
                    });
                })
    }

    postTxtSearch = () => {
        const values = {
            txtSearch: this.state.txtSearch
        }
        axios.post("/user/getUserByFullname", values)
            .then(
                results => {
                 
                    this.setState({
                        listSearch: results.data
                    });
                }
            )
    }

    render() {
        if (!Cookies.get("user")) {
            return <Redirect to="/" />
        }

        const btnSearch = () => {
            if (this.state.txtSearch !== "") {
                return (
                    <button onClick={() => { this.postTxtSearch() }} type="button" className="input-group-text search_btn " data-toggle="modal" data-target="#exampleModal">
                        <i className="fas fa-search" />
                    </button>
                )
            }
        }
        return (
            <div>
                <div className="container-fluid h-100">
                    <div className="row justify-content-center h-100">
                        <div className="col-md-4 col-xl-3 chat"><div className="card mb-sm-3 mb-md-0 contacts_card">
                            <div className="card-header">
                                {/* Modal */}
                                <Modal listSearch={this.state.listSearch} 
                                />
                                {/* end Modal */}
                                <div className="input-group">
                                    <input onChange={(event) => { this.setState({ txtSearch: event.target.value }); }} type="text" placeholder="Search..." name className="form-control search " />
                                    <div className="input-group-prepend">
                                        {btnSearch()}
                                        {/* //<span className="input-group-text search_btn"></span> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body contacts_body">
                                <ui className="contacts">
                                    <li className="active">
                                        <div className="d-flex bd-highlight">
                                            <div className="img_cont">
                                                <img alt="" src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" />
                                                <span className="online_icon" />
                                            </div>
                                            <div className="user_info">
                                                <span>Khalid</span>
                                                <p>Kalid is online</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex bd-highlight">
                                            <div className="img_cont">
                                                <img alt="" src="https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg" className="rounded-circle user_img" />
                                                <span className="online_icon offline" />
                                            </div>
                                            <div className="user_info">
                                                <span>Rashid Samim</span>
                                                <p>Rashid left 50 mins ago</p>
                                            </div>
                                        </div>
                                    </li>
                                </ui>
                            </div>
                        </div>
                        </div></div></div>
            </div>
        )
    }
}

export default listUser;