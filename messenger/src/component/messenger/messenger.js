import React, { Component } from 'react';
import io from 'socket.io-client'
import axios from 'axios';
var socket = io("https://messenger-sever.herokuapp.com/");

class messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            data2:{}
        }
    }

    componentDidMount() {
        axios.get("/test").then(
            (data) => {
                this.setState({
                    data: data.data
                });
            }
        )
        axios.get("/test2").then(
            (data) => {
                this.setState({
                    data2: data.data
                });
            }
        )
        socket.on('connect', () => {
            alert(socket.id)
            socket.emit("test", { a: "a" })
        }
        )

    }
    render() {
        if (this.state.data) {
            return (
                <div>
                    Ten: 
                   {this.state.data.a}
                </div>
            );
        }
        return null;
    }
}

export default messenger;