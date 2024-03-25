import {useBooksContext} from "../../../context/books-context";
import GenreButton from "./sidebar-genre-button";
import { Form } from "react-bootstrap";
const Sidebar = () =>{

    const{
        genres,
        selectedGenres,
        setSelectedGenres,
        availableOnly,
        setAvailableOnly
    } = useBooksContext();

    function toggleGenre(genre) {
        const updatedGenres = selectedGenres.some((g) => g.id === genre.id)
            ? selectedGenres.filter((g) => g.id !== genre.id)
            : [...selectedGenres, genre];
        setSelectedGenres(updatedGenres);
    }

    const handleToggleSwitch = () => {
        setAvailableOnly(!availableOnly);
    };

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
            <Form.Check
                type="switch"
                id="toggle-switch"
                label={availableOnly ? "Show available only" : "Show all"}
                checked={availableOnly}
                onChange={handleToggleSwitch}
                style={{ marginLeft: "15px", marginBottom: "10px" }}
            />
        </div>
    );
};
export default Sidebar;