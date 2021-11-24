import React from 'react';
import './Rank.css';


const Rank = ({user}) =>{
    const statement = user.name+" your current rank is ...";
    const rank = user.entries;
    return(
        <div>
            <div className="white f3">
                {statement}
            </div>
            <div className="white f1">
                {rank}
            </div>
        </div>
        
    );
}

export default Rank;