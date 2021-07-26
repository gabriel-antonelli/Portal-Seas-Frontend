import {LogOut, withAuth} from "../../utils";
import Navbar from "../../components/navbar";

function Dashboard() {
    return (
            <div>
                <button onClick={LogOut}>Teste</button>
            </div>
    );
}

export default withAuth(Dashboard)
