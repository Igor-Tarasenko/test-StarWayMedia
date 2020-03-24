import React from 'react'
import image from './image-not-available.png'

const FilmCard = (props) => {
    let posterImg ="";
    if (props.poster == null) {
        posterImg = image;
    } else {
        posterImg = "https://image.tmdb.org/t/p/w200" + props.poster;
    }
    return (
        <div className="filmCardBlock">
            <div className="filmCard">
                <img src={posterImg} alt="film_poster" className="poster"/>
                <h2 className="title">{props.filmName}</h2>
                <div className="flex-block">
                    <div className="genre">
                        <p>date release:</p>
                        <p>{props.dateRelease}</p>
                    </div>
                    <div className="rating">
                        <p>rating</p>
                        <p>{props.rating}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default FilmCard;