import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Product_order(props) {
    let [orders, setOrders] = useState([]);
    let [shipping, setShipping] = useState({});
    let [uid, setUid] = useState("");

    useEffect(() => {
        getship();
        getorder();

    }, []);

    async function getorder() {



        if (props.uid != "") {
            var fd = new FormData();
            fd.append("urid", props.uid);

            var resp = await fetch("http://localhost:2600/cart/list_cart", {
                method: 'POST',
                body: fd
            });
            var data = await resp.json();
            setOrders(data);
        }

    }
    async function getship() {
        alert(props.uid)
        if (props.uid != "") {
            var fd = new FormData();
            fd.append("urid", props.uid);

            var resp = await fetch("http://localhost:2600/checkout/list_ship", {
                method: 'POST',
                body: fd
            });
            var data = await resp.json();
            console.log(data);
            setShipping(data);

        }
    }



    return (
        <div className="container">
            <h1>customer order preview page</h1>
            <div>
                <h1>product details</h1>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>product pictures</th>
                            <th>Product name</th>
                            <th>product price</th>
                            <th>product quantity</th>
                            <th> total price</th>

                        </tr>
                    </thead>

                    <tbody>

                        {orders.map((p) =>

                            <tr key={p.id}>
                                <td><img className="imgsize1" src={"http://localhost:2600/product_image/" + p.pimg} /></td>
                                <td>{p.pname}</td>
                                <td>{p.pprice}</td>
                                <td>{p.qty}</td>
                                <td>{p.total}</td>

                            </tr>

                        )}

                    </tbody>
                </table>

            </div>

            <div>
                <h1>Order shipping Addrress</h1>

                <div className="row">

                    <div className="col col-md-6">
                        <div>
                            <h2>Biiling Address details</h2>

                            <h4>Full Name</h4>
                            <p>{shipping.billing_name}</p>
                            <h4>Email Address</h4>
                            <p>{shipping.billing_email}</p>
                            <h4>Contact Number</h4>
                            <p>{shipping.billing_phone}</p>
                            <h4>Address</h4>
                            <p>{shipping.billing_address}</p>

                        </div>

                    </div>
                    <div className="col col-md-6">
                        <div>
                            <h2>Shipping Address details</h2>


                            <h4>Full Name</h4>
                            <p>{shipping.shipping_name}</p>
                            <h4>Email Address</h4>
                            <p>{shipping.shipping_email}</p>
                            <h4>Contact Number</h4>
                            <p>{shipping.shipping_phone}</p>
                            <h4>Address</h4>
                            <p>{shipping.shipping_address}</p>

                        </div>

                    </div>

                </div>

            </div>
                
            <p><input type="submit" className="btn btn-success"  value="click here to payment" onClick={async()=>{
                var fd=new FormData();
                fd.append("id",shipping._id);
                fd.append("cid",props.uid);

                var resp=await fetch("http://localhost:2600/order/inst",{
                    method:'POST',
                    body:fd
                    
                });
                    var data=await resp.json();
                        console.log(data);
            }} /> </p>

        </div>
    )

}
export default Product_order;