import React from 'react';
import './App.css';
import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import { useCommerceStore } from "./store";
import Review from "./components/Forms/Review";
import AddProduct from "./components/Forms/AddProduct";
import CreateStore from "./components/Forms/CreateStore";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import FiltersBar from "./components/Filters/FiltersBar";

function App() {
  const { token } = useCommerceStore()

  return (
    <div className="App">
      {/* {!token &&
        <>
          <Register />
          <br />
          <Login />
        </>
      } */}
      <Header />
      <FiltersBar />
      {/* <Review />
      
      <AddProduct/>
      
      <CreateStore/>
      
      <ProductList /> */}
    </div>
  );
}

export default App;
