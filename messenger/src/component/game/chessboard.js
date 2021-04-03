import Cookies from 'js-cookie';
import React, { Component } from 'react';

class chessboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            ready: []
        }
    }

    componentDidMount() {
        this.createTable()
        this.props.socket.on("request-set-value-chess", data => {
            this.setState({ data: data });
        })
        this.props.socket.on("set-value-chess", data => {
            if (data === false) {
                this.createTable()
                this.setState({
                    ready: []
                });
            }

        })
        this.props.socket.on("send-user-win", data => {
            alert(data.message)
            this.createTable()
        })
        this.props.socket.on("request-ready", data => {
            const ready = this.state.ready;
            if (ready.indexOf(data) < 0) {
                ready.push(data)
                this.setState({
                    ready: ready
                });
            }
        })
    }
    createTable = () => {
        let newData = [];
        for (let row = 0; row < 15; row++) {
            let newRow = [];
            for (let col = 0; col < 20; col++) {
                newRow.push({
                    row: row,
                    col: col,
                    value: ""
                })

            }
            newData.push(newRow)
        }
        this.setState({
            data: newData
        })
    }
    setValue = (rowIndex, colIndex, value) => {
        // if (this.props.rooms[this.props.currentRoom].player.length > 1) {
        this.props.socket.emit("set-value-chess", {
            row: rowIndex,
            col: colIndex,
            roomIndex: this.props.currentRoom
        })
        // }
    }
    cell = (rowData, rowIndex) => {

        return rowData.map((cell, colIndex) => {
            return (
                <div onClick={() => { this.setValue(rowIndex, colIndex) }} className="cols">
                    <div className="value">{cell.value}</div>
                </div>
            )
        })
    }
    rowData = () => {
        return this.state.data.map((rowData, rowIndex) => {
            return (
                <div className="rows">
                    { this.cell(rowData, rowIndex)}
                </div>
            )
        })

    }
    ready = () => {
        let user = JSON.parse(Cookies.get("user"));
        const values = {
            roomIndex: this.props.currentRoom,
            name: user.username

        }
        this.props.socket.emit("ready", values)
    }
    render() {
        let user = JSON.parse(Cookies.get("user"));
        let info = this.props.rooms[this.props.currentRoom].player;
        let name_caro = (name) => {
            let trim = name.trim().split((/[\s,]+/));
            if (trim.length > 1) {
                const username = trim[trim.length - 2] + " " + trim[trim.length - 1]
                return (
                    username
                )
            } else {
                const username = trim[trim.length - 1];
                return (username)
            }
        }
        let ready = () => {
            const ready = this.state.ready;
            if (ready.length < 1) {
                return (
                    <div onClick={() => { this.ready() }} className="ready"> Sẵn Sàng</div>
                )
            } else {
                if (ready.length === 1) {
                    if (ready.indexOf(user.username) >= 0) {
                        return (
                            <div onClick={() => { this.unReady() }} className="ready"><i class="fas fa-check-double"></i></div>
                        )
                    } else {
                        return (
                            <div onClick={() => { this.ready() }} className="ready"> Sẵn Sàng</div>
                        )
                    }

                } else {
                    if (ready.indexOf(user.username) >= 0) {
                        return (
                            <div onClick={() => { this.unReady() }} className="ready"><i class="fas fa-check-double"></i></div>
                        )
                    } else {
                        return (
                            <div onClick={() => { this.unReady() }} className="ready-user-2"><i class="fas fa-check-double"></i></div>
                        )
                    }
                }
            }

        }
        let ready_user_2 = () => {
            const ready = this.state.ready;
            if (ready.length === 1) {
                if (ready.indexOf(user.username) < 0) {
                    return (
                        <div onClick={() => { this.unReady() }} className="ready-user-2"><i class="fas fa-check-double"></i></div>
                    )
                }
            }
        }
        let info_caro = () => {
            if (this.state.data.length > 0) {
                if (info.length === 1) {
                    if (info[0].name === user.username) {
                        return (
                            <div>
                                <div className="user">
                                    <div className=" user1 ">
                                        <span>
                                            <img src={info[0].info.image} alt="" />
                                        </span>
                                        <span className="name-user1">
                                            {name_caro(info[0].info.fullname)}
                                        </span>
                                        <div className="type">
                                            {info[0].type}
                                        </div>
                                    </div>
                                    <div className=" user2">
                                        Mời Bạn
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <div className="user">
                                    <div className=" user1 ">
                                        <img src={info[0].info.image} alt="" />

                                        <span className="name-user1">
                                            {name_caro(info[0].info.fullname)}
                                        </span>
                                        <div className="type">
                                            {this.props.type}
                                        </div>
                                    </div>
                                    <div className=" user2">
                                        Mời Bạn
                                    </div>
                                </div>
                            </div>
                        )
                    }
                } else {
                    if (info.length === 2) {
                        if (info[0].name === user.username) {
                            return (
                                <div className="user">
                                    <div className="user1">
                                        <img src={info[0].info.image} alt="" />
                                        {ready()}
                                        <span className="name-user1">
                                            {name_caro(info[0].info.fullname)}
                                        </span>
                                        <div className="type">

                                            {info[0].type}
                                        </div>
                                    </div>
                                    <div className="user2">
                                        {ready_user_2}
                                        <div className="type-user-2">
                                            {info[1].type}
                                        </div>

                                        <span className="name-user2">
                                            {name_caro(info[1].info.fullname)}
                                        </span>
                                        <span>
                                            <img src={info[1].info.image} alt="" />
                                        </span>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div>
                                    <div className="user">
                                        <div className=" user1 ">
                                            <img src={info[1].info.image} alt="" />
                                            {ready()}
                                            {/* <div onClick={() => { this.ready() }} className="ready"> Sẵn Sàng</div> */}
                                            <span className="name-user1">
                                                {name_caro(info[1].info.fullname)}
                                            </span>
                                            <div className="type">
                                                {info[1].type}
                                            </div>
                                        </div>
                                        <div className=" user2 ">
                                            {ready_user_2}
                                            <div className="type-user-2">
                                                {info[0].type}
                                            </div>
                                            <span className="name-user2">
                                                {name_caro(info[0].info.fullname)}
                                            </span>
                                            <span>
                                                <img src={info[0].info.image} alt="" />
                                            </span>


                                        </div>
                                    </div>
                                </div>
                            )

                        }
                    }
                }

            }
        }

        return (
            <div>
                {info_caro()}
                {this.rowData()}

            </div>
        )
    }
}

export default chessboard;