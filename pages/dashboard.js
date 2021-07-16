import { LogOut } from "../utils";
import withAuth from "../utils/auth";

function Dashboard() {
  return (
    <div>
      <button onClick={LogOut}>TESTE</button>
    </div>
  );
}

export default withAuth(Dashboard)