/**/
/*
OrderSection::OrderSection() - Component for managing and displaying user orders.

NAME

        OrderSection - A React component that displays a list of user orders, provides functionality to filter and sort orders, and allows updating order details.

SYNOPSIS

        const OrderSection = () => { ... };

DESCRIPTION

        This component fetches orders from the Firestore database and displays them in a list format. Users can search for orders by Order ID or delivery status and sort the orders by their current status. Each order can be updated to reflect changes in delivery status, delivery boy's name, and phone number. 

        The component includes:
        - A search bar to filter orders by Order ID or delivery status.
        - A dropdown menu to sort orders based on their delivery status.
        - Controls to update the status of orders and input fields to set the delivery boy's name and phone number.
        - A button to view detailed information about each order.

RETURNS

        Renders a JSX element that includes a navigation bar, search and sorting controls, and a list of orders with options for updating order details.
*/
/**/


import NavBar from '../NavBar/NavBar';
import React, { useEffect, useState } from 'react';
import { db } from '../../FireBase/FirebaseConfig';
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import './OrderSection.css';
import { Link } from 'react-router-dom';

const OrderSection = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [allOrdersStatus, setAllOrdersStatus] = useState('');
    const [keyword, setKeyword] = useState('');

    const getAllOrder = async () => {
        setAllOrders([]);
        const querySnapshot = await getDocs(collection(db, "UserOrders"));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setAllOrders((prev) => [...prev, doc.data()]);
        });
    };

    useEffect(() => {
        getAllOrder();
    }, []);

    const changeOrderStatus = (id, orderdata, status) => {
        const docRef = doc(db, "UserOrders", id);
        const data = { 
            ...orderdata, 
            orderstatus: status
        };
        setDoc(docRef, data).then(() => {
            alert("Document successfully written!");
        })
        .catch((error) => {
            alert("Error writing document: ", error);
        });
        getAllOrder();
    };

    const changeDeliveryboyName = (id, orderdata, boyname) => {
        console.log(id, orderdata, boyname);
        const docRef = doc(db, "UserOrders", id);
        const data = {
            ...orderdata,
            deliveryboy_name: boyname
        };
        setDoc(docRef, data).then(() => {
            alert("Document successfully written!");
        })
        .catch((error) => {
            alert("Error writing document: ", error);
        });
        getAllOrder();
    };

    const changeDeliveryboyPhone = (id, orderdata, boyphone) => {
        console.log(id, orderdata, boyphone);
        const docRef = doc(db, "UserOrders", id);
        const data = {
            ...orderdata,
            deliveryboy_phone: boyphone
        };
        setDoc(docRef, data).then(() => {
            alert("Document successfully written!");
        })
        .catch((error) => {
            alert("Error writing document: ", error);
        });
        getAllOrder();
    };

    return (
        <div className="order-section">
            <NavBar/>
            <h1 className="order-head1">Order Section</h1>
            <div className="order-s1">
                <div className="order-s1-in">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by Order Id or Delivery Status"
                            className="searchbar"
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <div className="sort-container">
                        <p>Sort by Order Status</p>
                        <select className="ordertxt" onChange={(e) => setAllOrdersStatus(e.target.value)}>
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="ontheway">On the way</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="order_container">
                <div className="order-row_card1">
                    <p className="ordertxt">OrderId</p>
                    <p className="ordertxt">Paid</p>
                    <p className="ordertxt">Delivery Status</p>
                    <p className="ordertxt">Rider Name</p>
                    <p className="ordertxt">Rider Phone</p>
                    <p className="ordertxt">Cost</p>
                    <button>Show Details</button>
                </div>
                <div className="order_container">
                    {allOrders.filter((val) => {
                        if (allOrdersStatus === "") {
                            return val;
                        } else if (val.orderstatus && val.orderstatus.toLowerCase().includes(allOrdersStatus.toLowerCase())) {
                            return val;
                        }
                    }).filter((val) => {
                        if (keyword === "") {
                            return val;
                        } else if ((val.orderid && val.orderid.toLowerCase().includes(keyword.toLowerCase())) || 
                                   (val.orderstatus && val.orderstatus.toLowerCase().includes(keyword.toLowerCase())) ||
                                   (val.deliveryboy_name && val.deliveryboy_name.toLowerCase().includes(keyword.toLowerCase()))) {
                            return val;
                        }
                    }).map((order) => {
                        return (
                            <div className="order-row_card" key={order.orderid}>
                                <p className="ordertxt">{order.orderid}</p>
                                <p className="ordertxt">{order.orderpayment}</p>
                                <div className="order-card-in">
                                    {order.orderstatus === 'pending' && (
                                        <select
                                            className="ordertxt"
                                            onChange={(e) =>
                                                changeOrderStatus(order.orderid, order, e.target.value)
                                            }
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="ontheway">On the way</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    )}
                                    {order.orderstatus === 'ontheway' && (
                                        <select
                                            className="ordertxt"
                                            onChange={(e) =>
                                                changeOrderStatus(order.orderid, order, e.target.value)
                                            }
                                        >
                                            <option value="ontheway">On the way</option>
                                            <option value="pending">Pending</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    )}
                                    {order.orderstatus === 'delivered' && (
                                        <select
                                            className="ordertxt"
                                            onChange={(e) =>
                                                changeOrderStatus(order.orderid, order, e.target.value)
                                            }
                                        >
                                            <option value="delivered">Delivered</option>
                                            <option value="pending">Pending</option>
                                            <option value="ontheway">On the way</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    )}
                                    {order.orderstatus === 'cancelled' && (
                                        <p className="ordertxt" style={{ color: 'blue' }}>
                                            {order.orderstatus}
                                        </p>
                                    )}
                                </div>
                                {
                                    order.deliveryboy_name ? <p className='ordertxt'> {order.deliveryboy_name}</p> : 
                                    <input type="text" placeholder="Enter deliveryboy_name" className='orderinput' onBlur={(e) => changeDeliveryboyName(order.orderid, order, e.target.value)}/>}
                                {
                                    order.deliveryboy_phone ? <p className='ordertxt'> {order.deliveryboy_phone}</p> : 
                                    <input type="text" placeholder="Enter deliveryboy_phone" className='orderinput' onBlur={(e) => changeDeliveryboyPhone(order.orderid, order, e.target.value)}/>}
                                <p className="ordertxt">{order.ordercost}</p>
                                <Link to={`/orderdetails/${order.orderid}`}><button>Show Details</button></Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OrderSection;
