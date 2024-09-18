import { CSVRowData } from "@/types";
import LOGGER from "@utils/Logger";
import { RawNodeDatum } from "react-d3-tree";

/** Function to create a new node
 * @param row: The row data from the CSV file
 * @param level: The level of the node in the tree
 * @returns The created tree node
 */
const createNode = (row: CSVRowData, level: number): RawNodeDatum => ({
    name: row[`Part Level ${String(level)}` as keyof CSVRowData].trim(),
    attributes: {
      picture: row.Picture,
      materialType: row["Material Type(s)"],
      quantity: row["Quantity of Parts"],
      totalWeight: row["Total Weight (kg)"],
      materialCode: row["Material Code(s)"],
    },
    children: [],
  });

  /** Function to create a new tree object out of CSV rows
   * @param rows: The rows of CSV data as an array
   * @param fileName: File name of the CSV file
   * @returns The whole tree object
   */
  export const processRows = (rows: CSVRowData[], fileName: string): RawNodeDatum => {
    const tree: RawNodeDatum = {
      name: fileName,
      children: [],
      attributes: {
        picture: "",
        materialType: "",
        quantity: "",
        totalWeight: "",
        materialCode: "",
      },
    };
  
    const addRowToTree = (tree: RawNodeDatum, row: CSVRowData) => {
      let currentNode = tree;
      // Number of root levels / part levels in excel sheets, including root level zero
      const rootLevels = 4;
  
      for (let level = 0; level <= rootLevels; level++) {
        const part =
          row[`Part Level ${String(level)}` as keyof CSVRowData].trim();
  
        if (!part) break; // If the part level is empty, that's the correct level to stop
  
        // Saves the predicate value if found and undefined otherwise
        let childNode = currentNode.children?.find((child) => child.name === part);
  
        if (childNode) {
          LOGGER.info(`Found existing node: ${childNode.name}`);
        } else {
          // Create and push new node if no matching childnode was found
          childNode = createNode(row, level);
          currentNode.children?.push(childNode); // Why is undefined poss here?
        }
  
        // Move to the next level
        currentNode = childNode;
      }
    };
  
    rows.forEach((row) => {
      addRowToTree(tree, row);
    });
  
    return tree;
  };