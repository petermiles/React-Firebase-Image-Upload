import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

import {fire as firebase} from "./fire"

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      file: '',
      imagePreviewUrl : '',
      downloadURL : ''
    }

    this.uploadImage = this.uploadImage.bind(this)
    this.processImageUpload = this.processImageUpload.bind(this)

  }


   processImageUpload(event) {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }
    uploadImage(event) {
        event.preventDefault();
        let file = this.state.file
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child('profilePictures/' + file.name).put(file);
        uploadTask.on('state_changed', (snapshot) => {}, function(error) {}, function() {
            this.setState({downloadURL : uploadTask.snapshot.downloadURL})
        })
    }

  render() {

    let imagePreview = null
    let downloadURL = null

    if (this.state.imagePreviewUrl) {
      imagePreview = (<img src={this.state.imagePreviewUrl} className = "image-preview" />)
    }

    if (this.state.downloadURL) {
      downloadURL = (<h1> {this.state.downloadURL} </h1>)
    }



    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to A Brownbag on Firebase</h1>
        </header>
        <form onSubmit={(event) => {this.uploadImage(event)}}>
        {imagePreview}
        {downloadURL}
        <input type="file" onChange={(event) => {this.processImageUpload(event)}} alt="" />
        <button type="submit"> Upload Image </button>
        </form> 
      </div>
    );
  }
}

export default App;
