import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {fade, makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {NavLink, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {InputBase} from "@material-ui/core";
import {toggleDrawer} from "../store/commonActions";
import {searchPost} from "../store/postAction";
import {searchComment} from "../store/commentAction";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logo: {
    color: '#B3BDCC',
    fontSize: '22px',
    letterSpacing: '7px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    marginRight: '20px',
    display: 'none',
    '&:hover': {
      color: '#FFD814',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  link: {
    color: '#B3BDCC',
    fontSize: '16px',
    letterSpacing: '7px',
    textDecoration: 'none',
    '&:hover': {
      color: '#FFD814',
    },
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
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '45ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const [input, setInput] = useState<string>('');
  const dispatch = useDispatch();
  const {postId}:any = useParams();
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(postId);
    if (postId) {
     return dispatch(searchComment(e.target.value));
    }
    dispatch(searchPost(e.target.value));
    setInput(e.target.value);
  }
  const clearInput = (): void => {
    setInput('');
  }
  const toggle = (): void => {
    dispatch(toggleDrawer());
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          onClick={toggle}
          aria-label="open drawer"
        >
          <MenuIcon/>
        </IconButton>
        <NavLink exact to="/" className={classes.logo}>
          Posts
        </NavLink>
        <NavLink exact to="/post/add" className={classes.link}>
          Add Post
        </NavLink>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon/>
          </div>
          <InputBase
            placeholder="Search…"
            value={input}
            onBlur={clearInput}
            onChange={inputChangeHandler}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <Typography className={classes.logo} variant="h6" noWrap/>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
