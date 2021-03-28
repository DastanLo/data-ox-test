import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {IComment, IState} from '../interfaces';
import {useSelector} from "react-redux";
import {Skeleton} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


interface CommentsProps {
  comments: IComment[],
}

const Comments: React.FC<CommentsProps> = ({comments}) => {
  const classes = useStyles();
  const loading = useSelector((state: IState) => state.commentLoading);
  return (
    <List className={classes.root}>
      {(loading ? Array.from(new Array(15)) : comments).map((comment, index) => {
        return comment ? <React.Fragment key={comment.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={comment.name}/>
            </ListItemAvatar>
            <ListItemText
              primary={comment.email}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {comment.name}
                  </Typography>
                  " - {comment.body}"
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li"/>
        </React.Fragment> :
          <Skeleton key={index} width="100%" height="100px"/>
      })}
    </List>
  );
}

export default Comments;
