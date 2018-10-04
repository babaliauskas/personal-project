import React from 'react';
import Navigation from '../../Navigation/Navigation';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import { addGallery } from '../../../duck/reducer';

import ImageGallery from './ImageGallery';
// import './Photo.css'


 class Photo extends React.Component {
    constructor() {
        super()
        this.state = {
          url: '',
          value: '',   
          selected: null,        
          showIndex: false,
          showBullets: true,
          infinite: true,
          showThumbnails: true,
          showFullscreenButton: true,
          showGalleryFullscreenButton: true,
          showPlayButton: true,
          showGalleryPlayButton: true,
          showNav: false,
          slideDuration: 1500,
          slideInterval: 3000,
          thumbnailPosition: 'bottom',
          showVideo: {},
        }
    }

    // componentDidMount = () => {
    //     axios.get('/api/gallery').then(response => {
    //         this.props.addGallery( response.data )
    //     })
    // }


    componentDidMount = () => {
        axios.get('/api/gallery').then(response => {
          let images = []
          for ( let i=0; i<response.data.length; i++){
          images.push({
            original: response.data[i].url,
            thumbnail: response.data[i].url
          });
        }
            // this.setState( {images: images })
            this.props.addGallery( images )
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

              let images = []
                for ( let i=0; i<response.data.length; i++){
                images.push({
                  original: response.data[i].url,
                  thumbnail: response.data[i].url
                });
              }
                this.props.addGallery(images)
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



      componentDidUpdate(prevProps, prevState) {
        if (this.state.slideInterval !== prevState.slideInterval ||
            this.state.slideDuration !== prevState.slideDuration) {
          // refresh setInterval
          this._imageGallery.pause();
          this._imageGallery.play();
        }
      }
    
      _onImageClick(event) {
        console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
      }
    
      _onImageLoad(event) {
        console.debug('loaded image', event.target.src);
      }
    
      _onSlide(index) {
        this._resetVideo();
        console.debug('slid to index', index);
      }
    
      _onPause(index) {
        console.debug('paused on index', index);
      }
    
      _onScreenChange(fullScreenElement) {
        console.debug('isFullScreen?', !!fullScreenElement);
      }
    
      _onPlay(index) {
        console.debug('playing from index', index);
      }
    
      _handleInputChange(state, event) {
        this.setState({[state]: event.target.value});
      }
    
      _handleCheckboxChange(state, event) {
        this.setState({[state]: event.target.checked});
      }
    
      _handleThumbnailPositionChange(event) {
        this.setState({thumbnailPosition: event.target.value});
      }
    
      _resetVideo() {
        this.setState({showVideo: {}});
    
        if (this.state.showPlayButton) {
          this.setState({showGalleryPlayButton: true});
        }
    
        if (this.state.showFullscreenButton) {
          this.setState({showGalleryFullscreenButton: true});
        }
      }
    
      _toggleShowVideo(url) {
        this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
        this.setState({
          showVideo: this.state.showVideo
        });
    
        if (this.state.showVideo[url]) {
          if (this.state.showPlayButton) {
            this.setState({showGalleryPlayButton: false});
          }
    
          if (this.state.showFullscreenButton) {
            this.setState({showGalleryFullscreenButton: false});
          }
        }
      }
    
      _renderVideo(item) {
        return (
          <div className='image-gallery-image'>
            {
              this.state.showVideo[item.embedUrl] ?
                <div className='video-wrapper'>
                    <a
                      className='close-video'
                      onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                    >
                    </a>
                    <iframe
                      width='560'
                      height='315'
                      src={item.embedUrl}
                      frameBorder='0'
                      allowFullScreen
                    >
                    </iframe>
                </div>
              :
                <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
                  <div className='play-button'></div>
                  <img src={item.original}/>
                  {
                    item.description &&
                      <span
                        className='image-gallery-description'
                        style={{right: '0', left: 'initial'}}
                      >
                        {item.description}
                      </span>
                  }
                </a>
            }
          </div>
        );
      }

    

    render(){
    
        // console.log(this.state.images)

        // let img = this.props.gallery.map( (e,i) => {
        //     return (
        //         <div key={i.id} className='photo-render'>
        //                  <img onClick={() => this.handleZoom(i.id)} src= {e.url} alt=""/>
        //         </div>
        //     )
        // })

        // let images = this.props.gallery.map( (e,i ) => {
        //   return (
        //     <div>
        //       {e}
        //     </div>
        //   )
        // })


 
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

              
            <div className='gallery-size'>
              <ImageGallery
                items={this.props.gallery}
                lazyLoad={false}
                onClick={this._onImageClick.bind(this)}
                onImageLoad={this._onImageLoad}
                onSlide={this._onSlide.bind(this)}
                onPause={this._onPause.bind(this)}
                onScreenChange={this._onScreenChange.bind(this)}
                onPlay={this._onPlay.bind(this)}
                infinite={this.state.infinite}
                showBullets={this.state.showBullets}
                showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
                showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
                showThumbnails={this.state.showThumbnails}
                showIndex={this.state.showIndex}
                showNav={this.state.showNav}
                thumbnailPosition={this.state.thumbnailPosition}
                slideDuration={parseInt(this.state.slideDuration)}
                slideInterval={parseInt(this.state.slideInterval)}
                additionalClass="app-image-gallery"
              />
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