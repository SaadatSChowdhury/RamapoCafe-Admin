/**
   AddFoodData()::AddFoodData()
 
   NAME
        AddFoodData - Handles the submission of food data and image upload to Firebase.
 
   SYNOPSIS
        const AddFoodData = () => {
            - Renders a form for food and restaurant details.
            - Handles image upload and data submission to Firestore.

   DESCRIPTION
        This component provides a form for entering food and restaurant information,
        including name, price, description, image, and other details. It handles
        the image upload to Firebase Storage and submits the collected data to a
        Firestore collection.
  
        The `handleSubmit` function:
            - Prevents default form submission.
            - Checks if an image file is selected.
            - Uploads the image to Firebase Storage.
            - Retrieves the image URL from Firebase Storage.
            - Constructs a data object with form values and uploads it to Firestore.
RETURNS
         Returns a React component that renders a form for adding new food items and handles the submission of form data.
  
 */

import React, {useState} from 'react'
import './AddFoodData.css'
import {db, storage} from '../FireBase/FirebaseConfig'
import {addDoc, collection} from "firebase/firestore"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import NavBar from './NavBar/NavBar'

const AddFoodData = () => {
    const [foodName, setFoodName] = useState('')
    const [foodPrice, setFoodPrice] = useState('')
    const [foodImage, setFoodImage] = useState(null)
    const [foodCategory, setFoodCategory] = useState('')
    const [foodDescription, setFoodDescription] = useState('')
    const [restaurantName, setRestaurantName] = useState('')
    const [restaurantPhone, setRestaurantPhone] = useState('')
    const [foodImageUrl, setFoodImageUrl] = useState('')
    const [foodType, setFoodType] = useState('')
    const [mealType, setMealType] = useState('')
    const [foodAddon, setFoodAddon] = useState('')
    const [foodAddonPrice, setFoodAddonPrice] = useState('')
    const [restaurantEmail, setRestaurantEmail] = useState('')
    const [restaurantAddressBuilding, setRestaurantAddressBuilding] = useState('')
    const [restaurantAddressStreet, setRestaurantAddressStreet] = useState('')
    const [restaurantAddressCity, setRestaurantAddressCity] = useState('')
    const [restaurantAddressPincode, setRestaurantAddressPincode] = useState('')

        const handleSubmit = (e) => {
            e.preventDefault()

            if(foodImage == null)
            {
                alert("Please select an image")
                return
            }
            else {
                const imageRef = ref(storage, `FoodImages/${foodImage.name}`)
                const metadata = {
                    contentType: foodImage.type,
                  };
                uploadBytes(imageRef, foodImage, metadata)
                .then(()=>{
                    alert('Image uploaded successfully')
                    getDownloadURL(imageRef)
                    .then((url)=>{
                        //console.log(url)
                        setFoodImageUrl(url)

                        const foodData = {
                            foodName,
                            foodPrice,
                            foodImageUrl: url,
                            foodCategory,
                            foodDescription,
                            restaurantName,
                            //restaurantAddress,
                            restaurantPhone,
                            foodType,
                            mealType,
                            foodAddon,
                            foodAddonPrice,
                            restaurantEmail,
                            restaurantAddressBuilding,
                            restaurantAddressStreet,
                            restaurantAddressCity,
                            restaurantAddressPincode,
                            id: new Date().getTime().toString()
                        }
            
                        try{
                            const docRef = addDoc(collection(db, "FoodData"), foodData);
                            alert("Data added successfully ", docRef.id);
                        }
                        catch (error){
                            alert("Error adding document: ",error);
                        }
            
                    })
                })
                .catch((error) =>{
                    alert(error.message)
                })
            }
        }

        return (
            <div>
                <NavBar/>
                <div className="form-outer">
                <h1>Add Food Data</h1>
                <form className="form-inner">
                    <label>Food Name</label>
                    <input type="text" name="food_name" 
                        onChange = {(e) => {setFoodName(e.target.value)}}/>
                    <br/>
                    <label>Food Description</label>
                    <input type="text" name="food_description"
                        onChange = {(e) => {setFoodDescription(e.target.value)}}/>
                    <br/>
                    <div className="form-row">
                        <div className="form-col">
                            <label>Food Price</label>
                            <input type="number" name="food_price"
                                onChange={(e) => { setFoodPrice(e.target.value) }}
                            />
                        </div>
                        <div className="form-col">
                            <label>Food Type</label>

                            <select name="food_type" onChange={(e) => { setFoodType(e.target.value) }}>
                                <option value="null">Select Food Type</option>
                                <option value="dunkin">Dunkin</option>
                                <option value="atrium">Atrium</option>
                                <option value="starbucks">Starbucks</option>
                            </select>
                        </div>
                    </div>
                    <br/>
                    <div className="form-row">
                        <div className="form-col">
                            <label>Food Category</label>
                            <select name="food_category" onChange={(e) => { setFoodCategory(e.target.value) }}>
                                <option value="null">Select Food Category</option>
                                <option value="indian">Indian</option>
                                <option value="chinese">Chinese</option>
                                <option value="italian">Italian</option>
                                <option value="mexican">Mexican</option>
                                <option value="american">American</option>
                            </select>
                        </div>
                        <div className="form-col">
                            <label>Meal Type</label>

                            <select name="meal_type" onChange={(e) => { setMealType(e.target.value) }}>
                                <option value="null">Select Meal Type</option>
                                <option value="dinner">Dinner</option>
                                <option value="staters">Starters</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="liquid">Liquid</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <div class="form-row">
                        <div class="form-col">
                            <label>Add On Name</label>
                            <input type="text" name="food_addon"
                                onChange={(e) => { setFoodAddon(e.target.value) }}
                            />
                        </div>
                        <div className='form-col'>
                            <label>Add On Price</label>
                            <input type="text" name="food_addon_price"
                                onChange={(e) => { setFoodAddonPrice(e.target.value) }}
                            />
                        </div>
                    </div>
                    <br />

                    <label>Food Image</label>
                    <input type="file" name="food_image"
                        onChange = {(e) => {setFoodImage(e.target.files[0])}}/>
                    <br/>
                    <label>Restaurant Name</label>
                    <input type="text" name="restaurant_name"
                        onChange = {(e) => {setRestaurantName(e.target.value)}}/>
                    <br/>
                    <div class="form-row">
                        <div class="form-col">
                            <label>Restaurant Building Number/Name</label>
                            <input type="text" name="restaurant_address_building"
                                onChange={(e) => { setRestaurantAddressBuilding(e.target.value) }}
                            />
                        </div>
                        <div class="form-col">
                            <label>Restaurant Street / Area Name</label>
                            <input type="text" name="restaurant_address_street"
                                onChange={(e) => { setRestaurantAddressStreet(e.target.value) }}
                            />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-col">
                            <label>Restaurant City</label>
                            <input type="text" name="restaurant_address_city"
                                onChange={(e) => { setRestaurantAddressCity(e.target.value) }}
                            />
                        </div>
                        <div class="form-col">
                            <label>Restaurant Pin-code</label>
                            <input type="number" name="restaurant_address_pincode"
                                onChange={(e) => { setRestaurantAddressPincode(e.target.value) }}
                            />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-col">
                            <label>Restaurant Phone</label>
                            <input type="number" name="restaurant_phone"
                                onChange={(e) => { setRestaurantPhone(e.target.value) }}
                            />
                        </div>
                        <div class="form-col">
                            <label>Restaurant Email</label>
                            <input type="email" name="restaurant_email"
                                onChange={(e) => { setRestaurantEmail(e.target.value) }}
                            />
                        </div>
                    </div>
                    <br/>
                    <button onClick={handleSubmit}>Add Food</button>

                </form>
            </div>
            </div>
  )
}

export default AddFoodData