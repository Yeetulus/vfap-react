import {Outlet} from "react-router-dom";
import Toolbar from "../../member-toolbar";

export function HomePage() {

    return(
        <div className="app-body">
            <Toolbar></Toolbar>
            <Outlet></Outlet>
        </div>
    )
}