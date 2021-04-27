import React, { useEffect } from 'react';

export const App = () => {
  useEffect(() => {
    fetch('/api/v1/time-series')
      .then((response) => response.json())
      .then((response) => console.log(response));
  }, []);

  return <>howl</>;
};

export default App;
