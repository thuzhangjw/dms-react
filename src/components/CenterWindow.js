import React, { PureComponent } from 'react';
import '../style/main.css';
import TabBarSignal from '../TabBarSignal';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import HomePage from './templates/HomePage';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class CenterWindow extends PureComponent {
  constructor(){
    super();
    this.state = {
      tabs: [
        {
          title: "首页",
          closable: false,
          content: <HomePage/>
        }
      ],
      selectedIndex: 0
    };
    TabBarSignal.signalHandler.add(this.addTabListener.bind(this));
  }

  addTabListener(newTab) {
    let index = this.state.tabs.length;
    this.setState({
      tabs: this.state.tabs.concat(newTab),
      selectedIndex: index
    })
  }

  remove = (key, e) => {
    e.stopPropagation();
    let foundIndex = 0;
    const after = this.state.tabs.filter((t, i) => {
      if(i !== key){
        return true;
      }
      foundIndex = i;
      return false;
    });
    let selectedIndex = this.state.selectedIndex;
    if(foundIndex === selectedIndex){
      selectedIndex = foundIndex - 1;
    }else if(foundIndex < selectedIndex){
      selectedIndex -= 1;
    }

    this.setState({
      tabs: after,
      selectedIndex: selectedIndex
    });
  };

  titleFactory(){
    return(
      this.state.tabs.map((t, idx) => {
        let tabBarStyle, tabTitleStyle;
        if(t.closable){
          tabBarStyle = "tab-title-bar";
          tabTitleStyle = "tab-title-close";
        } else{
          tabBarStyle = "tab-title-bar tab-title-bar-unclose";
          tabTitleStyle = "tab-title-unclose";
        }
        return (
          <Tab className={tabBarStyle} key={idx} >
            <span className="tab-title-span">
              {t.title}
              <a className={tabTitleStyle} onClick={this.remove.bind(this, idx)} onMouseDown={(e) =>{e.preventDefault()}}> </a>
            </span>
          </Tab>
        )
      })
    )
  }

  contentFactory() {
    return(
      this.state.tabs.map((t, idx) => {
        return (
          <TabPanel key={idx}>
            {t.content}
          </TabPanel>
        )
      })
    )
  }
  handleSelect = (index) => {
    this.setState({
      selectedIndex: index
    })
  };

  render(){
    return (
      <Tabs selectedTabClassName="tab-title-selected" selectedIndex={this.state.selectedIndex} onSelect={this.handleSelect}>
        <TabList className="tab-bar">
          {this.titleFactory()}
        </TabList>
        {this.contentFactory()}
      </Tabs>
    );
  }
}

export default CenterWindow;