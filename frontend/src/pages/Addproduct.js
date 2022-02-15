import {useState,useEffect} from 'react';
import Menu from './include/Menu';
import Top from './include/Top';
import Footer from './include/Footer';

function Addproduct(){

    let [cats,setCats]=useState([]);
    let [category,setCategory]=useState('');
	let [name,setName]=useState('');
    let [price,setPrice]=useState('');
    let [quantity,setQuantity]=useState('');
    let [description,setDescription]=useState('');
    let [pimg,setPimg]=useState(null);


    useEffect(()=>{
        getprod();
      },[]);


      async function getprod(){
        var resp=await fetch("http://localhost:2600/product/add_prod");
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

             <h1 class="h3 mb-4 text-gray-800">Add product page</h1> 


             <p>product category</p>
             
              <select name="category" onChange={(ev)=>{setCategory(ev.target.value);}}  class="form-control">
                <option value="">--select--</option>
                {cats.map((c)=>
                <optgroup label={c.parent}>
                 {c.category.map((cc)=>
                <option value={cc._id}>{cc.category}</option>
                )};
              </optgroup>
           )}
              
              </select>
             

            <p>Product name</p>
  <p><input type="text" value={name} onChange={(ev)=>{setName(ev.target.value);}}  /></p>

  <p>Product Price</p>
  <p><input type="number" value={price} onChange={(ev)=>{setPrice(ev.target.value);}}  /></p>

  <p>Product Quanity</p>
  <p><input type="number" value={quantity} onChange={(ev)=>{setQuantity(ev.target.value);}}  /></p>

  <p>Product Description</p>
  <p><input type="text" value={description} onChange={(ev)=>{setDescription(ev.target.value);}}  /></p>

<p>Product picture</p>
<p><input type="file" onChange={(ev)=>{setPimg(ev.target.files[0]);}} /></p>


<p><input type="submit" className="btn btn-primary" onClick={async ()=>{
	var fd=new FormData();
    fd.append("category",category);
	fd.append("name",name);
	fd.append("price",price);
    fd.append("quantity",quantity);
    fd.append("description",description);
	fd.append("pimg",pimg);

	
	var resp=await fetch("http://localhost:2600/product/ins_prod",{
	method:'POST',
	body:fd,
	
});
	var data=await resp.json();
		console.log(data);

}} value="save"  /> </p>


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

export default Addproduct;