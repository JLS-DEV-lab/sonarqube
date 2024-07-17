import { Navbar } from "@modules";
import { Outlet } from "react-router-dom";

interface Props {
  children?: React.ReactElement;
}

const WebsiteWrapper = ({ children }: Readonly<Props>) => {
  return (
    <div>
      <Navbar />
      <main>
        {children ?? <Outlet />}
      </main>
    </div>
  );
};

export default WebsiteWrapper;
