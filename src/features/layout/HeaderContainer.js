import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import {
  selectors as authSelectors,
  actions as authActions
} from 'store/ducks/auth';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import * as authService from 'services/authService';

import { HeaderStyled, DropdownStyled } from './LayoutStyled';

const HeaderContainer = ({ history, location }) => {
  const dispatch = useDispatch();
  const onMenuClick = e => {
    if (e.key === 'logout') {
      dispatch(authActions.logout());
      authService.logout();
      history.push('/login');
    }
  };
  return (
    <HeaderStyled>
      <h1>Mini Aspire</h1>
      <div className="header-right">
        <Menu mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">Loans</Link>
          </Menu.Item>
        </Menu>
        <DropdownStyled
          overlay={
            <Menu onClick={onMenuClick}>
              <Menu.Item disabled={true}>
                <Icon type="user" /> Profile
              </Menu.Item>
              <Menu.Item key="logout">
                <Icon type="logout" /> Log out
              </Menu.Item>
            </Menu>
          }
        >
          <span>
            Hello
            <span className="first-name">
              {' '}
              {useSelector(authSelectors.getFirstName)}
            </span>
          </span>
        </DropdownStyled>
      </div>
    </HeaderStyled>
  );
};

export default withRouter(HeaderContainer);
