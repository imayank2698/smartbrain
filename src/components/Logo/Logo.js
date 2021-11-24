import React from 'react';
import './Logo.css';
import brain from './Logo.png';
import Tilty from 'react-tilty';


const Navigation = () =>{
    return(
        <div className = "ma4 mt0">
            <Tilty className="Tilt br2 shadow-5" style={{ transformStyle: 'preserve-3d',width:150,height:150 }}>
                <div className = "pa3 center" style={{ transform: 'translateZ(30px)' }}>
                    <img style={{paddingTop:15}} src={brain} alt="Logo"/>
                </div>
            </Tilty>   
        </div>
    );
}

export default Navigation;