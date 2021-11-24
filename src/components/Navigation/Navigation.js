import React from 'react';
import './Navigation.css';


const Navigation = ({onRouteChange,isSignedIn}) =>{
    //console.log(isSignedIn);
    if(isSignedIn === "true"){
        return(
            <nav className= 'navigation-bar'>
                <p className= 'f3 link dim black underline pa3 pointer' onClick = {() => onRouteChange("signin")}>Sign Out</p>
            </nav>
        );
    }else{
        return(
            <nav className= 'navigation-bar'>
                <p className= 'f3 link dim black underline pa3 pointer' onClick = {() => onRouteChange("signin")}>Sign In</p>
                <p className= 'f3 link dim black underline pa3 pointer' onClick = {() => onRouteChange("register")}>Register</p>
            </nav>
        );
    }
}

export default Navigation;