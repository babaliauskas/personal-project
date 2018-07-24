import React from 'react';
import Navigation from '../../Navigation/Navigation';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
// import { GridLoader } from 'react-spinners';
import { addGallery } from '../../../duck/reducer';
import './Photo.css';


 class Photo extends React.Component {
    constructor() {
        super()
        this.state = {
          isUploading: false,
          images: [],
          url: '',
          value: '',   
          selected: null,        
        }
    }

    componentDidMount = () => {
        axios.get('/api/gallery').then(response => {
            this.props.addGallery( response.data )
        })
    }


    uploadFile = (file, signedRequest, url) => {
        var options = {
          headers: {
            'Content-Type': file.type
          }
        };
        axios.put(signedRequest, file, options)
        .then( response => {
          this.setState({isUploading: false, url: url})

            axios.post('/api/gallery', {url} )
            .then( response => {
                this.props.addGallery(response.data)
            })
        })
        .catch( err => {
          console.log(err)
        })
      }
    
      
      getSignedRequest = (file) => {
        const fileName = file.name.replace(/\s/g, '-')
        axios.get('/api/upload', {
          params: {
            'file-name': fileName,
            'file-type': file.type
          }
        }).then( (response) => {
          const { signedRequest, url } = response.data 
          this.setState({isUploading: true})
          this.uploadFile(file, signedRequest, url)
        }).catch( err => {
          console.log(err)
        })
      }
      
      addFile = ([file]) => {
        this.getSignedRequest(file)
      }

    

    render(){


        let img = this.props.gallery.map( (e,i) => {
            return (
                <div key={i.id} className='photo-render'>
                         <img onClick={() => this.handleZoom(i.id)} src= {e.url} alt=""/>
                </div>
            )
        })
 
        return (
            <div className="photo">
      
              <Navigation />

            <div className='photo-display' >
              <Dropzone 
                onDropAccepted={this.addFile}
                className='chose-image'
                accept='image/*'
                multiple={false} >
                <p>Chose File</p>
              </Dropzone>

              <div className='photo-render-display'>
                  {img}
              </div>

            </div>

            
            </div>
          );
        }
      
}

function mapStateToProps(state) {
    const { gallery } = state
    return {
        gallery
    }
}

export default  connect(mapStateToProps, {addGallery})(Photo)