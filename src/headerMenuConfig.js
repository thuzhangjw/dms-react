import React from 'react';
import NewTable from './components/templates/NewTable';
import NewView from './components/templates/NewView';
import SQLWindow from './components/templates/SQLWindow';
import CMDWindow from './components/templates/CMDWindow';
import ImportWindow from './components/templates/ImportWindow';
import InstanceSession from './components/templates/InstanceSession';

let headerMenuConfig = [
  {
    name: "新建",
    children: [
      {
        name: "表",
        tabBarName: "新建表",
        content: <NewTable/>
      },
      {
        name: "视图",
        tabBarName: "新增视图",
        content: <NewView/>
      }
    ]
  },
  {
    name: "SQL窗口",
    tabBarName: "SQL窗口",
    content: <SQLWindow/>
  },
  {
    name: "命令窗口",
    tabBarName: "命令窗口",
    content: <CMDWindow/>
  },
  {
    name: "导入窗口",
    tabBarName: "导入窗口",
    content: <ImportWindow/>
  },
  {
    name: "实例会话",
    tabBarName: "实例会话",
    content: <InstanceSession/>
  }
];

export default headerMenuConfig;