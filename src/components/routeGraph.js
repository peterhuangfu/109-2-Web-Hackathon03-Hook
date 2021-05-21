import React from 'react'
import Station from './station'

function RouteGraph(props) {
  const data = props.route_data

  const showInfo = (station_id) => {
    props.showInfo(station_id)
  }

  return (
    <div className="route-graph-container">
      {data.map((s, i) => (
        <Station datum={s} pos={i} showInfo={showInfo} key={s.station_id} />
      ))}
    </div>
  )
}

export default RouteGraph
