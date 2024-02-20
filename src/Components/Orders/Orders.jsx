import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { WebController } from '../../ParentContext/Context';
// import { useLoaderData } from 'react-router-dom';

const Orders = () => {

    // const Orders = useLoaderData();
    // console.log(Orders);
    const {userInfo} = useContext(WebController)
    const [orders, setOrders] = useState([])

    useEffect(()=> {
        fetch(`http://localhost:3000/orders? email=${userInfo.email}`)
        .then(res => res.json())
        .then(data => setOrders (data))

    },[userInfo?.email])
    

    const handleDeleteOrder = (order)=>{
        const agree = window.confirm(`you are want to delete ${order.productName}`)
        if(agree){
            fetch(`http://localhost:3000/orders/${order._id}`,{
                method: "DELETE",

            })
            .then(res => res.json())
            .then(data =>{
               if(data.deletedCount >0){
                toast.success(`Your ${order.productName} is deleted `)
               }
            })
        }
    }
    return (
        <div className='my-5 py-5 container'>
            <h1>see orders {orders.length}</h1>
            <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Serial</th>
      <th scope="col">customer name</th>
      <th scope="col">email</th>
      <th scope="col">price</th>
      <th scope="col">product name</th>
      <th scope="col">Phone</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
        orders.map((order,i)=> <tr 
        key={order._id}>
      <th scope="row">{i+1}</th>
      <td>{order.customer}</td>
      <td>{order.email}</td>
      <td>{order.price}</td>
      <td>{order.productName}</td>
      <td>{order.phone}</td>
      <td>
        <button onClick={()=>handleDeleteOrder(order)} className='btn btn-sm btn-outline-danger'>Delete</button>
      </td>
    </tr> )
    }
   
  
  </tbody>
</table>
        </div>
    );
};

export default Orders;