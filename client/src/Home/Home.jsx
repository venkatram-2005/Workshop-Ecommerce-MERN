import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [products, setProducts] = useState([])
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    fetchProducts();
  }, [])
  async function fetchProducts() {
    await axios.get("http://localhost:5000/api/product")
      .then((res) => {
        console.log(res)
        setProducts(res.data)
      })
      .catch((err) => {
        console.log("Error from home at fetching products", err)
      })
  }
  async function addCart(productId) {
    console.log(productId)
    if (!user || !user.token) {
      alert("Please log in first")
      return
    }
    try {
      await axios.post("http://localhost:5000/api/cart/add", { productId }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
        .then((res) => {
          alert("Product added to cart")
          navigate("/cart")
        })
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Products</h2>
      <div className="row">
        {products.map((productItem) => (
          <div key={productItem._id} className="col-md-4 mb-4">
            <div className="card shadow-lg border-0">
              {/* Image with controlled size */}
              <img
                src={productItem.imageUrl}
                className="card-img-top img-fluid"
                alt={productItem.name}
                style={{ height: "200px", width: "100%", objectFit: "contain" }}
              />


              {/* Card Body */}
              <div className="card-body">
                <h5 className="card-title fw-bold">{productItem.name}</h5>
                <p className="card-text"><strong>Price:</strong> ${productItem.price}</p>
                <p className="card-text"><strong>Description:</strong> {productItem.description}</p>
                <p className="card-text"><strong>Stock:</strong> {productItem.stock}</p>
                <p className="card-text"><strong>Category:</strong> {productItem.category}</p>
              </div>

              {/* Card Footer with Button */}
              {user && user.role === "user" && (
                <div className="card-footer bg-white border-0">
                  <button className="btn btn-primary w-100" onClick={() => addCart(productItem._id)}>
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>


  )
}