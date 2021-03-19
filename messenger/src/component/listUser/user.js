import React, { Component } from 'react';

class user extends Component {
    render() {
        return (
           <div>
               <img style={{width:"35px",height:"35px",borderRadius:"30px",marginLeft:"-10px",marginRight:"5px"}} alt="" src={this.props.user.image} ></img>
           </div>
        );
    }
}

export default user;