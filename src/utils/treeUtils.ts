import { CSVRowData } from "@/types";
import { RawNodeDatum } from "react-d3-tree";

/** Function to create a new node
 * @param name: The name of the node
 * @param attributes: The attributes of the node
 * @returns The created tree node
 */
const createNode = (name: string, attributes = {}): RawNodeDatum => ({
  name,
  attributes: {
    picture: '',
    materialType: '',
    quantity: '',
    totalWeight: '',
    materialCode: '',
    ...attributes, // Merge provided attributes with default attributes
  },
  children: [], // Initialize children as an empty array
});

/** Function to create a new tree object out of CSV rows
 * @param rows: The rows of CSV data as an array
 * @param fileName: File name of the CSV file
 * @returns The whole tree object
 */
export const processRows = (
  rows: CSVRowData[],
  fileName: string
): RawNodeDatum => {
  const tree: RawNodeDatum = {
    name: fileName,
    children: [],
    attributes: {},
  };

  const addRowToTree = (tree: RawNodeDatum, row: CSVRowData) => {
    let currentNode = tree;
    const rootLevels = 4;

    for (let level = 0; level <= rootLevels; level++) {
      const part = row[`Part Level ${String(level)}` as keyof CSVRowData].trim();

      if (!part) break; // If the part level is empty, stop

      let childNode = currentNode.children?.find(child => child.name === part);

      if (!childNode) {
        const nextPart = row[`Part Level ${String(level + 1)}` as keyof CSVRowData];
        const isLastLevel = !nextPart;

        // Add attributes to this node if it's the last level given
        const attributes = isLastLevel
          ? {
              picture: row.Picture,
              materialType: row["Material Type(s)"],
              quantity: row["Quantity of Parts"],
              totalWeight: row["Total Weight (kg)"],
              materialCode: row["Material Code(s)"],
            }
          : {};

        // Create a new child node and push it to the current node's children
        childNode = createNode(part, attributes);
        if (!currentNode.children) currentNode.children = [];
        currentNode.children.push(childNode);
      }

      // Move to the next sub level
      currentNode = childNode;
    }
  };

  rows.forEach((row) => {
    addRowToTree(tree, row);
  });

  return tree;
};