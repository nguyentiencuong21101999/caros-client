import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import io from 'socket.io-client'
var socket =
     io("https://caros-server.herokuapp.com/");
    //io("http://localhost:1234/");
class room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        const user = JSON.parse(Cookies.get("user"));
        socket.emit("create-rooms", user.username)
        socket.on("request-data-rooms", data => {
            console.log(data);
            this.setState({
                rooms: data
            });
        })
        // socket.on('connect', () => {
        //     socket.on("userOnline", (data) => {
        //         this.setState({ userOnline: data });
        //     })

        //     socket.on('send-rooms', (rooms) => {
        //         this.setState({
        //             rooms_caro: rooms,
        //         })
        //     })


        //     socket.on("gameData", (gameData) => {
        //         this.setState({
        //             data: gameData
        //         });
        //     })


        //     socket.on("updateRoom", (data) => {
        //         this.setState({
        //             rooms: data
        //         })
        //     })
        // })
        // socket.on("disconnect",() =>{
        //     alert("Mat ket noi")
        // })
    }

    render() {
        if (!Cookies.get("user")) {
            return <Redirect to="/login" />
        }
        let rooms = () => {
            const rooms = this.state.rooms;
            if (rooms.length > 0) {
                return rooms.map(element => {
                    return (
                        <div className="rooms">

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
        );
    }
}

export default room;