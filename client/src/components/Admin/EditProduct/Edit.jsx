import React, { useState,useEffect } from "react";
import { useNavigate,useLocation} from 'react-router-dom';
import axios from "../../../axios";
import jwt_decode from 'jwt-decode';
import './Edit.css'
import './EditMobile.css'


function Edit() {
  const [productId,setProductId] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedBrand, setSelectedBrand] = useState('1');
  const [description, setDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  //for men and women
  const [isSchecked, setIsSChecked] = useState(true);
  const [isMchecked, setIsMChecked] = useState(true);
  const [isLchecked, setIsLChecked] = useState(true);
  const [isXLchecked, setIsXLChecked] = useState(true);
  const [isXXLchecked, setIsXXLChecked] = useState(true);
  const [quantityS, setQuantityS] = useState(0);
  const [quantityM, setQuantityM] = useState(0);
  const [quantityL, setQuantityL] = useState(0);
  const [quantityXL, setQuantityXL] = useState(0);
  const [quantityXXL, setQuantityXXL] = useState(0 );
//for kids
  const [is1checked, setIs1Checked] = useState(true);
  const [is2checked, setIs2Checked] = useState(true);
  const [is3checked, setIs3Checked] = useState(true);
  const [is4checked, setIs4Checked] = useState(true);
  const [quantity1, setQuantity1] = useState(0);
  const [quantity2, setQuantity2] = useState(0);
  const [quantity3, setQuantity3] = useState(0);
  const [quantity4, setQuantity4] = useState(0);
  
  const [image, setImage] = useState(null);
  const [imageClone, setImageClone] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const proId = queryParams.get('proId');
      setProductId(proId)
      console.log(proId)
      if (proId) {
        try {
        
          const response = await axios.get(`/User/selectedProduct/${proId}`);
          setImage(response.data[0].imageUrl)
          setImageClone(response.data[0].imageUrl)
          console.log(response.data[0].imageUrl);
          setProductName(response.data[0].name)
          setPrice(response.data[0].price)
          setQuantity(response.data[0].quantity)
          setDescription(response.data[0].description)
          setSelectedCategory(response.data[0].category)

          setQuantity1(response.data[0].Kidsize.Kidsizes.zeroToOne!=0?response.data[0].Kidsize.Kidsizes.zeroToOne:0)
          setQuantity2(response.data[0].Kidsize.Kidsizes.oneToTwo!=0?response.data[0].Kidsize.Kidsizes.oneToTwo:0)
          setQuantity3(response.data[0].Kidsize.Kidsizes.twoToThree!=0?response.data[0].Kidsize.Kidsizes.twoToThree:0)
          setQuantity4(response.data[0].Kidsize.Kidsizes.threeToFour!=0?response.data[0].Kidsize.Kidsizes.threeToFour:0)

          setQuantityS(response.data[0].size.sizes.s!=0?response.data[0].size.sizes.s:0)
          setQuantityM(response.data[0].size.sizes.m!=0?response.data[0].size.sizes.m:0)
          setQuantityL(response.data[0].size.sizes.l!=0?response.data[0].size.sizes.l:0)
          setQuantityXL(response.data[0].size.sizes.xl!=0?response.data[0].size.sizes.xl:0)
          setQuantityXXL(response.data[0].size.sizes.xxl!=0?response.data[0].size.sizes.xxl:0)
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
  
    fetchData();
  }, []);
  



  // const handleCategoryChange = (e) => {
  //   setSelectedCategory(e.target.value);
  // };
 
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
 
  const handleImageChange = (e) => {
    const selectedFiles = e.target.files;
    console.log(e.target.files)
    const newImages = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      newImages.push(selectedFiles[i]);
    }
// console.log(newImages)
    setImage(newImages);
    
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
     // Create a FormData object to send the image and name
 
     var formData = new FormData();

     for (let i = 0; i < image.length; i++) {
           formData.append('image', image[i]);
        
         }
  
     
    formData.append('productId',productId)
    formData.append('name', productName); 
    formData.append('price', price); 
    formData.append('quantity', quantity); 
    formData.append('category', selectedCategory); 
    formData.append('description', description); 
    formData.append('imageClone', imageClone);
  

    try {
      const token = localStorage.getItem('token');

      if (token) {
        // Decode the token to get user details
        const decodedToken = jwt_decode(token);
        console.log(decodedToken.userId)
        formData.append('sellerId', decodedToken.userId); 
      
      }
      
      if(selectedCategory == "Mens" || selectedCategory == "Womens"){


        const size =true
        formData.append('size', size); 
     
       const sizes = {
        s: quantityS,
        m: quantityM,
        l: quantityL,
        xl: quantityXL,
        xxl: quantityXXL,
      };
      
        
        formData.append('sizes', JSON.stringify(sizes));
       console.log(sizes)

        const response = await axios.put("/Admin/updateProduct",formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log(response.data)
       
      }else if (selectedCategory == "Kids"){

        const Kidsizes = {
          zeroToOne: quantity1,
          oneToTwo: quantity2,
          twoToThree: quantity3,
          threeToFour: quantity4,
        };
        
        formData.append('Kidsizes', JSON.stringify(Kidsizes)); 
        const Kidsize =true
        formData.append('Kidsize', Kidsize); 
       
        const response = await axios.put("/Admin/updateProduct",formData,  {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log(response.data);
      }else{
        const response = await axios.put("/Admin/updateProduct", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log(response.data)

      }
      // navigate('/adminHome')
    } catch (e) {
      console.log(e);
    }

    
  };

  //for men and women
  const handleCheckboxChangeS = () => {
    console.log(isSchecked);
   
    setIsSChecked(!isSchecked); // Toggle the checkbox state
  };
  const handleCheckboxChangeM = () => {
    console.log(isMchecked);
    setIsMChecked(!isMchecked); // Toggle the checkbox state
  };
  const handleCheckboxChangeL = () => {
    console.log(isLchecked);
    setIsLChecked(!isLchecked); // Toggle the checkbox state
  };
  const handleCheckboxChangeXL = () => {
    console.log(isXLchecked);
    setIsXLChecked(!isXLchecked); // Toggle the checkbox state
  };
  const handleCheckboxChangeXXL = () => {
    console.log(isXXLchecked);
    setIsXXLChecked(!isXXLchecked); // Toggle the checkbox state
  };
//for kids
const handleCheckboxChange1 = () => {
 
  setIs1Checked(!is1checked); // Toggle the checkbox state
};
const handleCheckboxChange2 = () => {
  
  setIs2Checked(!is2checked); // Toggle the checkbox state
};
const handleCheckboxChange3 = () => {
  
  setIs3Checked(!is3checked); // Toggle the checkbox state
};
const handleCheckboxChange4 = () => {
  
  setIs4Checked(!is4checked); // Toggle the checkbox state
};





  
  return (
    <div className="main">
     
    <div className="content-box">
     
      <form action="" onSubmit={handleSubmit} >
        <div className="input-contents">
<div className="left-input">
<label for="username">Name: </label>
          <input
         placeholder={productName}
            type="text"
            id="name"
            value={productName}
            name="name"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
          <label>Price: </label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder={price}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            placeholder={quantity}
            value={quantity}
            id="quantity"
            onChange={(e) => {
              setQuantity(parseInt(e.target.value, 10));
            }}
          />

          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            // onChange={handleCategoryChange}
          >
            <option value="Cosmetics">Cosmetics</option>
            <option value="Mens">Mens</option>
            <option value="Womens">Womens</option>
            <option value="Kids">Kids</option>
            <option value="Foot wear">Foot wear</option>
            <option value="Grooming">Grooming</option>
            <option value="Hand bag">Hand bag</option>
            <option value="Watch">Watch</option>
          </select>

          {selectedCategory == "Mens" || selectedCategory == "Womens" ? (
            <div className="adultDressBox">
              <label htmlFor="description">Size :</label>
              <div className="subBox">
                <label htmlFor="">&nbsp;&nbsp;&nbsp;&nbsp;s </label>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={isSchecked}
                  onChange={handleCheckboxChangeS}
                />

                {isSchecked ? (
                  <>
                    <label htmlFor="">Qty : </label>
                    <input
                      type="number"
                      style={{ width: "50px" }}
                      placeholder={quantityS}
                      value={quantityS}
                      onChange={(e) => {
                        setQuantityS(parseInt(e.target.value, 10));;
                      }} // Add CSS style to make it smaller
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="subBox">
                <label htmlFor="">&nbsp;&nbsp;&nbsp;m </label>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={isMchecked}
                  onChange={handleCheckboxChangeM}
                />
                {isMchecked ? (
                  <>
                    <label htmlFor="">Qty : </label>
                    <input
                      type="number"
                      placeholder={quantityM}
                      value={quantityM}
                      onChange={(e) => {
                        setQuantityM(parseInt(e.target.value, 10));
                      }}
                      style={{ width: "50px" }} // Add CSS style to make it smaller
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="subBox">
                <label htmlFor="">&nbsp;&nbsp;&nbsp;&nbsp;l </label>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={isLchecked}
                  onChange={handleCheckboxChangeL}
                />
                {isLchecked ? (
                  <>
                    <label htmlFor="">Qty : </label>
                    <input
                      type="number"
                      placeholder={quantityL}
                      value={quantityL}
                      onChange={(e) => {
                        setQuantityL(parseInt(e.target.value, 10));
                      }}
                      style={{ width: "50px" }} // Add CSS style to make it smaller
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="subBox">
                <label htmlFor="">&nbsp; xl </label>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={isXLchecked}
                  onChange={handleCheckboxChangeXL}
                />
                {isXLchecked ? (
                  <>
                    <label htmlFor="">Qty : </label>
                    <input
                      type="number"
                      placeholder={quantityXL}
                      value={quantityXL}
                      onChange={(e) => {
                        setQuantityXL(parseInt(e.target.value, 10));
                      }}
                      style={{ width: "50px" }} // Add CSS style to make it smaller
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="subBox">
                <label htmlFor=""> xxl </label>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={isXXLchecked}
                  onChange={handleCheckboxChangeXXL}
                />
                {isXXLchecked ? (
                  <>
                    <label htmlFor="">Qty : </label>
                    <input
                      type="number"
                      placeholder={quantityXXL}
                      value={quantityXXL}
                      onChange={(e) => {
                        setQuantityXXL(parseInt(e.target.value, 10));
                      }}
                      style={{ width: "50px" }} // Add CSS style to make it smaller
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : selectedCategory == "Kids" ? (
            <div className="KidsDressBox">
              <label htmlFor="description">Size :</label>
              <div className="subBox">
                <label htmlFor=""> &nbsp;&nbsp;0 to 1 year </label>
                <input type="checkbox" name="" id="" checked={is1checked}
                  onChange={handleCheckboxChange1}/>
                  {is1checked ? (
                  <>
                     <label htmlFor="">Qty : </label>
                <input
                  type="number"
                  style={{ width: "50px" }} // Add CSS style to make it smaller
                  placeholder={quantity1}
                  value={quantity1}
                  onChange={(e) => {
                    setQuantity1(parseInt(e.target.value, 10));
                  }}
                />
                  </>
                ) : (
                  ""
                )}
               
              </div>
              <div className="subBox">
                <label htmlFor="">
                  &nbsp;&nbsp;&nbsp;1 to 2 years{" "}
                </label>
                <input type="checkbox" name="" id="" checked={is2checked}
                
                  onChange={handleCheckboxChange2}/>
              
                {is2checked ? (
                  <>
                     <label htmlFor="">Qty : </label>
                <input
                  type="number"
                  style={{ width: "50px" }} // Add CSS style to make it smaller
                  placeholder={quantity2}
                  value={quantity2}
                  onChange={(e) => {
                    setQuantity2(parseInt(e.target.value, 10));
                  }}
                />
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="subBox">
                <label htmlFor="">&nbsp;&nbsp;&nbsp;2 to 3 years </label>
                <input type="checkbox" name="" id="" checked={is3checked}
                  onChange={handleCheckboxChange3}/>
                    {is3checked ? (
                  <>
                     <label htmlFor="">Qty : </label>
                <input
                  type="number"
                  style={{ width: "50px" }} // Add CSS style to make it smaller
                  placeholder={quantity3}
                  value={quantity3}
                  onChange={(e) => {
                    setQuantity3(parseInt(e.target.value, 10));
                  }}
                />
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="subBox">
                <label htmlFor="">
                  &nbsp;&nbsp;&nbsp;&nbsp;3 to 4 years{" "}
                </label>
                <input type="checkbox" name="" id="" checked={is4checked}
                  onChange={handleCheckboxChange4}/>
                    {is4checked ? (
                  <>
                     <label htmlFor="">Qty : </label>
                <input
                  type="number"
                  style={{ width: "50px" }} // Add CSS style to make it smaller
                  placeholder={quantity4}
                  value={quantity4}
                  onChange={(e) => {
                    setQuantity4(parseInt(e.target.value, 10));
                  }}
                />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
</div>
<div className="right-input">
<label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            placeholder={description}
            onChange={handleDescriptionChange}
            style={{
              width: "300px",
              height: "100px",
              resize: "none",
              padding: "4px",
            }}
          />
         
         <label htmlFor="image">Image:</label>
         <input
          type="file"
          id="image"
          name="image" 
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
</div>

        </div>
        <div className="buttonform">  <button className="realbutton" type="submit">
<span>Click</span>
</button>
</div>
      
      </form>
    </div>
  </div>
  )
}

export default Edit