import { Layout, Dropdown } from 'antd';
import styled from 'styled-components';

export const HeaderStyled = styled(Layout.Header)`
  background-color: #e5eeff;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: ${props => props.theme.layout.header.height}px;
  position: relative;
  z-index: 999;
  line-height: 20px;
  .ant-menu {
    background-color: #e5eeff;
    line-height: 20px;
  }
  .header-right {
    display: flex;
  }
`;

export const FooterStyled = styled(Layout.Footer)`
  background-color: #f5f5f5;
  text-align: center;
  padding: 4px 0px;
`;

export const ContentStyled = styled(Layout.Content)`
  background-color: white;
  min-height: calc(
    100vh -
      ${props =>
        props.theme.layout.header.height + props.theme.layout.footer.height}px
  );
  padding-left: 10px;
`;

export const DropdownStyled = styled(Dropdown)`
  display: block;
  margin-left: 20px;
  .first-name {
    font-weight: bold;
  }
`;
