import Signal from 'signals';

let signalHandler = new Signal();

let addTab = (contentModule, tabBarName) => {
  if(contentModule === undefined){
    return;
  }
  let data = {
    closable: true,
    title: tabBarName,
    content: contentModule
  };
  signalHandler.dispatch(data);
};

let TabBarSignal = {
  signalHandler,
  addTab
};
export default TabBarSignal;