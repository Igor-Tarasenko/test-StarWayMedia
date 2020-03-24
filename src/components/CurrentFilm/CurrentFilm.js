import React, {Component} from 'react'
import image from '../FilmCard/image-not-available.png'
import {ApiService} from "../../ApiService";
import PageNotFound from "./PageNotFound";


export default class CurrentFilm extends Component {
    state = {
        movie: null,
        isLoaded: true,
        isError: false,
        posterImg: null
    };

    async componentDidMount() {
        try {
            const { data } = await ApiService.getMovieById(this.props.match.params.id);
            this.setState({
                movie: data,
                posterImg: data.poster_path,
                isLoaded: !this.state.isLoaded
            })
        } catch(e) {
            console.log('Error during getting movie: ', e.message);
            this.setState({
                isLoaded: !this.state.isLoaded,
                isError: true
            })
        }
    }

    render () {
        if (this.state.isLoaded) {
            return <div>Loading...</div>
        } else if (this.state.isError) {
            return <PageNotFound />
        }
        const posterImg = this.state.posterImg ? `https://image.tmdb.org/t/p/w500${this.state.posterImg}` : image;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="currentFilmBlock">
                            <div className="filmCard row">
                                <div className="col-md-4 img-block">
                                    <img src={posterImg} alt="film_poster" className="poster"/>
                                </div>
                                <div className="col-md-8">
                                    <h2 className="title">{this.state.movie.original_title}</h2>
                                    <p className="description mr-block">{this.state.movie.overview}</p>
                                    <div className="flex-block mr-block">
                                        <p>Budget:</p>
                                        <p>{this.state.movie.budget} $</p>
                                    </div>
                                    <div className="flex-block mr-block">
                                        <p>Genre:</p>
                                        <p className="type-of-genre">{
                                            this.state.movie.genres.map((genre, index) => {
                                                return (
                                                    <span key={index}>{genre.name}</span>
                                                )
                                            })
                                        }</p>
                                    </div>
                                    <div className="flex-block mr-block">
                                        <p>Date release:</p>
                                        <p>{this.state.movie.release_date}</p>
                                    </div>
                                    <div className="flex-block mr-block">
                                        <p>Rating</p>
                                        <p>{this.state.movie.vote_average}</p>
                                    </div>
                                    <div className="flex-block mr-block">
                                        <p>Language:</p>
                                        <p>{this.state.movie.spoken_languages[0].name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}