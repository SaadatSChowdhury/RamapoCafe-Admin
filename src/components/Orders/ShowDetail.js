/**/
/*
ShowDetail::getOrderData() ShowDetail::getOrderData()

NAME

        ShowDetail::getOrderData - fetches and sets the order details from Firestore.

SYNOPSIS

        void ShowDetail::getOrderData();
            
DESCRIPTION

        This function retrieves order data from Firestore based on the order ID provided
        in the URL parameters. It uses the Firebase Firestore `getDoc` function to access
        the document from the "UserOrders" collection. If the document exists, the order
        data is set to the component state. If no document is found, a message indicating
        the absence of the document is logged.

        The function is called within a `useEffect` hook to ensure that the order data is
        fetched when the component mounts.

RETURNS

        This function does not return a value. It updates the component state with
        the fetched order data or logs an error if the document does not exist.


*/
/**/


import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ShowDetail.css'
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../FireBase/FirebaseConfig'

const ShowDetail = () => {

    const { orderid } = useParams()
    const [orderdata, setOrderData] = useState({})
    console.log(orderid)

    const getOrderData = async () => {
        const docRef = doc(db, "UserOrders", orderid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setOrderData(docSnap.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getOrderData()
    }, [])

  return (
    <div className='order-section'>
    <NavBar/>
    <Link to ='/orders'><button className="goback-btn">Go back</button></Link>
        <h1 className='order-head1'>Order Details</h1>
            <div className='orderdetails-form'>
                <div className="orderetails_row">
                    <p>Customer Name</p>
                    <p>{orderdata.ordername}</p>
                </div>
                <div className="orderetails_row">
                    <p>Order Address</p>
                    <p>{orderdata.orderaddress}</p>
                </div>

                <div className="orderetails_row">
                    <p>Customer Phone</p>
                    <p>{orderdata.orderphone}</p>
                </div>

                <div className="orderetails_row">
                    <p>Order Status</p>
                    <p>{orderdata.orderstatus}</p>
                </div>
            </div>
    </div>
  )
}

export default ShowDetail