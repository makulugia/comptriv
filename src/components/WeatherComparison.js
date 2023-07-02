import React from 'react';

const WeatherComparison = ({ weatherData }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            {weatherData.map(({ city }) => (
              <th key={city}>{city.charAt(0).toLocaleUpperCase() + city.slice(1)} Temp (°C)</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(weatherData[0]?.data || {}).map((date) => (
            <tr key={date}>
              <td>{date}</td>
              {weatherData.map(({ data }) => (
                <td key={data[date]}>{data[date]?.toFixed(2) || '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherComparison;
