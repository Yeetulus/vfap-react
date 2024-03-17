import { Button } from "react-bootstrap";
import "../../styles/global.scss";

const GenreButton = ({ genre, selectedGenres, toggleGenre }) => {

    const selected = selectedGenres.some((g) => g.id === genre.id);
    return (
        <Button
            variant={ selected? "primary" : "outline-light"}
            onClick={() => toggleGenre(genre)}
            className={`genre-button ${selected ? "genre-button-white-text" : "genre-button-black-text"}`}
        >
            <span>{genre.name}</span>
        </Button>
    );
};

export default GenreButton;