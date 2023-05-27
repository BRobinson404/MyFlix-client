export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            {/* Display the movie's image using the ImageURL */}
            <div>
                <img src={movie.ImageURL} />
            </div>

            {/* Display the movie's title */}
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>

            {/* Display the movie's description */}
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>

            {/* Display the movie's year */}
            <div>
                <span>Year: </span>
                <span>{movie.Year}</span>
            </div>

            {/* Display the movie's genre */}
            <div>
                <span>Genre: </span>
                <span>{movie.Genre}</span>
            </div>

            {/* Display the movie's director */}
            <div>
                <span>Director: </span>
                <span>{movie.Director}</span>
            </div>

            {/* Create a button for going back, calling the onBackClick function when clicked */}
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};