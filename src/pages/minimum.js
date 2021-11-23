import React from 'react';

const Page = ({ serverData }) => {
  return <p>{serverData.something}</p>;
};

export default Page;

export async function getServerData() {
  return {
    status: 200,
    props: {
      something: 'test'
    }
  };
}
