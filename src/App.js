import React, {Component} from 'react'
import Input from "./components/InputSearch/Input";
import FilmCard from "./components/FilmCard/FilmCard";
import {ApiService} from "./ApiService";
import {debounce} from "lodash";
import {Link} from 'react-router-dom'


class App extends Component {
    state = {
        movies: null
    };

    handleChange = debounce(async (text) => {
        const formattedSearch = text.replace(' ', '+');
        const movies = await ApiService.searchMovies(formattedSearch);
        await this.setState({ movies })
    }, 500);

    render() {
        return (
            <div className="main">
                <header>
                    <Input handleChange={this.handleChange} />
                </header>
                <section>
                    <div className="container">
                        <div className="row">
                            {
                                this.state.movies ?
                                    (this.state.movies.results.length) ?
                                        this.state.movies.results.map((movie, index) => {
                                            return (
                                                <Link key={movie.id} className="col-lg-4" to={`/films/${movie.id}`}>
                                                    <FilmCard
                                                        filmName={movie.title}
                                                        id={movie.id}
                                                        dateRelease={movie.release_date}
                                                        rating={movie.vote_average}
                                                        poster={movie.poster_path}
                                                    />
                                                </Link>
                                            )
                                        })
                                        : <div className="error col-12">Movie don't found, please try again</div>
                                    : null
                            }
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default App;
