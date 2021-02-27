//IMPORTACIONES
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faSearch, faSun } from '@fortawesome/free-solid-svg-icons'
import Forecast from "./forecast"
import CardToday from "./cardToday";
import axios from "axios";
import "../styles/Home.css";
import {AnimatePresence} from "framer-motion";



//COMPONENTE HOME
const Home = () => {

    //VARIABLES INICIALES Y ESTADO
    const dateToday = new Date();
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "junio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const [input, setInput] = useState("");
    const [list, setList] = useState([]);
    const [city, setCity] = useState("Cumana");
    const [error, setError] = useState(false);
    const [today, setToday] = useState({
        temp: "not found",
        viento: "not found",
        humedad: "not found",
        description: "No hay resultados"
    });


    // USO DE LA API ANTES DE QUE RENDERICE EL DOM
    useEffect(() => {

        setList([]);
        const fetchData = async () => {
            try {
                let aux = "";
                const arr = [];
                const res = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=95d1818b74acc32f56b0879dad233182`);
                res.data.list.forEach(item => {
                    const compare = item.dt_txt.match(/^\w+-\w+-\w+\s/).join("");
                    if (aux !== compare) {
                        aux = compare;
                        arr.push(item);
                    }
                });
                setError(false)
                setList(arr);
                setToday({ temp: arr[0].main.temp, viento: arr[0].wind.speed, humedad: arr[0].main.humidity, description: arr[0].weather[0].description });
                console.log(arr);

            }
            catch
            {
                setError(true);
            }

        }

        fetchData();
    }, [city]);

    //EVENTOS PARA EL INPUT Y EL BOTON
    const submitCity = (e) => {
        e.preventDefault();
        setCity(input);
    }

    const inputChange = (e) => { setInput(e.target.value) };


    //LISTA DE ELEMENTOS QUE PRONOSTICA EL CLIMA LOS 5 DIAS PROXIMOS
    let fullList = list.map((item, index) => {
        return index !== 0 ? <Forecast date={item.dt_txt.match(/^\w+-\w+-\w+[^\s]/)} temp={item.main.temp + " oK"} key={index} /> : null;
    })

    //PINTAR EL DOM
    return (
        <div className="app-container">
            <div className="wheather-aside">
                <form className="search" onSubmit={submitCity}>
                    <button type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <input type="text" placeholder="Ingrese su cuidad o pais" required onChange={inputChange} />
                </form>
                <div className="first-info">
                    <img src="https://www.flaticon.es/svg/vstatic/svg/3508/3508988.svg?token=exp=1614367959~hmac=e100c5ebfc03e945e9e8edf9d7a915a5" alt=""></img>
                    <p className="temperature">{today.temp}<span>oK</span></p>
                    <p className="day">{today.description}</p>
                    <p>{`${meses[dateToday.getMonth()]} ${dateToday.getDate()} ${dateToday.getFullYear()}`}</p>
                </div>
                <div className="logo">
                    <p>Riquex<FontAwesomeIcon icon={faSun} style={{ color: "yellow" }} />Wheather</p>
                </div>
                <div className="wave-container">
                    <div className="wave1"></div>
                    <div className="wave2"></div>
                    <div className="wave3"></div>
                </div>
            </div>
            <section className="wheather-info">
                <div className="forecast-container">
    {error?<div style={{fontWeight:"bolder", fontSize:"60px", textAlign:"center"}}>No se ha encontrado ningun resultado<FontAwesomeIcon icon={faExclamationTriangle}/></div>:<AnimatePresence>{fullList}</AnimatePresence>}
                </div>
                <div className="complete-info">
                    <p className="title">Informacion de hoy</p>
                    <div className="today-hightlights">
                        <CardToday title="V. del viento" value={today.viento + " m/s"} img="https://www.flaticon.es/svg/vstatic/svg/1506/1506761.svg?token=exp=1614383959~hmac=89f76d2623ac112542e3d94ed8abddf8" />
                        <CardToday title="Temperatura" value={today.temp} img="https://www.flaticon.es/svg/vstatic/svg/1684/1684375.svg?token=exp=1614384308~hmac=7faca883103896cd70ed64fd35aebcc0" />
                        <CardToday title="Humedad" value={today.humedad + "%"} img="https://www.flaticon.es/svg/vstatic/svg/728/728093.svg?token=exp=1614385159~hmac=e559af55360f2362c6f10a93d1f0b6f4" />
                        <CardToday title="city" value={city.match(/\w{2,9}/)} img="https://www.flaticon.com/svg/vstatic/svg/888/888063.svg?token=exp=1614385814~hmac=e2934b5c5d258f71d662665c8a11bd9c" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
