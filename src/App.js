import React, { Component } from 'react';
import  './style/main.css';
import VersionLogo from './components/VersionLogo';
import HeaderMenus from './components/HeaderMenus';
import DBInfoBox from './components/DBInfoBox';
import headerMenuConfig from './headerMenuConfig';

const { Menu, MenuList, MenuItem } = HeaderMenus;

let constructMenuItems = (items) => {
  return (
    items.map((item) => {
      return <MenuItem itemName={item.name} contentModule={item.content} key={item.name} tabBarName={item.tabBarName}/>
    })
  )
};

let constructHeaderMenus = (config) => {
  return (
    config.map((menu) => {
      if(menu.children){
        return(
          <Menu menuName={menu.name} key={menu.name}>
            <MenuList>
              {constructMenuItems(menu.children)}
            </MenuList>
          </Menu>
        )
      }else{
        return(
          <Menu menuName={menu.name} contentModule={menu.content} key={menu.name} tabBarName={menu.tabBarName}/>
        )
      }
    })
  )
};

class App extends Component {
  render() {
    return (
      <div>
        <div className="layout-header">
          <VersionLogo/>
          <ul className="top-menus">
            {constructHeaderMenus(headerMenuConfig)}
          </ul>
        </div>
        <div className="layout-content">
          <DBInfoBox/>
        </div>
      </div>
    );
  }
}
export default App;