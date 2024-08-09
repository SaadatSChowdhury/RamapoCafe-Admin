/**
  App Component
  
  NAME
  
      App - The root component of the RamapoCafe application.
  
  SYNOPSIS
  
      App()
  
  DESCRIPTION
  
      The App component sets up the routing for the RamapoCafe application using
      `react-router-dom`. It wraps the entire application in a `BrowserRouter`
      and defines various routes for different components of the application.
  
      Routes:
      - `/`: The root path, which renders the `OrderSection` component.
      - `/orders`: Renders the `OrderSection` component, displaying the list of orders.
      - `/addFood`: Renders the `AddFoodData` component, allowing users to add new food items.
      - `/orderdetails/:orderid`: Renders the `ShowDetail` component, showing details of a specific order.
  
      The application uses `Route` components to map paths to the respective components.
      The `:orderid` parameter in the `/orderdetails/:orderid` route allows for dynamic 
      routing based on the order ID.
  
  RETURNS
  
      The App component returns the entire application's routing structure.
  
  EXPORTS
  
      Exports the App component as the default export of the module.
 */


import './App.css';
import AddFoodData from './components/AddFoodData';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderSection from './components/Orders/OrderSection';
import ShowDetail from './components/Orders/ShowDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element={<OrderSection/>}/>
        <Route path="/orders" element={<OrderSection/>}/>
        <Route path="/addFood" element={<AddFoodData/>}/>
        <Route path="/orderdetails/:orderid" element={<ShowDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;