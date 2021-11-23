import React from 'react';
import axios from 'axios';

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
