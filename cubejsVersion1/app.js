console.log('hello 1');


const CubejsServer = require('@cubejs-backend/server');
const cubejs = require('@cubejs-client/core');

const server = CubejsServer();
/*
server.listen().then(({ version, port }) => {
    console.log(`?? Cube.js server (${version}) is listening on ${port}`);
});
import cubejs from '@cubejs-client/core';
*/


const API_URL = 'http://localhost:4000';
const CUBEJS_TOKEN="425d172df495b6acfdb99408fab3f337742227c21d19ad3cca651a068db983c2cdce3bf1a6588cf66fdd95d14b42000c4a6a2433261fcf6094f4369a56a65e4d";
const cubejsApi = cubejs(CUBEJS_TOKEN);


const queries = [
  {
    measures: ['OnlineOrders.revenue'],
    timeDimensions: [
      {
        dimension: 'OnlineOrders.createdAt',
        granularity: 'day',
        dateRange: ['2020-08-01', '2020-08-07'],
      },
    ],
  },
  {
    measures: ['RetailOrders.revenue'],
    timeDimensions: [
      {
        dimension: 'RetailOrders.createdAt',
        granularity: 'day',
        dateRange: ['2020-08-01', '2020-08-07'],
      },
    ],
  },
];

const resultSet = cubejsApi.load(queries);

console.log('end');