import {Outlet} from "react-router-dom";
import LibrarianToolbar from "../../librarian-components/librarian-toolbar";
import "../../../styles/global.scss";

export function LibrarianPage() {
    return(
        <div className={"app-body"}>
            <LibrarianToolbar/>
            <Outlet/>
        </div>
    )
}