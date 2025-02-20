import { IBaseExt } from "@/models";
import { TreeProps } from "antd";
import { DataNode } from "antd/es/tree";

export const listToTree = <IModel extends IBaseExt & {children?: IBaseExt[], key?: string}>(data: IModel[], title: keyof IModel, parentId: keyof IModel, id: keyof IModel = "id") 
:TreeProps["treeData"] => {
    const list = data?.map((item) => ({...item, children: []}))
    let map : Record<string, any>= {}
    let node: IModel
    let roots: TreeProps["treeData"]= []
    for (let i = 0; i < list.length; i += 1) {
        map[list[i][id] as any] = i; 
        list[i].children = []; 
    }
    for (let i = 0; i < list.length; i += 1) {
        node = list[i];
        const { children } = node
        if (node[parentId] !== null) {
            list[map[node[parentId] as any]]?.children?.push({ key: node[id], title: node[title], children } as any);
        } else {
            roots.push({ key: node[id], title: node[title] , children: children } as any);
        }
    }
    if(list.length && !roots.length)
      return list as any;
    return roots;
}

export const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
    let parentKey: React.Key;
    //truyền key lớp 1
    
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children?.length) {
        console.log(node.children);
        console.log(key);
        if (node.children.some((item) => item.key === key)) { //kiểm tra children keys có bằng key lớp 1 k => đéo thể xảy ra
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) { // nhảy vào đây => 
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey!;
  };