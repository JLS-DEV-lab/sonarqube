/** Structure of a Binary Tree */

/**
 *  Node attributes inspired by the database architecture.
 * attributes marked with '?' are optional attributes.
 */

interface NodeAttributes {
  "Material Code": string;
  "Color": string;
  "Quantity": number;
  "Type": string;
  "Size": number;
  "Weight": number;
  "Description": string;
  "Picture"?: string; //Blob;
}

export type TreeNode = {
  name: string;
  attributes: NodeAttributes;
  children?: TreeNode[];
};
