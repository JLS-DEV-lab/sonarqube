import Tree, { RawNodeDatum } from "react-d3-tree";
import { useCenteredTree } from "@/utils";
import { InputField } from "@/components/elements";
import { useOutletContext } from "react-router-dom";
import { BinaryTreeContext } from "@/types";

const BinaryDiagram: React.FC = () => {
  const [translate, containerRef] = useCenteredTree();
  const { binaryTree, setBinaryTree } = useOutletContext<BinaryTreeContext>();
  const nodeSize = { x: 600, y: 500 };
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
          <h1 className="text-lg text-[#5F249F] font-bold text-center uppercase mb-4">{nodeDatum.name}</h1>
          <table className="table-auto w-full">
            <tbody>
              {Object.entries(nodeDatum.attributes ?? {}).map(([key, value]) => (
                <tr key={key}>
                  <InputField
                    name={key}
                    title={key}
                    value={value}
                    required={true}
                    onChange={setBinaryTree(nodeDatum, key, value.toString())}
                  />
                </tr>
              ))}
              <tr>
                <td className="items-center">
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
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-green-600 rounded-md text-white outline-none float-right m-2"
                  >
                    Änderungen speichern
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 rounded-md text-white outline-none float-right m-2"
                  >
                    Neues Child Element
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
    <div className="w-full h-full">
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