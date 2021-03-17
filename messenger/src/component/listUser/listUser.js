import React, { Component } from 'react';

class listUser extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            listUser:[]
        
        }
    }
    componentDidMount(){
        
    }
    render() {
        return (
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-4 col-xl-3 chat"><div className="card mb-sm-3 mb-md-0 contacts_card">
                        <div className="card-header">
                            <div className="input-group">
                                <input type="text"  list="search" placeholder="Search..." name  className="form-control search " />
                                <datalist id="search">
                                    <option value="Chrome">
                                    </option><option value="Firefox">
                                    </option><option value="Internet Explorer">
                                    </option><option value="Opera">
                                    </option><option value="Safari">
                                    </option><option value="Microsoft Edge">
                                    </option></datalist>
                                <div className="input-group-prepend">
                                    <span className="input-group-text search_btn"><i className="fas fa-search" /></span>
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



        );
    }
}

export default listUser;