import React, { useState } from 'react';
import Card from './Card';

const Main = () => {
    const apiKey = '1efc6a6568304f64394988825a8ceb35'
    const root = document.documentElement;

    const [inputSearch, setInputSearch] = useState('')
    const [locations, setLocations] = useState([])
    const [locationSelected, setLocationSelected] = useState(null)
    const [locationsTitle, setLocationsTitle] = useState(false)
    const [error, setError] = useState('')
    
    const [quality, setQuality] = useState('')
    const [airComponents, setAirComponents] = useState(null)

    const convertComponents = (components) =>{
        let arrOfComponents = []
        let elements = ['Carbon monoxide', 'Nitrogen monoxide', 'Nitrogen dioxide','Ozone','Sulphur dioxide','Fine particles matter','Coarse particulate matter','Ammonia']

        for (let item in components) {
            arrOfComponents.push([item, components[item]])
        }

        arrOfComponents.forEach( (i,index) => {
            let firstItem = elements.shift()
            arrOfComponents[index].push(firstItem)
        })
        setAirComponents(arrOfComponents) //revisar
        return arrOfComponents;
    }

    const convertQuality = (quality) => {      
        switch (quality) {
            case 1: return setQuality('GOOD');
            case 2: return setQuality('FAIR');
            case 3: return setQuality('MODERATE');
            case 4: return setQuality('POOR');
            case 5: return setQuality('VERY POOR');
        }
    }

    const fetchLocation = async(e) => {
        e.preventDefault()
        if (inputSearch.trim()){
                const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputSearch}&limit=5&appid=${apiKey}`)
                const locations = await res.json()
                if (locations.length){
                    setLocations(locations)
                    setLocationsTitle(true)
                    setError(null)
                } else {
                    setError('The location doesn\'t exist')
                }
                
        } else {
            setError('esta vacio')
        }
    }     

    const fetchAir = async(e) => {
        setAirComponents(null)
        let lat = e.target.attributes[0].value
        let lon = e.target.attributes[1].value
        let name = e.target.innerText;

        const res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        const selectedLocation = await res.json()
        let components = selectedLocation.list[0].components
        let quality = selectedLocation.list[0].main.aqi
        
        convertComponents(components)
        setLocationSelected(name)
        convertQuality(quality)
        changeColor(quality)
    }

    const changeColor = (quality) => {
        if (quality === 1){
            root.style.setProperty('--main-color', 'var(--c-cyan)')
        }
        if (quality === 2){
            root.style.setProperty('--main-color', 'var(--c-green)')
        }
        if (quality === 3){
            root.style.setProperty('--main-color', 'var(--c-aqua)')
        }
        if (quality === 4){
            root.style.setProperty('--main-color', 'var(--c-red)')
        }
        if (quality === 5){
            root.style.setProperty('--main-color', 'var(--c-orange)')
        }
    }
 
    return (
        <div className="main__grid">
            <div className="sidebar">
                <div className="search">
                    <form onSubmit={ fetchLocation }>
                        <label>Search</label>
                        <div className="input-search">
                            <input 
                                type="text"
                                placeholder="e.g: London"
                                value={inputSearch}
                                onChange={ e => setInputSearch(e.target.value) }
                                />
                            <button type="submit"><img src="./images/search-solid.svg" alt=""/></button>
                        </div>
                        {
                            error 
                            ?
                            <p className="error">{error}</p>
                            :
                            null
                        }
                    </form>
                </div>
                <div className="locations">
                    {
                        locationsTitle ?
                        <p>Select location</p>
                        :
                        null
                    }
                    {
                        locations.map( (e, index) => (
                            <button key={index} lat={e.lat} lon={e.lon} onClick={ fetchAir }>{e.name} ({e.country})</button>
                        ))
                    }
                </div>
            </div>

            <div className="main">
                <div className="header__location">
                    <h3>{locationSelected}</h3>
                    <div className="tag-quality">
                     { quality 
                        ? 
                        <p>air quality: <span>{ quality }</span></p>  
                        : 
                        null 
                    }
                    </div>
                </div>
                <div className="container__grid">
                    {
                        airComponents 
                        ?
                        airComponents.map( (item, index) => (
                            <Card key={index} tag={item[0]} number={item[1]} name={item[2]}/>
                        ))
                        :
                        <h3>Please search location to know the air pollution</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default Main;