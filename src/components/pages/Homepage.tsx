import { TreeNode } from "@/types";
import { LOGGER } from "@/utils";
import { Navbar } from "@modules";
import { useState } from "react";
import { Outlet } from "react-router-dom";

//Default tree to showcase website functions
const defaultTree: TreeNode = {
  name: "Root",
  attributes: {
    "Material Code": "ROOT-001",
    "Color": "Black",
    "Quantity": 1,
    "Type": "Composite Material",
    "Size": 100,
    "Weight": 15.0,
    "Description": "This is the root component.",
  },
  children: [
    {
      name: "Child A",
      attributes: {
        "Material Code": "CH-A-002",
        "Color": "Red",
        "Quantity": 2,
        "Type": "Metal",
        "Size": 50,
        "Weight": 8.0,
        "Description": "This is child A component.",
      },
      children: [
        {
          name: "Child B",
          attributes: {
            "Material Code": "CH-B-003",
            "Color": "Blue",
            "Quantity": 4,
            "Type": "Plastic",
            "Size": 30,
            "Weight": 3.0,
            "Description": "This is child B component.",
          },
          children: [
            {
              name: "Child C",
              attributes: {
                "Material Code": "CH-C-004",
                "Color": "Green",
                "Quantity": 1,
                "Type": "Wood",
                "Size": 20,
                "Weight": 1.5,
                "Description": "This is child C component.",
              },
            },
          ],
        },
      ],
    },
    {
      name: "Child D",
      attributes: {
        "Material Code": "CH-D-005",
        "Color": "Yellow",
        "Quantity": 3,
        "Type": "Glass",
        "Size": 40,
        "Weight": 5.0,
        "Description": "This is child D component.",
      },
      children: [
        {
          name: "Child E",
          attributes: {
            "Material Code": "CH-E-006",
            "Color": "Purple",
            "Quantity": 2,
            "Type": "Ceramic",
            "Size": 25,
            "Weight": 2.0,
            "Description": "This is child E component.",
          },
        },
      ],
    },
  ],
};

interface Props {
  children?: React.ReactNode;
}

const Homepage = ({ children }: Readonly<Props>) => {
  const [binaryTree, setBinaryTreeState] = useState<TreeNode>(defaultTree);

  const setBinaryTree = (
    nodeDatum: TreeNode | null,
    attributeName?: string,
    value?: string
  ) => {
    if (nodeDatum && attributeName && value !== undefined) {
      const updateNode = (node: TreeNode): TreeNode => {
        if (node.name === nodeDatum.name) {
          return {
            ...node,
            attributes: {
              ...node.attributes,
              [attributeName]: value,
            },
          };
        }

        if (node.children) {
          return {
            ...node,
            children: node.children.map(updateNode),
          };
        }

        return node;
      };

      setBinaryTreeState((prevTree) => updateNode(prevTree));
    } else if (nodeDatum !== null) {
      // Full tree update with the new nodeDatum
      setBinaryTreeState(nodeDatum);
    } else {
      LOGGER.error("Invalid arguments or invalid action call for setBinaryTree");
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children ?? (
          <Outlet
            context={{
              binaryTree,
              setBinaryTree,
            }}
          />
        )}
      </main>
    </div>
  );
};

export default Homepage;