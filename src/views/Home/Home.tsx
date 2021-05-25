import React from 'react';
import styled from 'styled-components';
import { Heading, Text, BaseLayout } from 'yogi-uikit_rc';
import useI18n from 'hooks/useI18n';
import Page from 'components/layout/Page';
import FarmStakingCard from './components/FarmStakingCard';
import YogiStats from './components/YogiStats';
import TotalValueLockedCard from './components/TotalValueLockedCard';

const Hero = styled.div`
  align-items: center;
  background-image: url('https://raw.githubusercontent.com/yogi-fi/yogi-assets/master/character/astronaut.png');
  background-size: 110px;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('https://raw.githubusercontent.com/yogi-fi/yogi-assets/master/character/chains.png'),
      url('https://raw.githubusercontent.com/yogi-fi/yogi-assets/master/character/astronaut.png');
    background-size: 150px;
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`;

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`;

const Home: React.FC = () => {
  const TranslateString = useI18n();

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="text">
          {TranslateString(576, 'Yogi')}
        </Heading>
        <Text>{TranslateString(578, 'Automated portfolio manager, liquidity provider, and price sensor.')}</Text>
      </Hero>
      <div>
        <Cards>
          <FarmStakingCard />
          <YogiStats />
        </Cards>
      </div>
      <TotalValueLockedCard />
    </Page>
  );
};

export default Home;
