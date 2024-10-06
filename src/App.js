import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ListCinemaComponent from './Components/ListCinemaComponent';
import SearchCinemaComponent from './Components/SearchCinemaComponent';
import AddUpdateCinemaComponent from './Components/AddUpdateCinemaComponent';


function App() {
  return (
    <div>
      <Router>
      <div className= "container">
        <Routes>
          <Route exact path = "/naacinema/cinemas" element = { <ListCinemaComponent /> }></Route>
          <Route path="/naacinema/cinemas/search-cinema" element = { <SearchCinemaComponent /> }></Route>
          <Route path="/naacinema/admin/add-cinema" element = { <AddUpdateCinemaComponent /> }></Route>
          <Route path="/naacinema/admin/update-cinema/:id" element = { <AddUpdateCinemaComponent /> }></Route>
        </Routes>
      </div>
      </Router>
</div>
);
}

export default App;