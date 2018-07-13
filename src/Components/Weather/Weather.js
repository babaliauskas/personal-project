// import React, {Component} from 'react';


// const API_KEY = '027fbdd98b026f05b362bd2ee730175b';

// export default class Weather extends Component {

//     getWeather = async (e) => {
//         e.preventDefault();
//         const api_call = await fetch(`https://samples.openweathermap.org/data/2.5/forecast?q=Vatican,VA&appid=${API_KEY}`)
//         const data = await api_call.json();
//         console.log(data[0].main.temp)
//     }

//     render(){
//         return (
//             <div>
//                 <button onClick={this.getWeather}>Get Weather</button>
//             </div>
//         )
//     }
// }