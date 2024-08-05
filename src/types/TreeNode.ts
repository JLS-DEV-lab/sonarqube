export type TreeNode = {
    name: string;
    attributes: {
      picture: string;
      materialType: string;
      quantity: string;
      totalWeight: string;
      materialCode: string;
    };
    children: TreeNode[];
  }