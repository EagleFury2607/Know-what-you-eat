import React, { Component } from 'react';
import { Button,View,Text,StyleSheet } from 'react-native';
// import styles from './css/ImageLoaderStyle.js';
import Axios from 'axios';

const styles = StyleSheet.create({
  baseText:{
    fontSize:20,
    fontFamily:'Arial'
  },
  parentView:{
    flex:3,
    flexDirection:'column',
    backgroundColor:'red'
  },
  imageView:{
    flex:1,
    flexDirection:'row',
    padding:2,
    backgroundColor:'yellow'
  },  
  imagePicker1:{
      flex:1,
      justifyContent: 'space-around',
      alignItems:'center'
  },
  imagePicker2:{
      flex:1,
      justifyContent: 'space-around',
      alignItems:'center'
  },
  submitButton:{
    flex:1
  }
});

class ImageLoader extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedFrontImageFile: null,
      selectedSideImageFile:null,
      frontImagePreview: null,
      sideImagePreview: null,
      frontText:'This is sample',
      sideText: 'Me to i am a sample too'
    }
    this.submitFunction = this.submitFunction.bind(this);
  }

  fileChangedHandler = event => {
    this.setState({
      selectedFrontImageFile: event.target.files[0]
    })
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        frontImagePreview: reader.result
      });
    }
    reader.readAsDataURL(event.target.files[0])
  }
  fileSideImageHandler = event =>{
    this.setState({
      selectedSideImageFile: event.target.files[0]
    })
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        sideImagePreview: reader.result
      });
    }
    reader.readAsDataURL(event.target.files[0])
  }

    render() {
      let $frontPreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
      let $sidePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
      
      if (this.state.frontImagePreview) {
        $frontPreview = (<div className="image-container" ><img src={this.state.frontImagePreview} alt="icon" width="200" /> </div>);
      }
      if(this.state.sideImagePreview){
        $sidePreview = (<div className="image-container" ><img src={this.state.sideImagePreview} alt="icon" width="200" /> </div>)
      }

      return (
        <div>
            <View style={styles.parentView}>
            <h1 style={{textAlign:"center"}}>Upload Image</h1>
              <View style={styles.imageView}>
                <View style={styles.imagePicker1}>
              <input type="file" name="avatar" onChange={this.fileChangedHandler} />
              { $frontPreview }
              <Text style={styles.baseText}>{this.state.frontText} </Text>
                </View>
                <View style={styles.imagePicker2}>
                  <input type="file" name="avatar" onChange={this.fileSideImageHandler} />
                  { $sidePreview }
                  <Text style={styles.baseText}>{this.state.sideText}</Text>
                </View>
              </View >
              <View style={styles.submitButton}>
                <Button title="Upload" onPress={this.submitFunction} />
              </View>  
            </View>
            
        </div>
    );
    }
    submitFunction = () => {
      console.log("Submit function invoked !");
      if(this.state.selectedFrontImageFile != null)
        console.log('image data: ',this.state.selectedFrontImageFile);
      else{ 
        alert('Please select images');
        return;
      }
        
      //uploading using json 
      console.log("Data to be sent",this.state.selectedFrontImageFile)
      var fd = new FormData();
      fd.append('topImage', this.state.selectedFrontImageFile);
      fd.append('sideImage',this.state.selectedSideImageFile);
      
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        },
        option:{
          'Access-Control-Allow-Origin':'*'
        }
      };
      Axios.post("/uploadImage",fd,config)
          .then((response) => {
              console.log('Response',response);
              if(response.status === 200){
                console.log("The file is successfully uploaded");
                // This code will parse the result and take the list
                // data = JSON.parse(response.data);
                // this.state.frontText = data['frontList']
                // this.state.sideText = data['sideList']
              }
          }).catch((error) => {
            console.log("Error uploading file");
      });
    }
}

export default ImageLoader;