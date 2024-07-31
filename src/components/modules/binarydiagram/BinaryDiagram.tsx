import Tree from "react-d3-tree";

const imageGeneration = {
  name: "ImageGenerationJSON",
};

/*const orgChart = {
    name: 'CEO',
    children: [
      {
        name: 'Manager',
        attributes: {
          department: 'Production',
        },
        children: [
          {
            name: 'Foreman',
            attributes: {
              department: 'Fabrication',
            },
            children: [
              {
                name: 'Worker',
              },
            ],
          },
          {
            name: 'Foreman',
            attributes: {
              department: 'Assembly',
            },
            children: [
              {
                name: 'Worker',
              },
            ],
          },
        ],
      },
    ],
  };*/

const BinaryDiagram = () => {
  return (
    <div className="w-full h-full">
      <Tree data={imageGeneration} />
    </div>
  );
};

export default BinaryDiagram;
