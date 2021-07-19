import {LogOut, withAuth} from "../../utils";

function Dashboard() {
    return (
        <div>
            <button onClick={LogOut}>TESTE</button>
        </div>
    );
}

export default withAuth(Dashboard)
