import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../config/firebase';
import Swal from 'sweetalert2';

function AddItem() {
  // States for form fields
  const [itemName, setItemName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [category, setCategory] = useState("");

  // Firestore Add Function
  async function dataAdd(e) {
    e.preventDefault();

    Swal.fire({
      title: "Adding Item...",
      html: "Please wait while we upload your product.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const docRef = await addDoc(collection(db, "products"), {
        itemName,
        brandName,
        price,
        description,
        contact,
        imgUrl,
        category
      });

      Swal.close();

      Swal.fire({
        icon: "success",
        title: "Item Added!",
        text: "Your product has been uploaded successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      console.log("Document written with ID: ", docRef.id);

      // Clear form
      setItemName("");
      setBrandName("");
      setPrice("");
      setDescription("");
      setContact("");
      setImgUrl("");
      setCategory("");

    } catch (error) {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Failed to Add!",
        text: "Something went wrong. Please try again.",
      });

      console.error("Error adding document: ", error);
    }
  }

  return (
    <>
      <button 
        type="button" 
        className="btn btn-primary" 
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal"
      >
        + Sell
      </button>

      <div>
        <div 
          className="modal fade" 
          id="exampleModal" 
          tabIndex="-1" 
          aria-labelledby="exampleModalLabel" 
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Sell Item</h1>
                <button 
                  type="button" 
                  className="btn-close" 
                  data-bs-dismiss="modal" 
                  aria-label="Close"
                ></button>
              </div>

              <form onSubmit={dataAdd}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="col-form-label">Category:</label>
                    <select 
                      className="form-control"
                      value={category}
                      onChange={(e)=>setCategory(e.target.value)}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="property">Property</option>
                      <option value="vehicle">Vehicle</option>
                      <option value="electronics">Electronics</option>
                      <option value="furniture">Furniture</option>
                      <option value="mobile">Mobile</option>
                      <option value="job">Job</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="col-form-label">Name:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter Item Name"
                      value={itemName}
                      onChange={(e)=>setItemName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="col-form-label">Brand Name:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter Brand Name"
                      value={brandName}
                      onChange={(e)=>setBrandName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="col-form-label">Price:</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Enter Price in Rs"
                      value={price}
                      onChange={(e)=>setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="col-form-label">Description:</label>
                    <textarea 
                      className="form-control" 
                      placeholder="Enter Description"
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="col-form-label">Owner Contact Number:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="0300-0000000"
                      value={contact}
                      onChange={(e)=>setContact(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="col-form-label">Image URL:</label>
                    <input 
                      type="url" 
                      className="form-control" 
                      placeholder="Enter Image URL"
                      value={imgUrl}
                      onChange={(e)=>setImgUrl(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Item
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddItem;
