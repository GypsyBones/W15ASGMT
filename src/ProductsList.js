import { useState, useEffect } from 'react'



function ProductsList() {
  const API_URL = 'https://65c51c43dae2304e92e3f17d.mockapi.io/api/v1/products'

  const [products, setProducts] = useState([{}])

  const [newName, setNewName] = useState ('')
  const [newDescription, setNewDescription] = useState ('')
  const [newPrice, setNewPrice] = useState ('')
  const [newQty, setNewQty] = useState ('')

  const [updatedName, setUpdatedName] = useState('')
  const [updatedDescription, setUpdatedDescription] = useState('')
  const [updatedPrice, setUpdatedPrice] = useState('')
  const [updatedQty, setUpdatedQty] = useState('')

  function getProducts(){
    fetch(API_URL)
    .then(data => data.json())
    .then(data=> setProducts(data))
  } 

  useEffect(() => {
    getProducts()
  }, [])

  function deleteProduct(id){
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    }).then(() => getProducts())
  }

  function postNewProduct(e){
    e.preventDefault()
    fetch(API_URL, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
      name: newName,
      description: newDescription,
      price: newPrice,
      qty: newQty,

    })
    }).then(() => getProducts())
  }

  function updateProduct(e, productObject){
    e.preventDefault()
    let updatedProductObject = {
      ...productObject, 
      name: updatedName, 
      description: updatedDescription,
      price: updatedPrice,
      qty: updatedQty,
    }

    fetch(`${API_URL}/${productObject.id}`, {
      method:'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updatedProductObject),
    }).then(() => getProducts())
  } 

  return (
    <div className="App">
      <form>
        <h3>POST New Product Form</h3>
        <label>Name: </label>
        <input 
          placeholder="Name"
          onChange={(e) => setNewName(e.target.value)}
        ></input>
        <label>Description: </label>
        <input 
          placeholder="Description"
          onChange={(e) => setNewDescription(e.target.value)}
        ></input>
        <label>Price: </label>
        <input 
          placeholder="Price"
          onChange={(e) => setNewPrice(e.target.value)}
        ></input>
        <label>Qty: </label>
        <input 
          placeholder="Qty"
          onChange={(e) => setNewQty(e.target.value)}
        ></input>
        <button onClick={(e) => postNewProduct(e)}>Submit</button>
      </form><br/><br/>
      <h2>Products</h2>
      {products && products.map((product, index) => (
        <div key={index}>
          <div>
            <h3>{product.name}</h3>
            Description: {product.description} <br/>
            Price: {product.price} <br/> 
            Qty: {product.qty} <br/> 
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
            <form>
              <h4>Update this product</h4>
              <label>Update Name: </label>
              <input 
                placeholder="Name"
                onChange={(e) => setUpdatedName(e.target.value)}
              ></input>
              <label>Update Description: </label>
              <input 
                placeholder="Description"
                onChange={(e) => setUpdatedDescription(e.target.value)}
              ></input>
              <label>Update Price: </label>
              <input 
                placeholder="Price"
                onChange={(e) => setUpdatedPrice(e.target.value)}
              ></input>
              <label>Update Qty: </label>
              <input 
                placeholder="Qty"
                onChange={(e) => setUpdatedQty(e.target.value)}
              ></input>
              <button onClick={(e) => updateProduct(e, product)}>Submit</button>
            </form>
          </div><br/>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
