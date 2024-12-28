import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Header from '../components/Header';
import styled from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';

import { setSelectedMenu, clearTVSeries, getTVSeries } from '../actions';
import Loader from '../components/Loader';
import TVSeriesList from '../components/TVSeriesList';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

// Discover Component
const TVSeries = ({
  geral,
  location,
  setSelectedMenu,
  getTVSeries,
  clearTVSeries,
  series,
}) => {
  const params = queryString.parse(location.search);
  const { secure_base_url } = geral.base.images;

  // Send url to setSelected Action Creator, it will check if is valid
  useEffect(() => {
    setSelectedMenu('TVSeries');
    // Clean up to remove selected menu from state
    return () => setSelectedMenu();
  }, []);

  // Call hook to fetch movies discover, pass in the url query
  useFetchTVSeries(
    getTVSeries,
    params,
    clearTVSeries
  );

  // If loading
  if (series.loading) {
    return <Loader />;
  }

  // Else return movies list
  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${geral.selected} TV Series`}</title>
      </Helmet>
      <Header title={geral.selected} subtitle="series" />
      <TVSeriesList series={series} baseUrl={secure_base_url} />
    </Wrapper>
  );
};

// Hook to fetch the movies, will be called everytime the route or the filters from the state change
function useFetchTVSeries(getTVSeries, params, clearTVSeries) {
  //const query = name.replace(/\s+/g, '_').toLowerCase();
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    getTVSeries(params.page);
    return () => clearTVSeries();
  }, [params.page]);
}

// Map State to Component Props
const mapStateToProps = ({ geral, series }) => {
  return { geral, series };
};

export default connect(
  mapStateToProps,
  { setSelectedMenu, getTVSeries, clearTVSeries }
)(TVSeries);
