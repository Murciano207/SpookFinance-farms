import React, { useEffect, Suspense, lazy } from 'react';
import { useWallet } from 'use-wallet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ResetCSS } from 'yogi-uikit_rc';
import BigNumber from 'bignumber.js';
import { useFetchPriceList, useFetchPublicData } from 'state/hooks';
import GlobalStyle from './style/Global';
import Menu from './components/Menu';
import PageLoader from './components/PageLoader';

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'));
const Farms = lazy(() => import('./views/Farms'));
const NotFound = lazy(() => import('./views/NotFound'));

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const App: React.FC = () => {
  const { account, connect } = useWallet();
  useEffect(() => {
    if (!account && window.localStorage.getItem('connectorId')) {
      connect('injected');
    }
  }, [account, connect]);

  useFetchPublicData();
  useFetchPriceList();

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
    </Router>
  );
};

export default React.memo(App);
