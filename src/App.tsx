import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Posts from "./containers/Posts";
import PostInfo from "./containers/PostInfo";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import PostForm from "./components/PostForm";

const App: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Posts}/>
        <Route exact path="/author/:id/posts" component={Posts}/>
        <Route exact path="/post/add" component={PostForm}/>
        <Route exact path="/post/:id/edit" component={PostForm}/>
        <Route exact path="/post/:postId" component={PostInfo}/>
        <Route component={NotFound}/>
      </Switch>
    </Layout>
  );
};

export default App;

