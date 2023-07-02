import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherComparison from './WeatherComparison';

describe('WeatherComparison', () => {
  test('renders table with correct data', () => {
    const weatherData = [
      {
        city: 'City 1',
        data: {
          '2023-07-01': 25,
          '2023-07-02': 30,
          '2023-07-03': 27,
        },
      },
      {
        city: 'City 2',
        data: {
          '2023-07-01': 22,
          '2023-07-02': 28,
          '2023-07-03': 24,
        },
      },
    ];

    render(<WeatherComparison weatherData={weatherData} />);

    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('City 1 Temp (°C)')).toBeInTheDocument();
    expect(screen.getByText('City 2 Temp (°C)')).toBeInTheDocument();

    expect(screen.getByText('2023-07-01')).toBeInTheDocument();
    expect(screen.getByText('25.00')).toBeInTheDocument();
    expect(screen.getByText('22.00')).toBeInTheDocument();

    expect(screen.getByText('2023-07-02')).toBeInTheDocument();
    expect(screen.getByText('30.00')).toBeInTheDocument();
    expect(screen.getByText('28.00')).toBeInTheDocument();

    expect(screen.getByText('2023-07-03')).toBeInTheDocument();
    expect(screen.getByText('27.00')).toBeInTheDocument();
    expect(screen.getByText('24.00')).toBeInTheDocument();
  });
});
