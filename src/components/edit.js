import React from 'react';
import axios from 'axios';

export class Edit extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangePoster = this.onChangePoster.bind(this);

        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }
    //Component didMount goes of to get details at server side localhost4000
    //Displays the record details within the edit button
    componentDidMount(){
        console.log("Load "+this.props.match.params.id);
        axios.get('http://localhost:4000/api/movies/' +this.props.match.params.id)
        .then((response) =>{
            this.setState({
                _id:response.data._id,
                Title:response.data.Title,
                Year:response.data.Year,
                Poster:response.data.Poster
            })   
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    onChangeTitle(e) {
        this.setState({
            Title: e.target.value
        });
    }

    onChangeYear(e) {
        this.setState({
            Year: e.target.value
        });
    }
    onChangePoster(e) {
        this.setState({
            Poster: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        alert("Movie: " + this.state.Title + " "
            + this.state.Year + " " +
            this.state.Poster);

            const newMovie ={
                Title:this.state.Title,
                Year:this.state.Year,
                Poster:this.state.Poster
            };

        
        //Put method that updates and edits the existing movie
        axios.put('http://localhost:4000/api/movies/'+this.state._id, newMovie)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));    

    }

    render() {
        return (
            <div className='App'>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Movie Title: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Title}
                            onChange={this.onChangeTitle}></input>
                    </div>
                    <div className="form-group">
                        <label>Add Movie Year: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Year}
                            onChange={this.onChangeYear}></input>
                    </div>
                    <div className='form-group'>
                        <label>Movies Poster: </label>
                        <textarea type='text'
                            className='form-control'
                            value={this.state.Poster}
                            onChange={this.onChangePoster}>
                        </textarea>
                    </div>


                    <div className="form-group">
                        <input type='submit'
                            value='Edit Movie'
                            className='btn btn-primary'></input>
                    </div>
                </form>
            </div>
        );
    }
}