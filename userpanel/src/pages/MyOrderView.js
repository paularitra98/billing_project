import {useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";

function MyOrderView(props){

   let [uid,setUid]=useState('');
   let [orders,setOrder]=useState([]);

   useEffect(()=>{
    getmyorder();
  },[uid]);

  async function getmyorder(){
    if(props.uid!=0){
      var fd=new FormData();
      fd.append('uid',props.uid);
      var resp=await fetch('http://localhost:2600/order/selo',{
        method:'POST',
        body:fd
      });
      var data=await resp.json();
      setOrder(data);
      console.log(data);

    }
  }


    return(
        <>
            <div className="container">
                <h1>My Order History list </h1>
                <table class="table table-striped">
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Product image</th>
        <th>product name</th>
        <th>product price</th>
        <th>product quatity</th>
        <th>total</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((p)=>
      <tr key={p.id}>
        <td>#{p.orderid}</td>
        <td><img className="imgsize1" src={"http://localhost:2600/product_image/"+p.pimg}/></td>
        <td>{p.pname}</td>
        <td>{p.pprice}</td>
        <td>{p.qty}</td>
        <td>{p.total}</td>
        
        
      </tr>
     )}
    </tbody>
  </table>
            </div>
        </>
    )

}
export default MyOrderView;
