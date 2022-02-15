import {useState,useEffect} from 'react';
import { UserId } from '../App';
import {Link} from 'react-router-dom';

function Cartview(props){
  
    let [carts,setCarts]=useState([]);
    let [uid,setUid]=useState("");
    let [total,setTotal]=useState(0);

    useEffect(()=>{
        getcart();
      },[uid]);

      async function getcart(){

      
      if(uid!=""){
        var fd=new FormData();
        fd.append("urid",uid);

        var resp=await fetch("http://localhost:2600/cart/list_cart",{
            method:'POST',
            body:fd
          });
        var data=await resp.json();
        
        setCarts(data);
        var t=0;
        
        data.forEach(x => {
         t=Number(t)+Number(x.total);
          // console.log(t);
        });
        setTotal(t);
      }
      
       
      }


 

return(
<div>
  <UserId.Consumer>{
    (val)=>{
      setUid(val);
    }
}</UserId.Consumer>
   <div className="container">
       <img src="images/banner.jpg" className="banner" />

   </div>

   <div className="container">

    <h1><u>Cart Table </u></h1>

    <table class="table table-striped">
    <thead>
      <tr>
      <th>product pictures</th>
        <th>Product name</th>
        <th>product price</th>
        <th>product quantity</th>
        <th> total price</th>
        <th>delete</th>
     
      </tr>
    </thead>


    <tbody>
    {carts.map((p)=>
    
      <tr key={p.id}>
      <td><img className="imgsize1" src={"http://localhost:2600/product_image/"+p.pimg}/></td>
      <td>{p.pname}</td>
      <td>{p.pprice}</td>
      <td><input type="button" value="+" onClick={async ()=>{

        var qty=Number(p.qty)+1;
        var fd=new FormData();
        fd.append("qty",qty);
        fd.append("price",p.pprice);
        fd.append("id",p.id);
        var resp=await fetch("http://localhost:2600/cart/qtyupdate",{
          method:'POST',
          body:fd
        });
      var data=await resp.json();
      console.log(data);
      getcart();

      }} /> {p.qty} <input type="button" value="-" onClick={async ()=>{

        var qty=Number(p.qty)-1;
        var fd=new FormData();
        fd.append("qty",qty);
        fd.append("price",p.pprice);
        fd.append("id",p.id);
        var resp=await fetch("http://localhost:2600/cart/qtyupdate",{
          method:'POST',
          body:fd
        });
      var data=await resp.json();
      console.log(data);
      getcart();

      }} /></td>
      <td>{p.total}</td>
      <td>
      <button type="submit" className="btn btn-danger" onClick={async ()=>{
          if(window.confirm('are you sure to delete ?')){
          var fd=new FormData();
          fd.append("id",p.id);
          var resp=await fetch("http://localhost:2600/cart/del",{

            method:'POST',
            body:fd
          });
          var data=await resp.json();
          console.log(data);
          getcart();
         } }}>Remove</button>
      </td>
        </tr>

    )}
 
    <tr>
      
    <td colspan="4">Grand total : </td>
    <td colspan="2">{total}</td>
   </tr>
<tr>
   <Link to="/checkout" className="btn btn-success"  >CHECKOUT</Link>
</tr>
    </tbody>
    
  </table>

  

   </div>
  
</div>
)

}

export default Cartview;