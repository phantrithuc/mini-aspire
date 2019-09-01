import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { selectors as apiStatusSelectors } from 'store/ducks/api';
const withLoading = WrappedComponent => {
  const WrappedComponentWithLoading = ({ isLoading, ...rest }) => (
    <Spin spinning={isLoading}>
      <WrappedComponent {...rest} />
    </Spin>
  );
  WrappedComponentWithLoading.propTypes = {
    isLoading: PropTypes.bool
  };
  const mapStateToProps = state => ({
    isLoading: apiStatusSelectors.inProgress(state)
  });
  return connect(mapStateToProps)(WrappedComponentWithLoading);
};

export default withLoading;
