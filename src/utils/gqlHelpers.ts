import { GraphQLClient, gql } from 'graphql-request';

export const fetchFarmsLiquidity = async () => {
  const client = new GraphQLClient(process.env.REACT_APP_SUBGRAPH);

  const query = gql`
    {
      pools(orderBy: liquidity, orderDirection: desc) {
        id
        liquidity
      }
    }
  `;

  return await client.request(query);
};

export const fetchTokenPrices = async () => {
  const client = new GraphQLClient(process.env.REACT_APP_SUBGRAPH);

  const query = gql`
    {
      tokenPrices {
        id
        symbol
        price
      }
    }
  `;

  return await client.request(query);
};

export const fetchYogiPrice = async () => {
  const client = new GraphQLClient(process.env.REACT_APP_SUBGRAPH);

  const query = gql`
    {
      tokenPrices(where: { id: "0x88888c8783a88ad40d995073ab7fbbe8d34acda8" }) {
        id
        symbol
        price
      }
    }
  `;

  return await client.request(query);
};
