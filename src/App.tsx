import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "@pages";
import { BinaryDiagram } from "@modules";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    children: [
      {
        path: "docs",
      },
      {
        path: "binary-decision-diagram",
        element: <BinaryDiagram />,
      },
      {
        path: "neural-network-architecture",
      },
      {
        path: "confusion-matrix",
      },
      {
        path: "receiver-operation-characterics-curve",
      },
      {
        path: "roc-curve",
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
