import React, { Component } from 'react';

class modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSearch: this.props.listSearch,

        }
    }

    render() {
        const infoUser = () => {
            console.log(this.props.listSearch.status);
            if (this.props.listSearch.status === "error") {
                return (
                    <div className="modal-body">
                        <p>{this.props.listSearch.message}</p>
                    </div>
                )

            } else {
                return this.props.listSearch.map(elment => {
                    return (
                        <div className="modal-body">
                            <img alt="" src={elment.image} style={{ width: "40px", height: "40px", borderRadius: "25px" }}></img>
                            <div className="info">
                                <lable className="name">{elment.fullname}</lable>
                                <div className="role">Bạn bè</div>
                            </div>
                            <label className="add-friend">Thêm Bạn Bè</label>
                        </div>
                    )
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