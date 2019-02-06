import React from 'react';
import SearchBar from './SearchBar'

function Hero(props) {
    return (
        <div className="hero" >
            <div className="bg-image" ></div>
            <div className="centered-div">
                <h1 className="title">NaperSearch</h1>
                <h4 className="tag-line">Find businesses in Naperville, IL</h4>
                <SearchBar yelpSearch={props.yelpSearch}/>
            </div>
        </div>
    );
}

export default Hero;