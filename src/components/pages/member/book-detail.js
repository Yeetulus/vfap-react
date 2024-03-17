import {useBooksContext} from "../../../context/books-context";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

export function BookDetail() {

    const { selectedBook, fetchSelectedBook } = useBooksContext();
    const { id } = useParams();

    useEffect(() => {
        if(!selectedBook || selectedBook.id.toString() === id){
            fetchSelectedBook(id);
        }
    }, [id]);

    return(
        <>
            {
                selectedBook? (
                    <>
                        <p>{selectedBook.title}</p>
                    </>
                ) :
                <p>
                    No book found
                </p>
            }
        </>
    )
}