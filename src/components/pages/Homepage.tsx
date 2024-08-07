import { TreeNode } from "@/types";
import { Navbar } from "@modules";
import { useState } from "react";
import { Outlet } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

const Homepage = ({ children }: Readonly<Props>) => {

  /* References to child components */

  /* State variables */
  const [binaryTree, setBinaryTree] = useState<TreeNode>();

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
