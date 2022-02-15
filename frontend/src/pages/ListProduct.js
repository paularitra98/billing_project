import {useState,useEffect} from 'react';
import Menu from './include/Menu';
import Top from './include/Top';
import Footer from './include/Footer';

function ListProduct(){

    let [prods,setProds]=useState([]);

    useEffect(()=>{
        getprod();
    },[]);

    async function getprod(){
        var resp=await fetch("http://localhost:2600/product/list_prod");
        var data=await resp.json();
        setProds(data);
       
      }

    

    return(
       <div>
            <div id="wrapper">

<Menu/>

<div id="content-wrapper" class="d-flex flex-column">

    <div id="content">

  <Top/>

        <div class="container-fluid">

             <h1 class="h3 mb-4 text-gray-800">List Product page</h1> 

             <table class="table table-striped">
    <thead>
      <tr>
        <th>category name</th>
        <th>Product name</th>
        <th>product price</th>
        <th>product quantity</th>
        <th>product description</th>
        <th>product pictures</th>
        <th>delete</th>
        <th>edit</th>
      </tr>
    </thead>


    <tbody>
        {prods.map((p)=>
        <tr key={p._id}>
        <td>{p.category}</td>
        <td>{p.name}</td>
        <td>{p.price}</td>
        <td>{p.quantity}</td>
        <td>{p.description}</td>
        <td><img className="imgsize" src={"http://localhost:2600/product_image/"+p.pimg}/></td>
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

export default ListProduct;