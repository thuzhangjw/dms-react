import React, { PureComponent } from 'react';
import '../style/main.css';

class VersionLogo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      detailShow: 'none'
    }
  }

  handleMouseOver = () => {
    this.setState({
        detailShow: 'block'
      })
  };

  handleMouseOut = () => {
    this.setState({
        detailShow: 'none'
      })
  };
  render() {
    return (
      <span className="version-logo"
            onMouseEnter={this.handleMouseOver}
            onMouseLeave={this.handleMouseOut}
      >
        <span className="logo-ob"> </span>
        <span className="version-title">
          <span className="product-name">OBAdmin</span>
          <span> </span>
          <span className="version-name"> for OceanBase</span>
          <span> </span>
          <span className="version-num">1.0</span>
        </span>
        <div className="version-detail" style={{display: this.state.detailShow}}>
          <div>
            <span className="version-date">版本更新时间：2017-07-27</span>
          </div>
          <div className="version-update">
            <div>
              <b>1、版本1.0: </b>
              <span>尚在开发中</span>
            </div>
            <div className="all-version-detail">
              <a href="/">查看历史版本更新</a>
            </div>
          </div>
        </div>
      </span>
    )
  }
}

export default VersionLogo;