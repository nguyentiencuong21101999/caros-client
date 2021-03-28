import React, { Component } from 'react';
import Cookies from 'js-cookie'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class caro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game_info: {}
        }
    }

    componentDidMount() {
    }
    render() {

        if (!Cookies.get("user")) {
            return <Redirect to="/" />
        }
        let user = JSON.parse(Cookies.get("user"));
        let trim = user.fullname.trim().split((/[\s,]+/));
        const username = trim[trim.length - 2] + " " + trim[trim.length - 1]
        return (
            <div className="messenger" >
                <div className="container-fluid h-100">
                    <div className="row justify-content-center h-100">
                        <div className="col-md-8 col-xl-8 chat">
                            <div className="card">
                                <div className="game_info">
                                    <label className="game_info_image">
                                        <span>
                                            <img src={user.image} alt=""></img>
                                        </span>
                                        <span className='names'>
                                            {username}
                                            <br />
                                            <span className="online_game">
                                                Online
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <div className="game_name">
                                    Cờ Caro
                                </div>
                                <div className="game_image">
                                    <img src="../../../style/game/image/lo-go-co-caro.png" alt=""></img>
                                </div>
                                <div className="game_text" >
                                    Chơi Với Máy
                                </div>
                                <div className="game_text" >
                                    Chơi Với Bạn
                                </div>
                                <div className="game_text" >
                                    <Link to="/messenger">
                                        Thoát
                                    </Link>

                                </div>

                            </div>
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default caro;