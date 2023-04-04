import { Link } from "react-router-dom";

interface Props {
  ifAny?: any;
}

const Breadcrumbs: React.FC<Props> = ({ ifAny }) => {
  return (
    <nav aria-label="breadcrumb">
      <ul className="breadcrumb-list flex">
        <li className="breadcrumb-item" aria-current="page">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {ifAny}
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
