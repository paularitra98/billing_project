import {useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";

function CheckoutView(props){

    const history = useHistory();

    let [bname,setBname]=useState("");
    let [bemail,setBemail]=useState("");
    let [bphone,setBphone]=useState("");
    let [baddress,setBaddress]=useState("");

    let [sname,setSname]=useState("");
    let [semail,setSemail]=useState("");
    let [sphone,setSphone]=useState("");
    let [saddress,setSaddress]=useState("");

  function ckall(ev){
      if(ev.target.checked==true){

        setSname(bname);
        setSemail(bemail);
        setSphone(bphone);
        setSaddress(baddress);

      }else{
        setSname("");
        setSemail("");
        setSphone("");
        setSaddress("");
      }
  }

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col col-md-6">
                        <div className="p-2">
                        <h2>Biiling Address</h2>
                        <p>Full Name</p>
                        <input type="text" className="form-control" value={bname} onChange={(ev)=>{setBname(ev.target.value);}} />
                        <p>Email Address</p>
                        <input type="email" className="form-control" value={bemail} onChange={(ev)=>{setBemail(ev.target.value);}}/>
                        <p>Contact Number</p>
                        <input type="number" className="form-control" value={bphone} onChange={(ev)=>{setBphone(ev.target.value);}}/>
                        <p>Address</p>
                        <textarea  className="form-control" value={baddress} onChange={(ev)=>{setBaddress(ev.target.value);}} ></textarea>
                      
                        </div>
                    </div>
                    <div className="col col-md-6">
                        <div className="p-2">
                            
                        <h2>Shipping Address</h2>

                        <p><input type="checkbox" value="" onChange={ckall} />same as a billing address</p>
                        <p>Full Name</p>
                        <input type="text" className="form-control" value={sname} onChange={(ev)=>{setSname(ev.target.value);}}/>
                        <p>Email Address</p>
                        <input type="email" className="form-control" value={semail} onChange={(ev)=>{setSemail(ev.target.value);}}/>
                        <p>Contact Number</p>
                        <input type="number" className="form-control" value={sphone} onChange={(ev)=>{setSphone(ev.target.value);}}/>
                        <p>Address</p>
                        <textarea className="form-control" value={saddress} onChange={(ev)=>{setSaddress(ev.target.value);}}></textarea>

                        </div>
                    </div>
                    <p><input type="submit" className="btn btn-primary" onClick={async ()=>{

                      //  alert(props.uid);
	var fd=new FormData();
	fd.append("cid",props.uid);
	fd.append("billing_name",bname);
    fd.append("billing_email",bemail);
    fd.append("billing_phone",bphone);
    fd.append("billing_address",baddress);
    fd.append("shipping_name",sname);
    fd.append("shipping_email",semail);
    fd.append("shipping_phone",sphone);
    fd.append("shipping_address",saddress);                   

	
	var resp=await fetch("http://localhost:2600/checkout/inst",{
	method:'POST',
	body:fd
	
});
	var data=await resp.json();
		console.log(data);
        history.push("/order");

}} value="save"  /> </p>
                </div>
            </div>
        </>
    )

}
export default CheckoutView;
