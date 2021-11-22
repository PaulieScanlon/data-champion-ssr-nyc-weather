import React, { Fragment } from 'react';
import axios from 'axios';

const Page = ({ serverData }) => {
  const { city, date, time, forecast, error } = serverData;

  return (
    <main>
      {error ? (
        <div>
          <h2>Blast!</h2>
          <p>There's been an error</p>
          <p>{error.message}</p>
        </div>
      ) : (
        <Fragment>
          <div>
            <h1>{city}</h1>
            <h2>{date}</h2>
            <h2>{time}</h2>
          </div>
          <ul>
            {forecast.map((item, index) => {
              const {
                name,
                startTime,
                shortForecast,
                temperature,
                temperatureUnit,
                windSpeed,
                windDirection
              } = item;
              return (
                <li key={index}>
                  <div>{name}</div>
                  <div>{startTime}</div>
                  <div>{shortForecast}</div>
                  <div>{temperature}</div>
                  <div>{temperatureUnit}</div>
                  <div>{windSpeed}</div>
                  <div>{windDirection}</div>
                </li>
              );
            })}
          </ul>
        </Fragment>
      )}
    </main>
  );
};

export default Page;

export async function getServerData() {
  const LATITUDE = '40.730610';
  const LONGITUDE = '-73.935242';

  try {
    const response = await axios(
      `https://api.weather.gov/points/${LATITUDE},${LONGITUDE}`,
      {
        method: 'GET'
      }
    );

    const forecast = await axios(response.data.properties.forecast, {
      method: 'GET'
    });

    return {
      status: 200,
      props: {
        city: response.data.properties.relativeLocation.properties.city,
        date: forecast.data.properties.updated,
        time: forecast.data.properties.updated,
        forecast: forecast.data.properties.periods
      }
    };
  } catch (error) {
    return {
      status: 500,
      props: {
        error: error
      }
    };
  }
}
