import React from 'react';

const Page = ({ serverData }) => {
  return (
    <pre className="text-xs bg-gray-50 p-4">
      {JSON.stringify(serverData, null, 2)}
    </pre>
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
