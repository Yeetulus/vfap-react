import {useBooksContext} from "../../context/books-context";
import GenreButton from "./sidebar-genre-button";

const Sidebar = () =>{

    const{
        genres,
        selectedGenres,
        setSelectedGenres
    } = useBooksContext();

    function toggleGenre(genre) {
        const updatedGenres = selectedGenres.some((g) => g.id === genre.id)
            ? selectedGenres.filter((g) => g.id !== genre.id)
            : [...selectedGenres, genre];
        setSelectedGenres(updatedGenres);
    }


    return (
        <div>
            <p style={{ fontSize: "14pt", marginTop: "10px", marginLeft: "15px"}}>Genres</p>
            <hr style={{marginTop: "-5px"}}/>
            {genres?.map((genre, index) => (
                <GenreButton
                    key={index}
                    genre={genre}
                    selectedGenres={selectedGenres}
                    toggleGenre={toggleGenre}
                />
            ))}
            <hr/>

        </div>
    );
};
export default Sidebar;