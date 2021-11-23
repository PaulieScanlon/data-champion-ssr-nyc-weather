import React, { Fragment } from 'react';
import axios from 'axios';

// 1. add Gatsby branding
// 2. monogram logo

const Page = ({ serverData }) => {
  const { city, date, time, forecast, error } = serverData;

  return (
    <main className="container mx-auto text-center grid gap-16 p-8">
      {error ? (
        <div className="bg-red-500 rounded shadow p-6 grid gap-4 text-white grid gap-2">
          <div>
            <h2 className="text-lg font-black">Blast!</h2>
            <p>There's been an error</p>
          </div>
          <div>
            <p className="italic">{error.message}</p>
          </div>
        </div>
      ) : (
        <Fragment>
          <div>
            <h1 className="text-4xl font-black text-brand-primary">
              {`${city} Weather Forecast`}
            </h1>
            <h2 className="text-md text-gray-500">
              Last updated by the{' '}
              <a
                href="https://www.weather.gov/documentation/services-web-api"
                rel="nopener"
              >
                National Weather Service{' '}
              </a>
              {`on ${date} @${time}`}
            </h2>
          </div>
          <ul className="grid gap-8 lg:grid-cols-2">
            {forecast.map((item, index) => {
              const {
                name,
                isDaytime,
                startTime,
                shortForecast,
                temperature,
                temperatureUnit,
                windSpeed,
                windDirection
              } = item;
              return (
                <li
                  key={index}
                  className="bg-gray-50 rounded shadow p-6 grid gap-4"
                >
                  <div>
                    <div className="text-4xl">
                      {isDaytime ? (
                        <span role="img" aria-label="Full Moon Face">
                          🌝
                        </span>
                      ) : (
                        <span role="img" aria-label="New Moon Face">
                          🌚
                        </span>
                      )}
                    </div>
                    <div className="text-md font-bold">{name}</div>
                    <div className="text-sm text-gray-500">
                      <div className="grid grid-cols-auto-auto gap-1 justify-center">
                        <span role="img" aria-label="Spiral Calendar">
                          🗓️
                        </span>
                        {new Date(startTime).toDateString()}
                      </div>
                    </div>
                  </div>
                  <p className="text-2xl italic font-black">{shortForecast}</p>
                  <div className="text-sm text-gray-500">
                    <div>{`Temperature: ${temperature} ${temperatureUnit}`}</div>
                    <div>{`Wind: ${windSpeed} ${windDirection}`}</div>
                  </div>
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
        date: new Date(forecast.data.properties.updated).toLocaleDateString(),
        time: new Date(forecast.data.properties.updated).toLocaleTimeString(),
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
