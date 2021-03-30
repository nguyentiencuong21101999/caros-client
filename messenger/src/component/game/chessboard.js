import Cookies from 'js-cookie';
import React, { Component } from 'react';

class chessboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.createTable()
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
        let newData = this.state.data;
        newData[rowIndex][colIndex].value = value;
        this.setState({
            data: newData
        })
    }
    cell = (rowData, rowIndex) => {

        return rowData.map((cell, colIndex) => {
            return (
                <div onClick={() => { this.setValue(rowIndex, colIndex) }} className="cols">
                    <div className="value">{cell.value}x</div>
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

    render() {
        let user = JSON.parse(Cookies.get("user"));
        let trim = user.fullname.trim().split((/[\s,]+/));
        const username = trim[trim.length - 2] + " " + trim[trim.length - 1]
        if (this.state.data.length > 0) {
            return (
                <div>

                    <div className="user">
                        <div className=" user1 ">
                            <img src={user.image} alt="" />
                            bac
                        </div>
                        <div className=" user2">
                            asdads
                        </div>
                    </div>
                    {this.rowData()}

                </div>
            );
        }
        return null;
    }
}

export default chessboard;