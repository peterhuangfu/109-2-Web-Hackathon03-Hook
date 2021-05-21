import React from 'react'

function StationInfo(props) {
  const info = props.info === null ? {} : props.info
  const labels = [
    { label: '車站名稱', value: 'station_name' },
    { label: '車站位址', value: 'address' },
    { label: '詢問處位置', value: 'service_counter' },
    { label: '自行車進出', value: 'enable_bicycle' }
  ]

  return (
    <div className="station-info-container">
      <table className="station-info-table">
        <thead>
          <tr>
            <th colSpan="2">車站資訊</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((each, i) => (
            <tr key={each.label}>
              <td id={`table-${each.value}-label`}>{each.label}</td>
              <td id={`table-${each.value}-value`}>{info[each.value]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StationInfo
