import React, { Component } from 'react';

class dataListUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUser: this.props.listUser
        }
    }

    componentDidMount() {
        console.log(this.props)
    }
    render() {
        let options = () => {
            return this.state.listUser.map(element => {
                console.log(element);
                return (
                    <option value={element.fullname}>
                    </option>
                )
            })

        }
        return (
            <datalist id="search">
                {options()}
            </datalist>
        );
    }
}

export default dataListUser;