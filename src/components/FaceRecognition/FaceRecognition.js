import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({box,imageUrl}) =>{
    //console.log("Face",box);
    const box_components = box.map((region,i)=>{
        return <div className="bounding-box" key={i} style={{top: region.topRow, right: region.rightCol, bottom: region.bottomRow, left: region.leftCol}}></div>

    })
    return(
        <div className = "center ma">
            <div className="absolute mt2">
                <img id= "image" alt="" src = {imageUrl} width = "500px" height="auto"/>
                {box_components}
            </div>
        </div>
        
    );
}

export default FaceRecognition;