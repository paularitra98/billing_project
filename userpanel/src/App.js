import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Switch,Route} from "react-router-dom"; 
import {useState,useEffect, createContext} from 'react';
import Home from './pages/Home.js';
import Cartview from './pages/Cartview.js';
import Navbar from './pages/include/Navbar';
import CheckoutView from './pages/CheckoutView';
import Orderview from './pages/Product_order';
import MyOrderView from './pages/MyOrderView';

const UserId=createContext(); 
function App() {

  let[uname,setUname]=useState("");
  let[uid,setUid]=useState("");

  async function getuser(){
    var tk=localStorage.getItem("token");
    var res=await fetch("http://localhost:2600/user/getuser",{
        headers : {
            'Authorization' : 'Bearer ' + tk
        }
    });
    var data=await res.json();
   

    if(data.msg == "access denied"){
      setUname("");
      setUid("");
    }
    else{
      
        setUname(data.name);
        setUid(data.id);
       
        
    }
    
}

useEffect(()=>{
    getuser();
    
},[uid]);

  return (
    <div>

<BrowserRouter>
<Navbar uname={uname} uid={uid}/>
<switch>
        <Route exact path="/" >
          <Home uname={uname} uid={uid}/>
          </Route>

          <Route exact path="/cart" >
            <UserId.Provider value={uid}>
          <Cartview />
          </UserId.Provider>
          </Route>

          <Route exact path="/checkout" >
        
            <CheckoutView uid={uid} />
            
            </Route>

            <Route exact path="/order" >
        
            <Orderview uid={uid} />
            
            </Route>

            <Route exact path="/myorder" >
        
        <MyOrderView uid={uid} />
        
        </Route>
</switch>

</BrowserRouter>

    </div>
  );
}

export default App;
export {UserId};