import React, { useState } from "react";
import Papa from "papaparse";
import Tree from "react-d3-tree";
import { CSVRowData, TreeNode, BinaryTreeContext } from "@/types";
import { LOGGER, processRows } from "@/utils";
/** Example tree to showcase website functions */
const defaultTree: TreeNode = {
  name: "Root",
  attributes: {
    picture: "",
    materialType: "",
    quantity: "",
    totalWeight: "",
    materialCode: "",
  },
  children: [
    {
      name: "A",
      attributes: {
        picture: "",
        materialType: "",
        quantity: "",
        totalWeight: "",
        materialCode: "",
      },
      children: [
        {
          name: "B",
          attributes: {
            picture: "",
            materialType: "",
            quantity: "",
            totalWeight: "",
            materialCode: "",
          },
          children: [
            {
              name: "C",
              attributes: {
                picture: "",
                materialType: "",
                quantity: "",
                totalWeight: "",
                materialCode: "",
              },
              children: [],
            },
            {
              name: "D",
              attributes: {
                picture: "",
                materialType: "",
                quantity: "",
                totalWeight: "",
                materialCode: "",
              },
              children: [],
            },
          ],
        },
        {
          name: "E",
          attributes: {
            picture: "",
            materialType: "",
            quantity: "",
            totalWeight: "",
            materialCode: "",
          },
          children: [],
        },
      ],
    },
  ],
};


const BinaryDiagram: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNode>(defaultTree);

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
    </div>
  );
};

export default BinaryDiagram;
