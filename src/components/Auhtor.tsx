import React from 'react';
import {MenuItem, MenuList} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";
import {IAuthor, IState} from "../interfaces";
import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  title: {
    color: '#B3BDCC',
    paddingTop: '20px',
    paddingLeft: '10px',
  },
  moviesTitle: {
    color: '#B3BDCC',
  },
  item: {
    backgroundColor: 'transparent !important',
    '&:hover': {
      color: '#FFD814',
      backgroundColor: 'rgba(255, 255, 255, 0.08) !important'
    },
  },
}));

interface AuthorProps {
  authors: IAuthor[],
}

const Author: React.FC<AuthorProps> = ({authors}) => {
  const classes = useStyles();
  const history = useHistory();
  const loading = useSelector((state: IState) => state.authorLoading);
  const getPosts = (id: string) => {
    history.push('/author/' + id + '/posts')
  }
  return (
    <MenuList className={classes.title}>
      {
        (loading ? Array.from(new Array(15)) : authors).map((author, index) => {
          return author ? <MenuItem
              key={author.id}
              onClick={() => getPosts(author.id)}
              className={classes.item}
            >
              {author.username}
            </MenuItem> :
            <Skeleton key={index}>
              <MenuItem
                className={classes.item}>
                loadingSpinner
              </MenuItem>
            </Skeleton>
        })
      }
    </MenuList>
  );
};

export default Author;
