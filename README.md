# Project Name

CoTriv - Comparatio Trivialis

## Description

CoTriv is a React application that allows you to compare the average temperature of two cities over the past 30 days. It retrieves weather data from the OpenWeatherMap API and displays the data in a table and a line graph.

## Installation

1. Clone the repository:

   ```shell
   $ git clone https://github.com/your-username/cotriv.git

2. Navigate to the project directory:
   ```shell
   $ cd cotriv

3. Install the dependencies:
   ```makefile
   $ npm install

## Usage

1. Obtain an API key from OpenWeatherMap by signing up on their website.

2. Create a .env file in the project directory and add your API key:
   ```shell
   REACT_APP_API_KEY=your-api-key

3. Start the development server:
   ```shell
   $ npm start

4. Open your web browser and visit http://localhost:3000 to access the application.

5. Enter the names of two cities in the input fields and click the "Compare" button. The application will fetch weather data for the upcoming 7 days for the specified cities and display the average temperatures in a table and a line graph.

## License

This project is licensed under the MIT License. See the LICENSE file for details.