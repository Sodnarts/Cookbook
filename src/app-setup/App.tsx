import React from 'react';
import { BrowserRouter, Redirect, Link } from 'react-router-dom';
import { Header } from 'src/app-setup/header/Header';
import { ProgressBar } from 'src/app-setup/ProgressBar';
import { RouterComponent } from 'src/app-setup/Router';
import { routes } from 'src/common/routes/routes';

class AppBase extends React.Component<any> {


  public render() {
    return (
      <BrowserRouter>
        <Redirect to={routes.recipes.recipeList} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <img style={{ position: 'fixed', zIndex: -10, height: '100vh', width: '100vw', overflow: 'hidden', opacity: 0.35 }} src="./assets/background2.jpg" />
          <Header />
          <ProgressBar />
          <RouterComponent />
        </div>
      </BrowserRouter>
    );
  }
}

const App = AppBase;

export { App };
