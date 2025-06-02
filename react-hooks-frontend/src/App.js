import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListMemberComponent from './components/ListMemberComponent';
import AddMemberComponent from './components/AddMemberComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className= "container">
          <Switch>
              <Route exact path = "/" component = {ListMemberComponent}></Route>
              <Route path = "/employees" component = {ListMemberComponent}></Route>
              <Route path = "/add-member" component = {AddMemberComponent} ></Route>
              <Route path = "/edit-member/:id" component = {AddMemberComponent}></Route>
            </Switch>
        </div>
        <FooterComponent />
        </Router>
    </div>
  );
}

export default App;
