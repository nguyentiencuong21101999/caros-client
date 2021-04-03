import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import io from 'socket.io-client'
import Chessboard from './chessboard'
var socket =
    // io("https://caros-server.herokuapp.com/");
    io("http://localhost:1234/");
class room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            currentRoom: -1,
            type: "",
            chessboard: false,
        }
    }

    componentDidMount() {
        let user = JSON.parse(Cookies.get("user"));
        socket.emit("create-rooms", user.username)
        socket.on("request-data-rooms", data => {
            this.setState({
                rooms: data
            });
        })
        socket.on("request-join-rooms", data => {
            if (data.result) {
                this.setState({
                    rooms: data.rooms,
                    chessboard: true,
                    currentRoom: data.currentRoom,
                    type: data.type
                });
            } else {
                alert("Phòng đầy ....")
            }
        })
        socket.on("update-rooms", data => {
            this.setState({
                rooms: data 
            });
        })
       
    }
    joinRooms = (roomIndex) => {
        let user = JSON.parse(Cookies.get("user"));
        socket.emit('join-rooms', {
            roomIndex: roomIndex,
            name: user.username,
            info: user
        });

    }
    leaveRooms = () => {
        let user = JSON.parse(Cookies.get("user"));
        this.setState({
            chessboard: false,
            rooms: [],
            currentRoom: -1,
            type: ""
        });
        const values = {
            roomIndex: this.state.currentRoom,
            name:user.username,
            currentRoom:this.state.currentRoom
        }
        socket.emit("leave-rooms", values)
    }

    render() {
        if (!Cookies.get("user")) {
            return <Redirect to="/login" />
        }
        let numberPlayer = (roomIndex) => {
            const rooms = this.state.rooms;
            if (rooms[roomIndex].player.length === 1) {
                return (
                    <span className="number-player"><i class="fas fa-user"></i></span>
                )
            } else {
                if (rooms[roomIndex].player.length === 2) {
                    return (
                        <div>
                            <span className="number-player"><i class="fas fa-user"></i></span>
                            <span className="number-player-2"><i class="fas fa-user"></i></span>
                        </div>
                    )

                }
            }
        }
        let rooms = () => {
            const rooms = this.state.rooms;
            if (rooms.length > 0) {
                return rooms.map(element => {
                    return (
                        <div onClick={() => { this.joinRooms(element.roomName) }} className="rooms">
                            {numberPlayer(element.roomName)}
                            <span className="room-name">
                                {element.roomName}
                            </span>
                            <div className='img-chess'>
                                <img src="../../../style/game/image/Removal-926.png" alt=""></img>
                                {/* <img alt='' src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDQ5MC42NDEgNDkwLjY0MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDkwLjY0MSA0OTAuNjQxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTQ4Ny41NDcsMTc5LjA3NmwtNzQuNjY3LTc0LjY2N2MtMi4wMjctMi4wMjctNC42OTMtMy4wOTMtNy41NzMtMy4wOTNIODQuMDI3Yy0yLjg4LDAtNS42NTMsMS4xNzMtNy41NzMsMy4yDQoJCQlMMy4wNjcsMTc5LjE4MmMtNC4xNiw0LjE2LTQuMDUzLDEwLjk4NywwLjEwNywxNS4wNGMyLjAyNywxLjkyLDQuNjkzLDMuMDkzLDcuNDY3LDMuMDkzaDQyLjY2N3YxODEuMDEzDQoJCQljMCw1LjMzMywzLjg0LDEwLjEzMyw5LjA2NywxMC44OGM2LjYxMywwLjk2LDEyLjI2Ny00LjE2LDEyLjI2Ny0xMC41NlYxOTcuMzE2aDQyLjY2N3Y5NS42OGMwLDUuMzMzLDMuODQsMTAuMTMzLDkuMDY3LDEwLjg4DQoJCQljNi42MTMsMC45NiwxMi4yNjctNC4xNiwxMi4yNjctMTAuNTZ2LTk2aDIxMy4zMzN2OTUuNjhjMCw1LjMzMywzLjg0LDEwLjEzMyw5LjA2NywxMC44OGM2LjYxMywwLjk2LDEyLjI2Ny00LjE2LDEyLjI2Ny0xMC41Ng0KCQkJdi05Nmg0Mi42Njd2MTgxLjAxM2MwLDUuMzMzLDMuODQsMTAuMTMzLDkuMDY3LDEwLjg4YzYuNjEzLDAuOTYsMTIuMjY3LTQuMTYsMTIuMjY3LTEwLjU2VjE5Ny4zMTZoNDIuNjY3DQoJCQljNS44NjcsMCwxMC42NjctNC44LDEwLjY2Ny0xMC42NjdDNDkwLjY0MSwxODMuNzY5LDQ4OS40NjcsMTgxLjEwMiw0ODcuNTQ3LDE3OS4wNzZ6IE0zNi4xMzQsMTc1Ljk4Mmw1Mi4zNzMtNTMuMzMzaDMxMi40MjcNCgkJCWw1My4zMzMsNTMuMzMzSDM2LjEzNHoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" /> */}
                            </div>

                        </div>
                    )

                })
            }
        }
        let chessboard = () => {
            if (this.state.chessboard) {
                return (
                    <div>
                        <div onClick={() => { this.leaveRooms() }} className="backs">
                            <i class="fas fa-chevron-left"></i>
                        </div>
                        <div id="wrapper" className='wrapper'>
                            <Chessboard
                                socket={socket}
                                rooms ={this.state.rooms}
                                type={this.state.type}
                                currentRoom ={this.state.currentRoom}
                            />
                        </div>
                    </div>

                )
            }
        }
        let all = () => {
            if (!this.state.chessboard) {
                return (
                    <div className="messenger" >
                        <div className="container-fluid h-100">
                            <div className="row justify-content-center h-100">
                                <div className="col-md-8 col-xl-8 chat">
                                    <div className="card">
                                        <div className="game_image">
                                            <img src="../../../style/game/image/lo-go-co-caro.png" alt=""></img>
                                        </div>
                                        <div className="chess">
                                            <div className="border-chess"></div>
                                            {rooms()}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                )
            }
        }
        return (
            <div>
                {chessboard()}
                {all()}
            </div>
        );
    }
}

export default room;