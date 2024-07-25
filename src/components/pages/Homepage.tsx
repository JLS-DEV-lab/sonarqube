import { Navbar } from "@modules";
import { Outlet } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

/*const Homepage = ({ children }: Readonly<Props>) => {
  return (
    <div className="h-full w-full flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children ?? <Outlet />}
      </main>
    </div>
  );
};*/

function Homepage () {
  return (
    <div>Homepage</div>
  )
}

export default Homepage;
