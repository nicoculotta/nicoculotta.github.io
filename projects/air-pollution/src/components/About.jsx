import React from 'react';
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="about">
            <h2>About</h2>
            <div className="text-about">
                <p>This personal project was created using the OpenWeather API's. The goal is to get the current information about air pollution around the world.</p>
                <p>To create the app I used: <strong>React JS and custom CSS</strong> </p>
                <p>Hope you like it and thanks for test it.</p>
            </div>
            <Link to="/">Go back</Link>
        </div>
    )
}

export default About;