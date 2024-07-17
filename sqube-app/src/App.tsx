import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BinaryDecisionDiagram, ConfusionMatrix, Documentation, NeuralNetworkArchitecture, ReceiverOperationCharactericsCurve, WebsiteWrapper } from "@pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WebsiteWrapper />,
    children: [
      {
        path: "docs",
        element: <Documentation />,
      },
      {
        path: "binary-decision-diagram",
        element: <BinaryDecisionDiagram />,
      },
      {
        path: "neural-network-architecture",
        element: <NeuralNetworkArchitecture />,
      },
      {
        path: "confusion-matrix",
        element: <ConfusionMatrix />,
      },
      {
        path: "receiver-operation-characterics-curve",
        element: <ReceiverOperationCharactericsCurve />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
