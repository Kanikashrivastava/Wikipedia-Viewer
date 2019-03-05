import React from 'react';
import ArticleBox from './article-details'
import axios from 'axios';


const RESULT_URL = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=`;
const Article_Page_URL  = "https://en.wikipedia.org/?curid=";



export class SearchBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            user_search : "",
        }

    }

    getResultInfo = () => {
        axios.get(`${RESULT_URL}${this.search.value}`,{
            headers: {
                'Access-Control-Allow-Origin': '*',
              },
              proxy: {
                host: '104.236.174.88',
                port: 3128
              }
        })
        
        .then(({ response }) => {
            console.log(response);
        });
    }


    handleKeyPress = event => {
        var code = event.keyCode || event.which;
        if (code === 13) {
          this.inputHandler();
        }
      };
    

    inputHandler = () => {
        this.setState({ user_search: this.search.value});
        console.log(this.search.value);
        this.getResultInfo();
    }


    render () {
        return (
            <div>
                <div className="form-group">
                    <input type="text" 
                    className="form-control" 
                    placeholder="Search here..."
                    ref={input => (this.search = input)}
                    onKeyPress={this.handleKeyPress}
                    />
                    <button onClick={this.inputHandler}>Submit</button>
                </div>
                <div>
                    <ArticleBox/>
                </div>
            </div>
        );

    }
}

export default SearchBar;