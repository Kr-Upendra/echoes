import { Link } from "react-router-dom";
import appIcon from "../../assets/icons/app_icon.png";

export default function HeaderLogo() {
  return (
    <div className="mr-auto">
      <Link to="/">
        <img className="w-32" src={appIcon} />
      </Link>
    </div>
  );
}
