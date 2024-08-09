import { TreeNode } from "@/types";
import { Navbar } from "@modules";
import { useState } from "react";
import { RawNodeDatum } from "react-d3-tree";
import { Outlet } from "react-router-dom";

//Default tree to showcase website functions
const defaultTree: RawNodeDatum = {
  name: "Root",
  attributes: {
    "Picture": "https://your-image-url.com/root.png",
    "Material Type": "plastic material",
    "Quantity of Parts": "2",
    "Total Weight (kg)": "0.2",
    "Material Code (s)": "DUS-8943",
  },
  children: [
    {
      name: "A",
      attributes: {
        Picture: "https://your-image-url.com/a.png",
        materialType: "metal",
        quantity: "5",
        totalWeight: "1.0",
        materialCode: "MET-1234",
      },
      children: [
        {
          name: "B",
          attributes: {
            picture: "https://your-image-url.com/b.png",
            materialType: "wood",
            quantity: "10",
            TotalWeight: "3.0",
            materialCode: "WOD-5678",
          },
          children: [
            {
              name: "C",
              attributes: {
                picture: "https://your-image-url.com/c.png",
                materialType: "glass",
                quantity: "7",
                totalWeight: "2.5",
                materialCode: "GLS-9101",
              },
              children: [],
            },
            {
              name: "D",
              attributes: {
                picture: "https://your-image-url.com/d.png",
                materialType: "ceramic",
                quantity: "4",
                totalWeight: "1.2",
                materialCode: "CER-1121",
              },
              children: [],
            },
          ],
        },
        {
          name: "E",
          attributes: {
            picture: "https://your-image-url.com/e.png",
            materialType: "rubber",
            quantity: "8",
            totalWeight: "0.8",
            materialCode: "RUB-3141",
          },
          children: [],
        },
      ],
    },
  ],
};

interface Props {
  children?: React.ReactNode;
}

const Homepage = ({ children }: Readonly<Props>) => {

  /* References to child components */

  /* State variables */
  const [binaryTree, setBinaryTree] = useState<RawNodeDatum>(defaultTree);

  /* API Keys */

  /* Form data */

  return (
    <div className="h-full w-full flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children ?? <Outlet
        context={{
          /* Refs */

          /*State */
          binaryTree,
          setBinaryTree,

          /* API Keys */

          /* Form data */          
        }} />}
      </main>
    </div>
  );
};

export default Homepage;
