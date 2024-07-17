import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-200">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/docs">Docs</Link>
                </li>
                <li>
                    <Link to="/binary-decision-diagram">BDD</Link>
                </li>
                <li>
                    <Link to="/neural-network-architecture">NNA</Link>
                </li>
                <li>
                    <Link to="/confusion-matrix">CM</Link>
                </li>
                <li>
                    <Link to="/receiver-operation-characterics-curve">ROC</Link>
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;