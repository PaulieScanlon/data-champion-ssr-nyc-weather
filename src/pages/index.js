import React, { Fragment } from 'react';

const Page = ({ serverData }) => {
  const { city, date, time, forecast, error } = serverData;

  return (
    <main className="container mx-auto max-w-5xl grid gap-16 p-8">
      {error ? (
        <div className="bg-red-500 rounded shadow p-6 text-white items-center">
          <div>
            <h2 className="text-5xl font-black">Blast!</h2>
            <p>There's been an error.</p>
          </div>
          <div>
            <p className="italic">{error.message}</p>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="grid gap-6 px-5">
            <h1 className="text-5xl font-black grid gap-1">
              <span>{city}</span>
              <span className="text-brand-primary">Weather Forecast</span>
            </h1>
            <div>
              <h2 className="text-lg">
                Last updated by the{' '}
                <a
                  className="text-brand-default"
                  href="https://www.weather.gov/documentation/services-web-api"
                  rel="nopener"
                >
                  National Weather Service{' '}
                </a>
              </h2>
              <span className="font-black">{`on ${date} @${time}`}</span>
            </div>
          </div>
          <ul className="grid gap-8 md:grid-cols-2">
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
                  className="flex flex-col p-6 bg-gray-50 shadow rounded-md"
                >
                  <div className="grid grid-cols-auto-1fr gap-2 mb-4">
                    <div className="text-5xl">
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
                    <div>
                      <div className="text-md font-bold">{name}</div>
                      <div className="grid grid-cols-auto-1fr gap-1 text-sm text-gray-500">
                        <span role="img" aria-label="Spiral Calendar">
                          🗓️
                        </span>
                        {new Date(startTime).toDateString()}
                      </div>
                    </div>
                  </div>

                  <p className="text-2xl font-black flex-grow mb-4">
                    {shortForecast}
                  </p>
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
    const response = await fetch(
      `https://api.weather.gov/points/${LATITUDE},${LONGITUDE}`
    ).then((res) => res.json());

    const forecast = await fetch(response.properties.forecast).then((res) =>
      res.json()
    );

    return {
      status: 200,
      props: {
        city: response.properties.relativeLocation.properties.city,
        date: new Date(forecast.properties.updated).toLocaleDateString(),
        time: new Date(forecast.properties.updated).toLocaleTimeString(),
        forecast: forecast.properties.periods
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
