import React, { PureComponent } from 'react';
import '../style/main.css';
import TabBarSignal from '../TabBarSignal';

class Menu extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      showSubMenu: 'none'
    }
  }

  styleObj = {};

  styleObjInitial() {
    return {
      color: '#fff',
      borderBottomWidth: 0
    };
  }

  styleObjChanged(){
    return {
      color: 'darkorange',
      borderBottomWidth: '3px',
      borderBottomColor: 'darkorange',
      borderBottomStyle: 'solid'
    };
  }

  handleMouseEnter = () => {
    this.setState({
      showSubMenu: 'block'
    });
    this.styleObj = this.styleObjChanged();
  };

  handleMouseLeave = () => {
    this.setState({
      showSubMenu: 'none'
    });
    this.styleObj = this.styleObjInitial();
  };

  render(){
    let children = React.Children.map(this.props.children, (child) =>{
      return React.cloneElement(child, {display: this.state.showSubMenu})
    });
    return(
      <li className="menu-item" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}
        onClick={() => TabBarSignal.addTab(this.props.contentModule, this.props.tabBarName)}>
        <span className="menu-title" style={this.styleObj}>{this.props.menuName} </span>
        {children}
      </li>
    )
  }
}

class MenuList extends PureComponent {
  render(){
    return(
      <ul className="menu-list" style={{display: this.props.display}}>
        {this.props.children}
      </ul>
    );
  }
}


class MenuItem extends PureComponent {
  constructor(){
    super();
    this.state = {
      color: '#fff'
    }
  }

  handleMouseEnter = () => {
    this.setState({
      color: '#cfcfcf'
    })
  };

  handleMouseLeave = () => {
    this.setState({
      color: '#fff'
    })
  };

  render(){
    return(
      <li className="menu-option" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}
          onClick={() => TabBarSignal.addTab(this.props.contentModule, this.props.tabBarName)}
        style={{backgroundColor: this.state.color}}>{this.props.itemName}</li>
    )
  }
}

let HeaderMenus = {
  Menu: Menu,
  MenuItem: MenuItem,
  MenuList: MenuList
};

export default HeaderMenus;