import React, { useState, useEffect } from 'react'
import RouteGraph from '../components/routeGraph'
import StationInfo from '../components/stationInfo'
import axios from 'axios'
import '../styles/App.css'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
})

function App() {
  const [data, setData] = useState({}) // all MRT station data
  const [current_station_id, setCurrentStationId] = useState('None') // station clicked by cursor
  const [start_station, setStartStation] = useState('') // station selected as the starting one
  const [end_station, setEndStation] = useState('') // station selected as the ending one
  const [distance, setDistance] = useState(-2) // distance shown on the screen

  const station_type = current_station_id[0] // R10, station_type = R
  const station_order = current_station_id.slice(1, current_station_id.length) // R10, station_order = 10
  const station_info = current_station_id[0] !== 'N' ? data[station_type][parseInt(station_order) - 1] : null // get certain station information

  const getStations = async () => {
    const res = await instance.get('/getStations')
    setData(res.data.data)
  }

  const showInfo = (station_id) => {
    setCurrentStationId(station_id)
  }

  const calculateDistance = async () => {
    const res = await instance.get(`/calculateDistance?start=${start_station}&end=${end_station}`)
    setDistance(res.data.distance)
  }

  useEffect(() => {
    if (!Object.keys(data).length) {
      getStations()
    }
  })

  if (!Object.keys(data).length) {
    return (
      <div className="wrapper">
        <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
      <div className="calculator-container">
        <div className="mode-selector">
          
          <span id="start-station-span">起始站</span>
          <select id="start-select" className="start-station" onChange={e => setStartStation(e.target.value)} value={start_station}>
            <option></option>
            {Object.keys(data).map((g, gi) => {
              const group = data[g]

              return (
                <optgroup label={g} key={g}>
                  {group.map((e, i) => (
                    <option id={`start-group-${e.station_id}`} value={e.station_id} key={e.station_id}>{e.station_name}</option>
                  ))}
                </optgroup>
              )
            })}
          </select>

          <span id="end-station-span">終點站</span>
          <select id="end-select" className="end-station" onChange={e => setEndStation(e.target.value)} value={end_station}>
            <option></option>
            {Object.keys(data).map((g, gi) => {
              const group = data[g]

              return (
                <optgroup label={g} key={g}>
                  {group.map((e, i) => (
                    <option id={`end-group-${e.station_id}`} value={e.station_id} key={e.station_id}>{e.station_name}</option>
                  ))}
                </optgroup>
              )
            })}
          </select>

          <button onClick={calculateDistance} id="search-btn">查詢距離</button>
          <span id="answer" className={distance === -1 ? 'invalid' : ''}>
            {distance === -2 ? '' : distance === -1 ? 'INVALID' : distance}
          </span>
          <span id="answer-postfix">KM</span>
        </div>

        <div className="route-graph-info-container">
          <RouteGraph route_data={data[Object.keys(data)[0]]} showInfo={showInfo} />
          <RouteGraph route_data={data[Object.keys(data)[1]]} showInfo={showInfo} />
          <StationInfo info={station_info} />
        </div>
        
      </div>
    </div>
  )
}

export default App
