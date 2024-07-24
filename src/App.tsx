import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "@pages";

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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
