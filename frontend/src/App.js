import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Switch,Route} from "react-router-dom"; 

import Dashboard from './pages/Dashboard.js';
import Addproduct from './pages/Addproduct.js';
import Addcategory from './pages/Addcategory.js';
import Listcategory from './pages/Listcategory.js';
import Listproduct from './pages/ListProduct.js';
import Loginpage from './pages/Loginpage.js';
import TrackOrderView from './pages/TrackOrderView';


function App() {
  return (
    <div>
      <BrowserRouter>


      <switch>
        <Route exact path="/Dashboard" component={Dashboard}/>
        <Route exact path="/add-product" component={Addproduct}/>
        <Route exact path="/list-category" component={Listcategory}/>
        <Route exact path="/add-category" component={Addcategory}/>
        <Route exact path="/list-product" component={Listproduct}/>
        <Route exact path="/order-view" component={TrackOrderView}/>
        <Route exact path="/" component={Loginpage}/>
      </switch>

      </BrowserRouter>
   
    </div>
  );
}

export default App;
