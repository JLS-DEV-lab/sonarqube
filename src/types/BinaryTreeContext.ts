import { RawNodeDatum } from "react-d3-tree";

export type BinaryTreeContext = {
    /* Refs */

    /* State */
    binaryTree: RawNodeDatum;
    setBinaryTree: (nodeName: RawNodeDatum, attributeName: string, value: string) => {
        if (node.name === targetName) {
            node.attributes = { ...node.attributes, ...newAttributes };
          }
        
          if (node.children) {
            node.children = node.children.map(child => updateOrgChart(child, targetName, newAttributes));
          }
        
          return node;
    };

    /* API Keys */

    /* Form data */
};