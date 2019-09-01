import React from 'react';
import { Layout } from 'antd';
import HeaderContainer from './HeaderContainer';
import FooterComponent from './FooterComponent';
import ContentComponent from './ContentComponent';

const LayoutComponent = props => (
  <Layout>
    <HeaderContainer />
    <ContentComponent>{props.children}</ContentComponent>
    <FooterComponent />
  </Layout>
);

export default LayoutComponent;
