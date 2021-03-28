import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import {createPost} from "../store/postAction";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {IPost} from "../interfaces";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: 600,
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  space: {
    marginTop: '100px',
  },
  body: {
    width: '100%',
  },
  title: {
    width: '100%'
  },
  button: {
    margin: '0 auto'
  }
}));

interface PostFormProps {
  click?: (data: any) => void,
  btnText?: string,
  postInfo: any,
}

const PostForm: React.FC<PostFormProps> = ({click,postInfo, btnText}) => {
  const classes = useStyles();
  const classNames = [classes.root];
  if(!click) {
    classNames.push(classes.space);
  }
  const [form, setForm] = useState<any>({
    title: postInfo?.title || '',
    body:  postInfo?.body || '',
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm((prev: any) => ({
      ...prev,
        [e.target.name] : e.target.value,
    }));
  }
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) {
      return;
    }
    const post: IPost = {
      ...form,
      userId: 1,
    };
    if (!!click) {
     return click({...form});
    }
    dispatch(createPost(post));
    history.push('/');
  }
  return (
    <form className={classNames.join(' ')}
          noValidate autoComplete="off"
          onSubmit={submit}>
      <TextField name="title"
                 label="title"
                 value={form.title}
                 onChange={inputChangeHandler}
                 className={classes.title} />
      <TextField name="body"
                 label="body"
                 value={form.body}
                 onChange={inputChangeHandler}
                 className={classes.body} />
      <Button className={classes.button}
              variant="outlined"
              type="submit"
              color="primary">
        {btnText || 'Add'}
      </Button>
    </form>
  );
}
export default PostForm;
