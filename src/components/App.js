import React, { Component } from "react";
import styled from "styled-components";
import SearchCity from "./SearchCity";
import NotFound from "./NotFound";
import device from "../responsive/Device";
import Result from "./Result";

const AppTitle = styled.h1`
  display: block;
  height: 64px;
  margin: 0;
  padding: 20px 0;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400px;
  color: #ffffff;
  transition: 0.3s 1.4s;
  opacity: ${({ showLabel }) => (showLabel ? 1 : 0)};

  ${({ secondary }) =>
    secondary &&
    `
    opacity: 1;
    height: auto;
    position: relative;
    padding: 20px 0;
    font-size: 30px;
    top: 20%;
    text-align: center;
    transition: 0.5s;
    @media ${device.tablet} {
      font-size: 40px;
    }
    @media ${device.laptop} {
      font-size: 50px;
    }
    @media ${device.laptopL} {
      font-size: 60px;
    }
    @media ${device.desktop} {
      font-size: 70px;
    }
      `}

  ${({ showResult }) =>
    showResult &&
    `
    opacity: 0;
    visibility: hidden;
    top: 10%;
  `}
`;

const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`;
class App extends Component {
  state = {
    value: "",
    weatherInfo: null,
    error: false,
    location: null,
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  searchWeather = (type, lat, lon, value) => {
    const APIkey = process.env.REACT_APP_API_KEY;
    //const { value } = this.state;

    var weather = "";
    var forecast = "";
    if (type === "city") {
      weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=metric`;
      forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric`;
    } else if (type === "position") {
      weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${APIkey}&units=metric`;
      forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${APIkey}&units=metric`;
    }

    Promise.all([fetch(weather), fetch(forecast)])
      .then(([res1, res2]) => {
        if (res1.ok && res2.ok) {
          return Promise.all([res1.json(), res2.json()]);
        }
        throw Error(res1.statusText, res2.statusText);
      })
      .then(([data1, data2]) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "Nocvember",
          "December",
        ];
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        }`;

        const sunset = new Date(data1.sys.sunset * 1000)
          .toLocaleTimeString()
          .slice(0, 5);
        const sunrise = new Date(data1.sys.sunrise * 1000)
          .toLocaleTimeString()
          .slice(0, 5);

        const weatherInfo = {
          city: data1.name,
          country: data1.sys.country,
          date,
          description: data1.weather[0].description,
          main: data1.weather[0].main,
          temp: data1.main.temp,
          highestTemp: data1.main.temp_max,
          lowestTemp: data1.main.temp_min,
          sunset,
          sunrise,
          clouds: data1.clouds.all,
          humidity: data1.main.humidity,
          wind: data1.wind.speed,
          forecast: data2.list,
        };

        this.setState({
          weatherInfo,
          error: false,
        });
      })
      .catch((error) => {
        console.log(error);

        this.setState({
          error: true,
          weatherInfo: null,
        });
      });
  };

  handleSearchCity = (e) => {
    e.preventDefault();
    this.searchWeather("city", null, null, this.state.value);
  };

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      //const location = JSON.stringify(position);
      this.setState({ location: position });
    });
  };

  componentDidMount() {
    this.findCoordinates();
  }

  handleSearchByLocate = (e) => {
    e.preventDefault();
    this.searchWeather(
      "position",
      this.state.location.coords.latitude,
      this.state.location.coords.longitude,
      null
    );
  };

  render() {
    const { value, weatherInfo, error } = this.state;
    return (
      <>
        <AppTitle showLabel={(weatherInfo || error) && true}>
          Weather app
        </AppTitle>
        {/* <AppTitle showLabel={true}>Weather app</AppTitle> */}
        <WeatherWrapper>
          <AppTitle secondary showResult={(weatherInfo || error) && true}>
            Weather app
          </AppTitle>
          <SearchCity
            value={value}
            showResult={(weatherInfo || error) && true}
            change={this.handleInputChange}
            submit={this.handleSearchCity}
            locate={this.handleSearchByLocate}
          />
          {weatherInfo && <Result weather={weatherInfo} />}
          {error && <NotFound error={error} />}
        </WeatherWrapper>
      </>
    );
  }
}

export default App;
