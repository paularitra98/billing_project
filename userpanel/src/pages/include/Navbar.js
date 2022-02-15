import {Link} from 'react-router-dom';
import {useEffect,useState} from 'react';

function Navbar(props){

  let[name,setName]=useState('');
  let[email,setEmail]=useState('');
  let[password,setPassword]=useState('');

  let[loginemail,setLoginEmail]=useState('');
    let[loginpassword,setLoginPassword]=useState('');
    let[iserror,setIserror]=useState(false);


    let[uname,setUname]=useState("");
    
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active m-2">
        <Link className="nav-link" to="/">Home </Link>
      </li>
    
      <li className="nav-item m-2">
        <Link className="nav-link" to="/cart">Cart</Link>
      </li>

      <li className="nav-item m-2">
        <Link className="nav-link" to="/myorder">My Order</Link>
      </li>

      {/* <li className="nav-item m-2">
        <Link className="nav-link" to="/checkout">Checkout</Link>
      </li> */}

      {/* <li className="nav-item m-2">
        <Link className="nav-link" to="/order">Order</Link>
      </li> */}
     

      

      {!props.uname?<li className="nav-item m-2">
        <a className="nav-link btn btn-success" data-toggle="modal" href="#loginModal">Login</a>
      </li>:''}
      {!props.uname?<li className="nav-item m-2">
        <a className="nav-link btn btn-primary" data-toggle="modal" href="#registerModal">Register</a>
      </li>:''}

      {props.uname?<li className="nav-item m-2">
        <a className="nav-link" >Welcome {props.uname}</a>
      </li>:''}
      {props.uname?<li className="nav-item m-2">
        <a className="nav-link btn btn-danger" onClick={()=>{ localStorage.removeItem("token");window.location='/';
      }} >Logout</a>
      </li>:''}
      
    </ul>
   
  </div>
</nav>


<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="registerModalLabel">Create a new account</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="container">
      <p>Full name</p>
      <p><input type="text" value={name} onChange={(ev)=>{setName(ev.target.value);}}  /></p>
      <p>Mail id</p>
      <p><input type="email" value={email}  onChange={(ev)=>{setEmail(ev.target.value);}} /></p>
      <p>Password</p>
      <p><input type="password" value={password} onChange={(ev)=>{setPassword(ev.target.value);}} /></p>

      <p><input type="submit" value="register" class="btn btn-primary" onClick={async ()=>{
        var fd=new FormData();
        fd.append("name",name);
        fd.append("email",email);
        fd.append("password",password);
        var resp=await fetch("http://localhost:2600/user/signup",{
          method:'POST',
          body:fd
        });
        var data=await resp.json();
        console.log(data);
      }} /></p>

      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>



<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="LoginModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="LoginModalLabel">Login to your account</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="container">
          <p>email address</p>
          <p><input type="email" value={loginemail} onChange={(ev)=>{setLoginEmail(ev.target.value);}}  /></p>
          <p>password</p>
          <p><input type="password" value={loginpassword} onChange={(ev)=>{setLoginPassword(ev.target.value);}} /></p>
          <p><input type="submit" class="btn btn-success" value="LOGIN" onClick={ async ()=>{
                                          var fd=new FormData();
                                          fd.append("email",loginemail);
                                          fd.append("password",loginpassword);
                                     
                                          var resp=await fetch("http://localhost:2600/user/userlogin",{
                                          method:'POST',
                                          body:fd
                                          
                                      });
                                      var data=await resp.json();

                                    console.log(data);
                                    if(data.msg == "invalid login"){
                                        setIserror(true);
                                        localStorage.removeItem("token");
                                    }
                                    else{
                                        localStorage.setItem("token",data.jwttoken);
                                        window.location="/";
                                    }

                                      }}   /></p>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>




        </div>
    )
}

export default Navbar;