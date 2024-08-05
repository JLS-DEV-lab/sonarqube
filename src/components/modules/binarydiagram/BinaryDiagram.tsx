import React, { useState } from "react";
import Papa from "papaparse";
import Tree from "react-d3-tree";
import { CSVRowData, TreeNode } from "@/types";

/** Function to create a new node */
const createNode = (row: CSVRowData, level: number): TreeNode => ({
  name: row[`Part Level ${String(level)}` as keyof CSVRowData],
  attributes: {
    picture: row.Picture,
    materialType: row["Material Type(s)"],
    quantity: row["Quantity of Parts"],
    totalWeight: row["Total Weight (kg)"],
    materialCode: row["Material Code(s)"],
  },
  children: [],
});

/** Function to process rows and build the tree */
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

    for (let level = 0; level <= 4; level++) {
      const partLevel = row[`Part Level ${String(level)}` as keyof CSVRowData];
      console.log(`Processing level ${String(level)}: ${partLevel}`);

      if (!partLevel) break; // If the part level is empty, that's the correct level to stop

      let childNode = currentNode.children.find(
        (child) => child.name === partLevel
      );

      console.log(partLevel);

      if (childNode) {
        console.log(`Found existing node: ${childNode.name}`);
      } else {
        console.log(`Creating new node for: ${partLevel}`);
        childNode = createNode(row, level);
        currentNode.children.push(childNode);
      }

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
        console.error("Error parsing CSV:", error); //use a custom LOGGER instead
      },
    });
  };

  return (
    <div className="w-full h-full">
      <input type="file" name="file" accept=".csv" onChange={handleFileInput} />
      {treeData ? (
        <div id="treeWrapper" style={{ width: "100vw", height: "100vh" }}>
          <Tree data={treeData} />
        </div>
      ) : (
        <span>Only CSV files are supported</span>
      )}
    </div>
  );
};

export default BinaryDiagram;
