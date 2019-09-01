import React from 'react';
import { ContentStyled } from './LayoutStyled';

const ContentComponent = props => (
  <ContentStyled>{props.children}</ContentStyled>
);

export default ContentComponent;
