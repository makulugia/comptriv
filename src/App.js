import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import WeatherComparison from './components/WeatherComparison';

function App() {
  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const graphRef = useRef(null);

  const handleCity1InputChange = (event) => {
    setCity1(event.target.value);
  };

  const handleCity2InputChange = (event) => {
    setCity2(event.target.value);
  };

  const fetchData = async () => {
    try {
      if (chartInstance) {
        // Destroy the previous chart instance
        chartInstance.destroy();
      }

      const response1 = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city1}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );

      const response2 = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city2}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );

      const city1DailyData = calculateDailyAverage(response1.data.list);
      const city2DailyData = calculateDailyAverage(response2.data.list);

      setWeatherData([
        { city: city1, data: city1DailyData },
        { city: city2, data: city2DailyData }
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  };

  const calculateDailyAverage = (data) => {
    const dailyAverages = {};

    const totalDays = new Date();
    totalDays.setDate(totalDays.getDate());

    data.forEach((item) => {
      const date = new Date(item.dt_txt).toLocaleDateString();

      if (new Date(item.dt_txt) >= totalDays) {
        if (!dailyAverages[date]) {
          dailyAverages[date] = [];
        }
        dailyAverages[date].push(item.main.temp);
      }
    });

    Object.keys(dailyAverages).forEach((date) => {
      const temperatures = dailyAverages[date];
      const averageTemperature =
        temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
      dailyAverages[date] = averageTemperature;
    });

    return dailyAverages;
  };

  useEffect(() => {
    if (weatherData.length > 0) {
      const ctx = graphRef.current.getContext('2d');
      const dates = Object.keys(weatherData[0]?.data || []);
      const city1Temperatures = dates.map((date) => weatherData[0].data[date] || null);
      const city2Temperatures = dates.map((date) => weatherData[1].data[date] || null);

      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: weatherData[0].city,
              data: city1Temperatures,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1
            },
            {
              label: weatherData[1].city,
              data: city2Temperatures,
              fill: false,
              borderColor: 'rgba(255, 99, 132, 1)',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Temperature (°C)'
              }
            }
          }
        }
      });

      setChartInstance(newChartInstance);
    }
  }, [weatherData]);

  return (
    <div className="container">
      <h1 className="text-center">CoTriv</h1>
      <h2 className="text-center">Comparatio Trivialis</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city 1 name"
          value={city1}
          onChange={handleCity1InputChange}
          onKeyPress={handleKeyPress}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Enter city 2 name"
          value={city2}
          onChange={handleCity2InputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={fetchData}>
          Compare
        </button>
      </div>
      <WeatherComparison weatherData={weatherData} />
      <div className="graph-container">
        <canvas ref={graphRef} />
      </div>
    </div>
  );
}

export default App;