import React from 'react';
import "./materialize.css"

const Movie = ({ details }) => {
  if (details.Response === "False") {
    return <p> Movie Not Found </p>
  }
  return (
    <div className="container">
      {(details.Poster !== "N/A") ? <img alt="Poster" src={details.Poster} id="image" /> : console.log("Image Not Found")}
      <h4> {details.Title}</h4>
      <p> {details.Actors} </p>
    </div>
  )
}

class App extends React.Component {

  state = {
    MovieName: "",
    value: 1996,
    MovieDetails: {}
  }
  getMovieName = (e) => {
    this.setState({
      MovieName: e.target.value
    })
  }
  sendName = (e) => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?t=${this.state.MovieName}&y=${this.state.value}&apikey=${process.env.REACT_APP_API_KEY}`)
      .then(d => d.json())
      .then(response => {
        console.log(response)
        this.setState({ MovieDetails: response })
      })
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }
  render() {
    return (
      <div className="container">
        <h2> Movie App </h2>
        <br />
        <div className="row">
          <div className="col m6">
            <input type="text" placeholder="Enter the name of the Movie" onChange={this.getMovieName} required />
            <br />
            <input
              id="typeinp"
              type="range"
              min="1996" max="2019"
              value={this.state.value}
              onChange={this.handleChange}
              step="1" />
            <br />
            <p> Year : {this.state.value} </p>
            <br />
            <button className="waves-effect waves-light btn red" onClick={this.sendName}> submit </button>
          </div>
          
          <br />
          <div className="col m6" id="MovieDetails">
            {
              this.isEmpty(this.state.MovieDetails)
                ? <p> Select the movie </p>
                :
                <Movie details={this.state.MovieDetails} />
            }
          </div>
        </div>
      </div>

    );
  }

}

export default App;
