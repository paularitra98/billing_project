import {useState,useEffect} from 'react';
import Menu from './include/Menu';
import Top from './include/Top';
import Footer from './include/Footer';

function Listcategory(){

    let [cats,setCats]=useState([]);
	
    useEffect(()=>{
        getstd();
      },[]);
      
      async function getstd(){
        var resp=await fetch("http://localhost:2600/category/list_cat");
        var data=await resp.json();
        setCats(data);
       
      }

    

    return(
       <div>
            <div id="wrapper">

<Menu/>

<div id="content-wrapper" class="d-flex flex-column">

    <div id="content">

  <Top/>

        <div class="container-fluid">

             <h1 class="h3 mb-4 text-gray-800">List category page</h1> 

             <table class="table table-striped">
    <thead>
      <tr>
        <th>parent name</th>
        <th>category name</th>
        <th>delete</th>
        <th>edit</th>
      </tr>
    </thead>


    <tbody>
    {cats.map((c)=>
      <tr key={c._id}>
        <td>{c.parent}</td>
        <td>{c.category}</td>
        <td></td>
        <td></td>
      </tr>
    )}
    </tbody>
  </table>


        </div>

    </div>

   <Footer/>

</div>

</div>

<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" href="login.html">Logout</a>
                </div>
            </div>
        </div>
    </div>

       </div>
    );


}

export default Listcategory;