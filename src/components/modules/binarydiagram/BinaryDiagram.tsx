import React, { useState } from "react";
import Papa from "papaparse";
import Tree from "react-d3-tree";
import { CSVRowData, TreeNode } from "@/types";
import LOGGER from "@utils/Logger";

/** Function to create a new node */
const createNode = (row: CSVRowData, level: number): TreeNode => ({
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

/** Function to process rows and build the tree, creates a new Tree object */
const processRows = (rows: CSVRowData[], fileName: string): TreeNode => {
  const tree: TreeNode = {
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

  const addRowToTree = (tree: TreeNode, row: CSVRowData) => {
    let currentNode = tree;
    // Number of root levels / part levels in excel sheets, including root level zero
    const rootLevels = 4;

    for (let level = 0; level <= rootLevels; level++) {
      const part =
        row[`Part Level ${String(level)}` as keyof CSVRowData].trim();

      if (!part) break; // If the part level is empty, that's the correct level to stop

      // Saves the predicate value if found and undefined otherwise
      let childNode = currentNode.children.find((child) => child.name === part);

      if (childNode) {
        LOGGER.info(`Found existing node: ${childNode.name}`);
      } else {
        // Create and push new node if no matching childnode was found
        childNode = createNode(row, level);
        currentNode.children.push(childNode);
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

const BinaryDiagram: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;

    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rows: CSVRowData[] = results.data as CSVRowData[]; //Array with all the rows, except header row
        const tree = processRows(rows, file.name);
        setTreeData(tree);
      },
      error: function (error) {
        LOGGER.info("Error occured while trying to parse CSV:", error); //use a custom LOGGER instead
      },
    });
  };

  const nodeSize = { x: 200, y: 200 };
  const seperation = { siblings: 2, nonSiblings: 1.5 };

  return (
    <div className="w-full h-full">
      <input type="file" name="file" accept=".csv" onChange={handleFileInput} />
      {treeData ? (
        <div id="treeWrapper" style={{ width: "100vw", height: "100vh" }}>
          <Tree
            data={treeData}
            rootNodeClassName="node__root"
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf"
            orientation="vertical"
            nodeSize={nodeSize}
            separation={seperation}
            translate={{ x: 100, y: 100 }}
            pathFunc="step"
          />
        </div>
      ) : (
        <span>Only CSV files are supported</span>
      )}
    </div>
  );
};

export default BinaryDiagram;
