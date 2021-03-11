import React, { Component } from 'react';
import axios  from 'axios'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:''
    }
  }
  
  componentDidMount(){
    axios.get("/test").then(results =>{
      console.log(results.data);
      this.setState({
        data:results.data.a
      });
    })
  }
  render() {
    const a = () =>{
      if(this.state.data !== ''){
        return(
          <div>
              {this.state.data}
          </div>
        )
      }
    }
    return (
      <div>
        Nguyễn Tiến Cường
        {a()}
      </div>
    );
  }
}
export default App;
