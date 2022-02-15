import {Link} from 'react-router-dom';
import {useEffect,useState} from 'react';


function Menu(){
    let[aname,setAname]=useState("");


    async function getuser(){
        var tk=localStorage.getItem("token");
        var res=await fetch("http://localhost:2600/admin/userdata",{
            headers : {
                'Authorization' : 'Bearer ' + tk
            }
        });
        var data=await res.json();
        console.log(data);

        if(data.msg == "access denied"){
            window.location='/';
        }
        else{
            setAname(data.name);
        }
    }

    useEffect(()=>{
        getuser();
    },[]);




    return(
        <div>
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

<a class="sidebar-brand d-flex align-items-center justify-content-center" to="/">
    <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
    </div>
    <div class="sidebar-brand-text mx-3">{aname}</div>
</a>

<hr class="sidebar-divider my-0" />

<li class="nav-item">
    <Link class="nav-link" to="/dashboard">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></Link>
</li>


<hr class="sidebar-divider my-0" />

<li class="nav-item">
    <Link class="nav-link" to="/add-category">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Add category</span></Link>
</li>


<hr class="sidebar-divider my-0" />


<li class="nav-item">
    <Link class="nav-link" to="/list-category">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>List category</span></Link>
</li>


<hr class="sidebar-divider my-0" />


<li class="nav-item">
    <Link class="nav-link" to="/add-product">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Add product</span></Link>
</li>

<hr class="sidebar-divider my-0" />


<li class="nav-item">
    <Link class="nav-link" to="/list-product">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>List product</span></Link>
</li>

<hr class="sidebar-divider my-0" />


<li class="nav-item">
    <Link class="nav-link" to="/order-view">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Track order list</span></Link>
</li>


<hr class="sidebar-divider d-none d-md-block"/>

<div class="text-center d-none d-md-inline">
    <button class="rounded-circle border-0" id="sidebarToggle"></button>
</div>

</ul>
        </div>
    );
}
export default Menu;