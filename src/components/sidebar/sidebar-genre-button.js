import { Button } from "react-bootstrap";
import "./sidebar-genre-button.css";

const GenreButton = ({ genre, selectedGenres, toggleGenre }) => {

    const selected = selectedGenres.some((g) => g.id === genre.id);
    return (
        <Button
            variant={ selected? "primary" : "outline-light"}
            onClick={() => toggleGenre(genre)}
            className={`genre-button`}
        >
            <span className={selected? "genre-button-white-text" : "genre-button-black-text"}>{genre.name}</span>
        </Button>
    );
};

export default GenreButton;