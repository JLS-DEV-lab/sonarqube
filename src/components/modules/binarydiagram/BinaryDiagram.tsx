import Tree, { RawNodeDatum } from "react-d3-tree";
import { useCenteredTree } from "@/utils";
import { FileUpload, InputField } from "@/components/elements";
import { useOutletContext } from "react-router-dom";
import { BinaryTreeContext, TreeNode } from "@/types";

// Node attribute type mapping. Used to pass the correct types to InputField component. Assign the expected input types in this object.
const attributeTypeMapping: Record<keyof TreeNode["attributes"], string> = {
  "Material Code": "text",
  Color: "text",
  Quantity: "text",
  Type: "text",
  Size: "text",
  Weight: "text",
  Description: "textarea",
  Picture: "file",
};

const BinaryDiagram: React.FC = () => {
  const [translate, containerRef] = useCenteredTree();
  const { binaryTree, setBinaryTree } = useOutletContext<BinaryTreeContext>();
  const nodeSize = { x: 520, y: 650 };
  const separation = { siblings: 2, nonSiblings: 2 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };

  interface Props {
    nodeDatum: RawNodeDatum;
    toggleNode: () => void;
    foreignObjectProps: React.SVGProps<SVGForeignObjectElement>;
  }

  // Should be outsourced to a separate component
  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
  }: Props) => (
    <g>
      <circle r={15} fill="#5F249F" onClick={toggleNode} />
      <foreignObject {...foreignObjectProps}>
        <div className="relative width-[250px] height-[150px] bg-white opacity-90 rounded-lg p-4">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th
                  colSpan={2}
                  className="text-lg text-[#5F249F] font-bold text-center uppercase"
                >
                  {nodeDatum.name}
                </th>
              </tr>
            </thead>
            <tbody>
          {Object.entries(nodeDatum.attributes ?? {}).map(([key, value]) => (
            <tr key={key}>
              <td>
                <InputField
                  name={key}
                  title={key}
                  value={value}
                  required={true}
                  inputType={attributeTypeMapping[key as keyof TreeNode["attributes"]]} // We need to find a solution for csv files. We don't have a way to find/define specific attribute types yet.
                  /*onChange={(attributeName, newValue) => {
                    //setBinaryTree(nodeDatum, attributeName, newValue); //to update attributes in a custom node
                  }}*/
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2} className="items-center">
              <button
                type="button"
                className="flex items-center justify-center p-2 border border-gray-400 rounded-full bg-white text-gray-500 float-left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
          </table>
        </div>
      </foreignObject>
    </g>
  );

  return (
    <div className="relative w-full h-full">
      <div className="fixed z-50 ml-4 mt-8">
        <FileUpload
          id="file-upload"
          title="Upload your own binary tree"
        />
      </div>
      <div
        id="treeWrapper"
        style={{ width: "100vw", height: "100vh", background: "#eee" }}
        ref={containerRef}
      >
        <Tree
          data={binaryTree}
          translate={translate}
          nodeSize={nodeSize}
          separation={separation}
          orientation="vertical"
          pathFunc="step"
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
          }
        />
      </div>
    </div>
  );
};

export default BinaryDiagram;
