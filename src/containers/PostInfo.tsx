import React, {useEffect, useState} from 'react';
import Post from "../components/Post";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Comments from "../components/Comments";
import {useDispatch, useSelector} from "react-redux";
import {IPost, IState} from "../interfaces";
import {deletePost, editPost, getPostInfo} from "../store/postAction";
import {useHistory, useParams} from "react-router-dom";
import {getPostComments} from "../store/commentAction";
import { Skeleton } from '@material-ui/lab';
import PostModal from "../components/PostModal";
import PostForm from "../components/PostForm";
import ErrorMessage from "../components/ErrorMessage";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '100px'
  }
}));

const PostInfo: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [postInfo, setPostInfo] = useState<any>(null);
  const classes = useStyles();
  const post = useSelector((state: IState) => state.postInfo);
  const error = useSelector((state:IState) => state.error);
  const comments = useSelector((state: IState) => state.comments);
  const loading = useSelector((state: IState) => state.loading);
  const dispatch = useDispatch();
  const {postId}: any = useParams();
  const history = useHistory();
  const removePost = (): void => {
    history.push('/');
    dispatch(deletePost(+postId));
  }
  const handleOpen = () => {
    setOpen(true);
    setPostInfo(post);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const editHandler = (data: any) => {
    const updatedPost: IPost = {
      ...data,
      id: post.id,
      userId: post.userId,
    }
    history.push('/');
    dispatch(editPost(updatedPost));
  }
  useEffect(() => {
    dispatch(getPostInfo(postId));
    dispatch(getPostComments(postId));
  }, [postId, dispatch]);
  return (
    <Grid container justify="center" direction="column" className={classes.root}>
      <Grid item>
        {
          error ? <ErrorMessage error={error}/> : null
        }
        {
          loading ? <Skeleton width="100%" height="200px"/> :
            <Post hasShadow={false}
                  click={removePost}
                  color="secondary"
                  btnText="Delete"
                  edit={handleOpen}
                  {...post}/>
        }
      </Grid>
      <Grid item>
        <Comments comments={comments}/>
      </Grid>
      <PostModal open={open} close={handleClose}>
        <PostForm postInfo={postInfo} btnText="Edit" click={editHandler}/>
      </PostModal>
    </Grid>
  );
};

export default PostInfo;
