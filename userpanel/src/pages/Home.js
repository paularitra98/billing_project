import {useState,useEffect} from 'react';


function Home(props){
  let [cats,setCats]=useState([]);
  let [prods,setProds]=useState([]);

  let [qty,setQty]=useState([]);

  let[uname,setUname]=useState("");
  let[uid,setUid]=useState("");



  useEffect(()=>{
    getcat();
  },[]);

  useEffect(()=>{
    getprod();
},[]);


  async function getcat(){
    var resp=await fetch("http://localhost:2600/product/add_prod");
    var data=await resp.json();
    setCats(data);
   
  }

  async function getprod(){
    var resp=await fetch("http://localhost:2600/product/list_prod");
    var data=await resp.json();
    setProds(data);
   
  }

return(
<div>
   <div className="container">
       <img src="images/banner.jpg" className="banner" />

   </div>

   <div className="container">
    <div class="row">
    <div class="col col-md-3">
        <h2>Category List</h2>
        <ul class="list-group">
        {cats.map((c)=>
  <li class="list-group-item list-group-item-action" data-toggle="collapse" data-target={"#demo"+c.id}>
    {c.parent}
  
  <div id={"demo"+c.id} class="collapse">
 <ul class="list-group">
 {c.category.map((cc)=>
   <li class="list-group-item">{cc.category}</li>
   )}
 </ul>
  </div>
  </li>
  )}
</ul>
    </div>

    <div class="col col-md-9">
    <h2>Product List</h2>
      <div class="row">

      {prods.map((p)=>
      <div class="col col-md-4">
        <div class="card cardsty" >
        <img className="imgisze" src={"http://localhost:2600/product_image/"+p.pimg}/>
  <div class="card-body">
    <h5 class="card-title">{p.name}</h5>
    <p class="card-text">{p.description}</p>
    <p class="card-text">Price : {p.price}</p>

    {props.uname?<p>Quanity : <input type="number" min="1" max="10" defaultValue="1" onChange={(ev)=>{setQty(ev.target.value);}} /></p>:''}

    {!props.uname?<a className="btn btn-success" data-toggle="modal" href="#loginModal">Login to Buy</a>:''}

      {props.uname?<input type="button" value="Add to cart" className="btn btn-danger" onClick={async ()=>{
        if(qty>=1){
          var fd=new FormData();
          fd.append("uid",props.uid);
          fd.append("qty",qty);
          fd.append("pid",p.id);
          fd.append("price",p.price);

          var resp=await fetch("http://localhost:2600/cart/ins",{
            method:'POST',
            body:fd
          });
          var data=await resp.json();
          console.log(data);

        }
        else{
          alert('invalid quantity');
        }

      }} />:''}


  </div>
</div>
        </div>
          )}

        

      

        

        

       

      </div>

    </div>

    
    </div>

   </div>

</div>
)

}

export default Home;