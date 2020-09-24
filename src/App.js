import React from "react";

import Home from "./pages/Home.js";

import { AlbumDetails, AlbumEdit, AlbumNew, Albums } from "./pages/albums";
import { PhotoDetails, PhotoEdit, PhotoNew, Photos } from "./pages/photos";

import NotFound from "./pages/NotFound.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./layout/Layout.js";
import "./App.scss";

function App(props) {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/albums" component={Albums} />
          <Route exact path="/albums/new" component={AlbumNew} />
          <Route exact path="/albums/:albumId" component={AlbumDetails} />
          <Route exact path="/albums/:albumId/edit" component={AlbumEdit} />

          <Route exact path="/photos" component={Photos} />
          <Route exact path="/photos/new" component={PhotoNew} />
          <Route exact path="/photos/:photoId" component={PhotoDetails} />
          <Route exact path="/photos/:photoId/edit" component={PhotoEdit} />

          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
