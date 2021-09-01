import React, { useState, useEffect } from 'react';
import NewsList from '../../components/NewsList';

const Dashboard = () => {
  var url = 'https://newsapi.org/v2/everything?' +
  'q=Apple&' +
  'from=2021-09-01&' +
  'sortBy=popularity&' +
  'apiKey=63551bc03e9841a59c2300df2d1e680b';

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url,
        {
          method: "GET",
        });
      const newData = await response.json();
      setData(newData);
    };
    fetchData();
  }, [url]);


  return (
    <div className="container mx-auto">
          {data ? (
            <NewsList data={data} />
          ) : (
          null
          )}
    </div>
  );
};

export default Dashboard;