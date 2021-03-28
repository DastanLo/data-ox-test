import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory, useParams} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector} from 'react-redux';
import ErrorMessage from '../components/ErrorMessage';
import Author from "../components/Auhtor";
import DrawerLayout from "../components/DrawerLayout";
import Post from "../components/Post";
import {IState} from "../interfaces";
import {getAllPosts} from "../store/postAction";
import {getAuthorPosts, getAuthors} from "../store/authorActions";
import {Skeleton} from "@material-ui/lab";
import {getPagePosts, paginate} from "../store/commonActions";


const useStyles = makeStyles((theme) => ({
  mainTitle: {
    color: '#B3BDCC',
  },
  posts: {
    marginBottom: '40px',
  },
  pagination: {
    marginBottom: '30px',
    color: '#fff',
  },
  skeleton: {
    marginTop: -50,
  }
}));

const Posts: React.FC = () => {
  const classes = useStyles();
  const page = useSelector((state: IState) => state.currentPage);
  const posts = useSelector((state: IState) => state.posts);
  const pages = useSelector((state: IState) => state.allPosts);
  const error = useSelector((state: IState) => state.error);
  const loading = useSelector((state: IState) => state.loading);
  const authors = useSelector((state: IState) => state.authors);
  const {id} = useParams<any>();
  const history = useHistory();
  const dispatch = useDispatch();
  const pageChangeHandler = (e: any, value: number) => {
    dispatch(paginate(value));
  };

  const learnMore = (id: string): void => {
    history.push('/post/' + id);
  }


  useEffect(() => {
    dispatch(getPagePosts());
  }, [dispatch, page])

  useEffect(() => {
    if(id) {
      dispatch(getAuthorPosts(id));
    } else {
      dispatch(getAllPosts());
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAuthors());
  }, [dispatch])

  return (
    <DrawerLayout drawerContent={<Author authors={authors}/>}>
      {error ? <ErrorMessage error={error}/> : null}
      <Grid container justify="center" direction="column" spacing={2}>
        <Grid item>
          <Typography className={classes.mainTitle} variant="h5">
            {'Posts'}
          </Typography>
        </Grid>
        <Grid item className={classes.posts}>
          {
            !posts.length ? <Typography>
              No Post were found
            </Typography> : null
          }
          {
            (loading ? Array.from(new Array(15)) : posts).map((post, index) => {
              return post ? <Post btnText="Learn More"
                                  hasShadow={true}
                                  key={post.id}
                                  color="primary"
                                  click={() => learnMore(post.id)}
                                  {...post}/> :
                <Skeleton key={index}
                          animation="wave"
                          width="100%"
                          height="200px"
                          className={classes.skeleton}/>
            })
          }
        </Grid>
        <Grid container justify="center" className={classes.pagination}>
          {posts.length ?<Pagination onChange={pageChangeHandler} count={pages.length / 5} page={page}/> : null}
        </Grid>
      </Grid>
    </DrawerLayout>
  );
}

export default Posts;
