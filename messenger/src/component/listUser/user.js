import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { showImageAvatar } from './showImage'
import { Image } from 'cloudinary-react';
class user extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }
    }

    getFile = (event) => {
         const displayImgs = document.getElementById("displayImgs");
         displayImgs.style.display = "block"
        // const fileImage = []
        this.setState({
            selectedFile: event.target.files[0]
        });
        showImageAvatar(event, "displayImg", "displayImgs")
    }
    btnCancle = () => {
        const displayImgs = document.getElementById("displayImgs");
        displayImgs.style.display = "none"
        this.setState({
            selectedFile: null
        });
    }
    changeImage =async()=>{
        const user = JSON.parse(Cookies.get("user"));
        const fd = new FormData();
        console.log(fd);
        fd.append('file', this.state.selectedFile)
        fd.append('folder', "messenger")
        fd.append("upload_preset", 'xku7xge7');
        await axios.post('https://api.cloudinary.com/v1_1/cuong/image/upload/', fd)
            .then(
                (res) => {
                    //cloud tra ve`
                    const img = res.data.secure_url;
                    const value ={
                        userId:user.id,
                        img:img,
                        username:user.username
                    }
                    this.props.socket.emit("change-avatar",value)

                }
            )
       
    }
    render() {
        const btnCancle = () => {
            if (this.state.selectedFile) {
                return (
                    <i onClick={() => { this.btnCancle() }} class="fas fa-times-circle cancle"></i>
                )
            }
        }
        return (
            <div>
                <button style={{ opacity: "0.1" }} type="button" class="btn btn-primary changeAvatar" data-toggle="modal" data-target="#exampleModalUser">
                </button>

                <div class="modal fade" id="exampleModalUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Thay Đổi Tài Khoản</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="img">
                                    <div className="background">
                                        <img src="https://inlonggia.com/wp-content/uploads/hinh-nen-hoa-dep.jpg" alt=""></img>
                                    </div >
                                    <div className="avatars" >
                                    <Image cloudName="cuong" publicId={this.props.info.image} />
                                    </div>
                                    <div className="displayImgs" id="displayImgs"></div>
                                    {btnCancle()}
                                    <input type="file" id="displayImg" onChange={(event) => { this.getFile(event) }} />
                                    <label for="displayImg">  <i for="displayImage" class="fas fa-camera photo"></i></label>

                                </div>
                                <div className="fullname">{this.props.info.fullname}</div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={() => { this.btnCancle() }} type="button" class="btn btn-secondary" data-dismiss="modal">Bỏ</button>
                                <button onClick={() =>{ this.changeImage()}}   type="button" class="btn btn-primary">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="avatar" style={{ width: "35px", height: "35px", borderRadius: "30px", marginLeft: "-10px", marginRight: "5px" }}>
                    <Image cloudName="cuong" publicId={this.props.info.image} />
                </div>
                
                {/* <img className="avatar" style={{ width: "35px", height: "35px", borderRadius: "30px", marginLeft: "-10px", marginRight: "5px" }} alt="" src={this.props.info.image} ></img> */}
            </div>
        );
    }
}

export default user;