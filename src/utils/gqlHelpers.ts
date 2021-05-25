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
