import React, { PureComponent } from 'react';
import 'rc-tree/assets/index.css';
import '../style/main.css';
import Tree, { TreeNode } from 'rc-tree';
import cssAnimation from 'css-animation';

function animate(node, show, done) {
  let height = node.offsetHeight;
  return cssAnimation(node, 'collapse', {
    start() {
      if (!show) {
        node.style.height = `${node.offsetHeight}px`;
      } else {
        height = node.offsetHeight;
        node.style.height = 0;
      }
    },
    active() {
      node.style.height = `${show ? height : 0}px`;
    },
    end() {
      node.style.height = '';
      done();
    },
  });
}

const animation = {
  enter(node, done) {
    return animate(node, true, done);
  },
  leave(node, done) {
    return animate(node, false, done);
  },
  appear(node, done) {
    return animate(node, true, done);
  },
};

const dbInfo = {
  info: [
     {
      title: "用户库",
      children: [
        {
          title: "db1",
          children: [
            {
              title: "表",
              children: [
                {
                  title: "t1",
                  children: [
                    {
                      title: "字段",
                      children: ["c1 tinyint(4)", "c2 int(11)", "c3 varchar(32)"]
                    },
                    {
                      title: "索引",
                      children: ["c1 (c1)", "cc (c3)", "PRIMARY (c2)"]
                    }
                  ]
                },
                {
                  title: "t2",
                  children: [
                    {
                      title: "字段",
                      children: ["c1 varchar(32)", "c2 smallint(6)", "c3 tinyint(1)"]
                    },
                    {
                      title: "索引",
                      children: ["PRIMARY (c1,c2,c3)"]
                    }
                  ]
                }
              ]
            },
            {
              title: "视图",
              children: []
            }
          ]
        }
      ]
    },
    {
      title: "系统库",
      children: [
        {
          title: "information_schema",
          children: ["CHARACTER_SETS", "COLLATIONS", "SCHEMATA", "VIEWS"]
        },
        {
          title: "oceanbase",
          children: ["__all_dummy", "gv$latch", "gv$sql"]
        },
        {
          title: "mysql",
          children: ["db", "user"]
        }
      ]
    }
  ]
};
const commonIconStyle = "tree-icon ";
const userDBIconStyle = ["tree-folder tree-icon-user_database tree-folder-open", "tree-folder tree-icon-database_name", "tree-folder tree-icon-table",
  "tree-folder tree-icon-table_name", "tree-folder tree-icon-column", "tree-file tree-icon-column_name"];
const indexIconStyle = "tree-folder tree-icon-index";
const indexNameIconStyel = "tree-file tree-icon-index_name";
const viewIconStyle = "tree-folder tree-icon-view";
const systemDBIconStyle = ["tree-folder tree-icon-user_database tree-folder-open", "tree-folder tree-icon-database_name", "tree-folder tree-icon-table_name"];

class TablesInfo extends PureComponent {
  constructTree = (data, depth, parentKey, isSystem, fromIndex = false) => data.map((item, idx) => {
    let title, iconStyles, titleStyle, key;
    key = parentKey + "-" + idx;
    if(isSystem){
      if(item.children){
        title = item.title + "(" + item.children.length + ")";
      }else{
        title = item;
      }
      iconStyles = commonIconStyle + systemDBIconStyle[depth];
      titleStyle = (
        <div>
          <span className={iconStyles}> </span>
          <span className="tree-title">{title}</span>
        </div>
      );
      if(item.children) {
        return (
          <TreeNode title={titleStyle} key={key}>
            {this.constructTree(item.children, depth + 1, key, true)}
          </TreeNode>
        )
      }else{
        return <TreeNode title={titleStyle} key={key} />
      }
    }else{
      if(item.children){
        if(depth === 1 || depth === 3) {
          title = item.title;
        }else{
          title = item.title + "(" + item.children.length + ")";
        }
        title = (<span className="tree-title">{title}</span>);
      }else{
        let tmp = item.split(' ');
        title = (<span className="tree-title"><b>{tmp[0]}</b>{" "+tmp[1]}</span>);
      }

      if(depth === 2 && item.title === "视图"){
        iconStyles = commonIconStyle + viewIconStyle;
      } else if(depth === 4 && item.title === "索引"){
        iconStyles = commonIconStyle + indexIconStyle;
        fromIndex = true;
      } else if(depth === 5 && fromIndex){
        iconStyles = commonIconStyle + indexNameIconStyel;
        if (item.split(' ')[0] === "PRIMARY"){
          iconStyles += " primary";
        }
      } else{
        iconStyles = commonIconStyle + userDBIconStyle[depth];
      }
      titleStyle = (
        <div>
          <span className={iconStyles}> </span>
          {title}
        </div>
      );

      if(item.children) {
        return (
          <TreeNode title={titleStyle} key={key}>
            {this.constructTree(item.children, depth + 1, key, false, fromIndex)}
          </TreeNode>
        )
      }else{
        return <TreeNode title={titleStyle} key={key} />
      }
    }
  });

  render() {
    let topTitleStyle = (
      <div>
        <span className= {"tree-icon tree-folder tree-folder-open tree-icon-database"}> </span>
        <span className="tree-title">数据库</span>
      </div>
    );

    return (
      <Tree
        showLine
        showIcon={false}
        openAnimation={animation}
        defaultExpandedKeys = {["0"]}
      >
        <TreeNode title={topTitleStyle} key="0">
          {this.constructTree([dbInfo.info[0]], 0, "0-0", false)}
          {this.constructTree([dbInfo.info[1]], 0, "0-1", true)}
        </TreeNode>
      </Tree>
    );
  }
}
export default TablesInfo;
