import {Route, Routes} from "react-router-dom";
import {HomePage} from "../components/pages/member/home-page";
import {LibrarianPage} from "../components/pages/librarian/librarian-page";
import {AdminPage} from "../components/pages/admin-page";
import {LoginPage} from "../components/pages/login/login-page";
import {RegisterPage} from "../components/pages/login/register-page";
import {NotFoundPage} from "../components/pages/not-found-page";
import {LibraryGenres} from "../components/pages/librarian/library-genres";
import {LibraryCopies} from "../components/pages/librarian/library-copies";
import {LibraryBooks} from "../components/pages/librarian/library-books";
import {LibraryAuthors} from "../components/pages/librarian/library-authors";
import {LibraryLoans} from "../components/pages/librarian/library-loans";
import {BookSearch} from "../components/pages/member/book-search";
import {MemberReservations} from "../components/pages/member/member-reservations";
import {MemberLoans} from "../components/pages/member/member-loans";
import {BookDetail} from "../components/pages/member/book-detail";
import {BooksProvider} from "../context/books-context";
import {AuthProvider} from "../context/auth-context";
import {PrivateRoute} from "./private-route";
import {librarian} from "../utils/roles";

export function PageRouter() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<BooksProvider><HomePage/></BooksProvider>}>
                    <Route index element={<BookSearch/>}/>
                    <Route path=":id" element={<BookDetail/>}/>
                    <Route path="reservations" element={<MemberReservations/>}/>
                    <Route path="loans" element={<MemberLoans/>}/>
                </Route>
                <Route path="/librarian" element={
                    <PrivateRoute element={
                        <LibrarianPage/>
                    } requiredRole={librarian} />
                }>
                    <Route index element={<LibraryLoans/>}/>
                    <Route path="authors" element={<LibraryAuthors/>}/>
                    <Route path="books" element={<LibraryBooks/>}/>
                    <Route path="copies" element={<LibraryCopies/>}/>
                    <Route path="genres" element={<LibraryGenres/>}/>
                </Route>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </AuthProvider>
        );
}