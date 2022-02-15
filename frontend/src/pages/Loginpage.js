import {useState,useEffect} from 'react';

function Loginpage(){

    // un : admin@gmail.com
    // pw : 12345

    let[email,setEmail]=useState('');
    let[password,setPassword]=useState('');
    let[iserror,setIserror]=useState(false);

    return(
    <div className="container">

        
        <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>

                                    {iserror?<div className="alert alert-danger"><strong>Error!</strong>Invalid Login</div>:''
                                    }
                                    

                                        <div className="form-group">
                                            <input type="email" name="email" className="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..." value={email} onChange={(ev)=>{setEmail(ev.target.value);}} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" name="password" className="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password" value={password} onChange={(ev)=>{setPassword(ev.target.value);}}/>
                                        </div>
                                     
                                      <p><input type="button" className="btn btn-primary form-control" value="login" onClick={ async ()=>{
                                          var fd=new FormData();
                                          fd.append("email",email);
                                          fd.append("password",password);
                                     
                                          var resp=await fetch("http://localhost:2600/admin/login_check",{
                                          method:'POST',
                                          body:fd,
                                          
                                      });
                                      var data=await resp.json();

                                    //   console.log(data);

                                    //  localStorage.setItem("token",data.jwttoken);
                                    // window.location="/dashboard";
                                    if(data.msg == "invalid login"){
                                        setIserror(true);
                                        localStorage.removeItem("token");
                                    }
                                    else{
                                        localStorage.setItem("token",data.jwttoken);
                                        window.location="/dashboard";
                                    }

                                      }}  /></p>
                                   
                                  
                                    
                                    
                                  
                                   
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
    );

}
export default Loginpage;