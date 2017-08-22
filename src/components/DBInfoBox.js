import React, { PureComponent } from 'react';
import '../style/main.css';
import Resizable from 'react-resizable-box';
import TablesInfo from './TablesInfo';
import CenterWindow from './CenterWindow';

const STYLE = `
.collapse {
  overflow: hidden;
  display: block;
}

.collapse-active {
  transition: height 0.2s ease-out;
}
`;

class DBInfoBox extends PureComponent{
  constructor(){
    super();
    this.state = {
      westHeaderDisplay: "block",
      westNarrowedDisplay: "none",
      westBoxWidth: "275px",
      lastWestBoxWidth: "275px",
      borderRightColor: "#fff",
      transDir: "transLeft",
      westHeaderWidth: "270px",
      westContentZIndex: 3,
      eastZIndex: 6
    }
  }


  enable = {
    top:false,
    right:true,
    bottom:false,
    left:false,
    topRight:false,
    bottomRight:false,
    bottomLeft:false,
    topLeft:false
  };

  narrowed = () => {
    this.setState({
      westHeaderDisplay: "none",
      westNarrowedDisplay: "block",
      westBoxWidth: "28px",
      transDir: "transRight"
    })
  };

  expanded = () => {
    this.setState({
      westHeaderDisplay: "block",
      westNarrowedDisplay: "none",
      westBoxWidth: this.state.lastWestBoxWidth,
      transDir: "transLeft"
    })
  };

  handleResizeStop = (event, direction, refToElement) => {
    let boxWidth = refToElement.style.width;
    let westHeaderWidth = (Number(boxWidth.substring(0, boxWidth.indexOf('p')))-5).toString() + "px";
    this.setState({
      westBoxWidth: refToElement.style.width,
      lastWestBoxWidth: refToElement.style.width,
      borderRightColor: "#fff",
      westHeaderWidth: westHeaderWidth,
      westContentZIndex: 3,
      eastZIndex: 6
    });
  };

  handleResize = () => {
    this.setState({
      borderRightColor: "#999",
      westContentZIndex: -10,
      eastZIndex: -9
    });
  };


  render(){
    return(
      <div style={{height: "100%"}}>
        <Resizable className="layout-west" enable={this.enable} width={275} height="100%"
                   style={{display: this.state.westHeaderDisplay, borderRightColor: this.state.borderRightColor}}
                   handlerStyles={{right: {cursor: "e-resize"}}} onResizeStop={this.handleResizeStop}
                   onResizeStart={this.handleResize} onResize={this.handleResize}>
           <div className="west-header" style={{width: this.state.westHeaderWidth, zIndex: this.state.westContentZIndex}}>
             <div className="west-header-title">对象列表</div>
             <div className="west-header-tool" onClick={this.narrowed}>
               <a className="layout-button-left"> </a>
             </div>
           </div>
          <div className="west-body" style={{zIndex: this.state.westContentZIndex}}>
            <style dangerouslySetInnerHTML={{ __html: STYLE }}/>
            <TablesInfo />
          </div>
        </Resizable>
        <div className="west-narrowed" style={{display: this.state.westNarrowedDisplay}} onClick={this.expanded}>
          <div className="west-header" style={{width: "26px"}}>
            <div className="west-header-title"> &nbsp;</div>
            <div className="west-header-tool">
              <a className="layout-button-right"> </a>
            </div>
          </div>
          <div className="west-body" style={{width: "26px"}}> </div>
        </div>
        <div className="layout-east" style={{left: this.state.westBoxWidth, zIndex: this.state.eastZIndex}}>
          <CenterWindow/>
        </div>
      </div>
    )
  }
}

export default DBInfoBox;