import { Navbar } from "@modules";
import { Outlet } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

const Homepage = ({ children }: Readonly<Props>) => {
  return (
    <div>
      <Navbar />
      <main>
        {children ?? <Outlet />}
      </main>
    </div>
  );
};

export default Homepage;
