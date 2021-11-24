import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Particles from "react-tsparticles";
import React,{Component} from 'react';


const particleOptions = {
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
}

const initialState = {  input:'',
                        imageUrl:'',
                        box:[],
                        route:'signin',
                        isSignedIn:'false',
                        user:{}
                      }

class App extends Component {

  constructor(){
    super()
    this.state = initialState
  }


  calculateFaceLocation = (data) => {
    //console.log(data.outputs[0].data.regions);

    const image = document.getElementById("image");
    const height = Number(image.height);
    const width = Number(image.width);

    const box_boundaries = data.outputs[0].data.regions.map(region=>{
      const clari = region.region_info.bounding_box;
      return {
        leftCol: clari.left_col * width,
        topRow: clari.top_row * height,
        rightCol: width - (clari.right_col * width),
        bottomRow: height - (clari.bottom_row * height)
      }
    })

    //console.log(box_boundaries);

    return box_boundaries;

  }

  displayFaceBox = (box) => {
    //console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onSubmitChange = (event) =>{
    this.setState({imageUrl:this.state.input});
    

    fetch("https://powerful-dusk-13127.herokuapp.com/imageapi",
      {
          headers: {
          'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
              input:this.state.input
          })
      })
      .then(res=>res.json())
      .then(response => {
        if(response){
          this.displayFaceBox(this.calculateFaceLocation(response))
          fetch("https://powerful-dusk-13127.herokuapp.com/image",
                {
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        id:this.state.user.id
                    })
                })
                .then(res=>res.json())
                .then(user=>{
                        this.setState({user:user});

                })
                .catch(err=>console.log);
        }
      })
      .catch(err => console.log("Error in Clarify API",err))
  }

  onRouteChange = (route) =>{
    if(route === "home"){
      this.setState({isSignedIn:"true"});
    }else{
      this.setState(initialState);
    }
    this.setState({route:route});
  }

  loadUser = (user) =>{
    this.setState({user:user});
  }
  render(){
    //console.log(this.state.route,this.state.isSignedIn);
    //console.log(this.state.user);
    return (
      <div className="App">
        <Particles
        className = "particles"
        id="tsparticles"
        options={particleOptions}
      />
        <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {this.state.isSignedIn}/>
        {
          this.state.route === "home"
          ?<div>
            <Logo/>
            <Rank user = {this.state.user}/>
            <ImageLinkForm onInputChange = {this.onInputChange} onSubmitChange={this.onSubmitChange}/>
            <FaceRecognition box = {this.state.box} imageUrl={this.state.imageUrl} />
          </div>:(
            this.state.route === "signin"
            ?<Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>:
             <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>

          )
          
        }
        </div>
    );
  }
}

export default App;
