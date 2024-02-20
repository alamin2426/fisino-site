/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { WebController } from '../../../ParentContext/Context';
import toast from 'react-hot-toast';

const CartProduct = ({ product }) => {
    const navigate =useNavigate()

    const { userInfo, logOut, verify } = useContext(WebController);
    // console.log(product);
    const [value, setValue] = useState(1);
    const { img, name,  price, ratings, shipping } = product;

    const plus = () => {
        setValue(value + 1)
    }
    const minus = () => {
        if(value > 0){
            setValue(value - 1)
        }
    }

    const totalPrice = price * value + shipping
    const handelOrder =(event)=>{
        event.preventDefault()
        // console.log('handel submit');
        const form = event.target;
        const customerName = form.customerName.value;
        const price = form.price.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const address = form.address.value;

        const order = {
            productName:name,
            customer : customerName,
            price :totalPrice,
            quantity: value,
            email,
            phone,
            address
        }
      fetch('http://localhost:3000/orders' ,{
        method:"POST",
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(order)
      })
     .then(res => res.json())
     .then(data =>{
        console.log(data);
        if(data.acknowledged){
            toast.success('Successfully pleased!');
            setValue(1);
            form.reset()
            navigate('/orders')
        }

     })

    }
    return (
        <div className='row align-items-center justify-content-center py-3'>
            <div className="col-12 col-lg-6">
                <div className="cart-img"><img className='w-75' src={img} alt={name} /></div>
            </div>
            <div className="col-12 col-lg-6">
                <form onSubmit={handelOrder} className="details">
                    <h4><span className='text-secondary'>Ratings:</span> {ratings}</h4>
                    <h1>{name}</h1>
                    <div className="d-flex align-items-center"><h3 className='pe-5'>Price: $ {price}</h3>
                        <h5 className='text-secondary'>Shipping: $ {shipping}</h5></div>

                    {/* <h3 className='color-text pb-3'>Total: $ {totalPrice}</h3> */}

                    <div className="mb-3">
  <label htmlFor="formGroupExampleInput" className="form-label">Customer name</label>
  <input name='customerName' defaultValue={userInfo?.displayName} type="text" className="form-control" />
</div>
                    <div className="mb-3">
  <label htmlFor="formGroupExampleInput" className="form-label"> Price</label>
  <input readOnly name='price' type="text" className="form-control" placeholder={totalPrice} />
</div>
                    <div className="mb-3">
  <label htmlFor="formGroupExampleInput" className="form-label"> Email</label>
  <input name='email' defaultValue={userInfo?.email} type="text" className="form-control"  />
</div>
                    <div className="mb-3">
  <label htmlFor="formGroupExampleInput" className="form-label"> Phone</label>
  <input name='phone' type="text" className="form-control"  />
</div>
                    <div className="mb-3">
  <label htmlFor="formGroupExampleInput" className="form-label"> Address</label>
  <input name='address' type="text" className="form-control"  />
</div>





                    <div className="counter">
                        <div className="btn-group pe-0 pe-md-3 shadow-sm" role="group" aria-label="Basic example">
                            <button type="button" onClick={minus} className="btn minus">-</button>
                            <input type="number" className='text-center' disabled value={value} />
                            <button type="button" onClick={plus} className="btn plus">+</button>
                        </div>
                        <button type='submit' className='btn btn-dark rounded-0 btn-200px orderBtn'>Order Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CartProduct;