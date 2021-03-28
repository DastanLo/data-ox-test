import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {IPost} from '../interfaces';
import {useParams} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 15,
  },
  shadow: {
    boxShadow: 'none',
  },
  title: {
    marginBottom: 10,
  }
});

interface PostProps extends IPost {
  hasShadow: boolean,
  btnText: string,
  click: () => void,
  edit: () => void,
  color: any,
}

const Post: React.FC<PostProps> = (
  {
    title,
    body,
    color,
    hasShadow,
    btnText,
    edit,
    click
  }) => {
  const classes = useStyles();
  const cardClass = [classes.root];
  const {postId}: any = useParams();
  if (!hasShadow) {
    cardClass.push(classes.shadow);
  }
  return (
    <Card className={cardClass.join(' ')}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={click} color={color} size="small">{btnText}</Button>
        {postId ?
          <Button onClick={edit} color="primary" size="small">
            Edit
          </Button> :
          null}
      </CardActions>
    </Card>
  );
};

export default Post;
