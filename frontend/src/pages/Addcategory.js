import {useState,useEffect} from 'react';
import Menu from './include/Menu';
import Top from './include/Top';
import Footer from './include/Footer';

function Addcategory(){

   
	let [category,setCategory]=useState('');
    let [parent,setParent]=useState('0');
    let [cats,setCats]=useState([]);

    async function getp(){
        var res=await fetch("http://localhost:2600/category/selp");
        var data=await res.json();
        setCats(data);

        
    }

    useEffect(()=>{
        getp();
    },[])
    

    return(
       <div>
            <div id="wrapper">

<Menu/>

<div id="content-wrapper" class="d-flex flex-column">

    <div id="content">

  <Top/>

        <div class="container-fluid">

             <h1 class="h3 mb-4 text-gray-800">Add category page</h1> 

            <p>parent category</p>
  <p><select name="parent" onChange={(ev)=>{setParent(ev.target.value);}}>
	<option value="0">NO PARENT </option>
    {cats.map((c)=>
        <option value={c._id}>{c.category}</option>
    )}
	
</select></p>

  <p>  category name</p>
  <p><input type="text" value={category} onChange={(ev)=>{setCategory(ev.target.value);}}  /></p>




<p><input type="submit" className="btn btn-primary" onClick={async ()=>{
	var fd=new FormData();
	fd.append("category",category);
    fd.append("parent_id",parent);
	

	
	var resp=await fetch("http://localhost:2600/category/ins",{
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

export default Addcategory;