import {Outlet} from "react-router-dom";
import MemberToolbar from "../../member-components/member-toolbar";
import "../../../styles/global.scss"

export function HomePage() {

    return(
        <div className="app-body">
            <MemberToolbar></MemberToolbar>
            <Outlet></Outlet>
        </div>
    )
}