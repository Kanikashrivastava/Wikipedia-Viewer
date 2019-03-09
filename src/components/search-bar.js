import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ArticleBox from './article-details'




const styles = theme => ({
    root: {
      width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
  });
  


const RESULT_URL = 'https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
// const Article_Page_URL  = "https://en.wikipedia.org/?curid=";



export class SearchBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            user_search : "",
            wikipedia_response: ""
        }

    }

    getResultInfo = () => {
        axios.get(`${RESULT_URL}${this.search.value}`)
     .then((response) => {
    //    console.log(response.data.query.pages);
       this.setState({
           wikipedia_response: response.data.query.pages
       })
     })
    .catch((error)=>{
       console.log(error);
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
        const {classes} = this.props;

        return (
            // <div>
            //     <div className="form-group">
            //         <input type="text" 
            //         className="form-control" 
            //         placeholder="Search here..."
            //         ref={input => (this.search = input)}
            //         onKeyPress={this.handleKeyPress}
            //         />
            //         <button onClick={this.inputHandler}>Submit</button>
            //     </div>
            //     <div>
            //         <ArticleBox wikipedia_response={this.state.wikipedia_response}/>
            //     </div>
            // </div>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Material-UI
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>


        );

    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(SearchBar);
