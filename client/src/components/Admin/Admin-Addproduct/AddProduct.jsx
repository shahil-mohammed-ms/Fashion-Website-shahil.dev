import React, { useState } from "react";
import axios from "../../../axios";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import "./AddProduct.css";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

function AddProduct() {
  const [selectedCategory, setSelectedCategory] = useState("Cosmetics");
  // const [selectedBrand, setSelectedBrand] = useState('1');
  const [description, setDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  // const [size, setSize] = useState(false);
  // const [kSize, setKsize] = useState(false);
  // const [sizes, setSizes] = useState([]);
  const [Kidsizes, setKidsizes] = useState([]);
  // const [category, setCategory] = useState('');
  const [isSchecked, setIsSChecked] = useState(false);
  const [isMchecked, setIsMChecked] = useState(false);
  const [isLchecked, setIsLChecked] = useState(false);
  const [isXLchecked, setIsXLChecked] = useState(false);
  const [isXXLchecked, setIsXXLChecked] = useState(false);
  const [quantityS, setQuantityS] = useState(0);
  const [quantityM, setQuantityM] = useState(0);
  const [quantityL, setQuantityL] = useState(0);
  const [quantityXL, setQuantityXL] = useState(0);
  const [quantityXXL, setQuantityXXL] = useState(0 );

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  // const handleBrandChange = (e) => {
  //   setSelectedBrand(e.target.value);
  // };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    const sizes=[{s:quantityS},{m:quantityM},{l:quantityL},{xl:quantityXL},{xxl:quantityXXL}]
console.log(sizes)
    try {
      if(selectedCategory == "Mens" || selectedCategory == "Womens"){
        const response = await axios.post("/Admin", {
          name: productName,
          price,
          quantity,
          category: selectedCategory,
          size:true,
          sizes,
          description,
        });
        console.log(response.data);
      }else if (selectedCategory == "Kids"){
        const response = await axios.post("/Admin", {
          name: productName,
          price,
          quantity,
          category: selectedCategory,
          Kidsize:true,
          Kidsizes,
          description,
        });
        console.log(response.data);
      }else{
        const response = await axios.post("/Admin", {
          name: productName,
          price,
          quantity,
          category: selectedCategory,
          description,
        });
        console.log(response.data);

      }
     
    } catch (e) {
      console.log(e);
    }

    console.log(productName);
    console.log(price, "", quantity);
    console.log(selectedCategory);
    console.log(description);
  };

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

  return (
    <div className="main">
      <div className="content-box">
        <div className="header">
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Home"
              icon={<HomeIcon fontSize="small" />}
            />
          </Breadcrumbs>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="input-contents">
            <label for="username">Name: </label>
            <input
              type="text"
              id="name"
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
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
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
              onChange={handleCategoryChange}
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
              <div className="adultDressBox">
                <label htmlFor="description">Size :</label>
                <div className="subBox">
                  <label htmlFor=""> 0 to 1 year </label>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Qty : </label>
                  <input
                    type="number"
                    style={{ width: "50px" }} // Add CSS style to make it smaller
                  />
                </div>
                <div className="subBox">
                  <label htmlFor="">
                    &nbsp;&nbsp;&nbsp;&nbsp;1 to 2 years{" "}
                  </label>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Qty : </label>
                  <input
                    type="number"
                    style={{ width: "50px" }} // Add CSS style to make it smaller
                  />
                </div>
                <div className="subBox">
                  <label htmlFor="">&nbsp;&nbsp;&nbsp;2 to 3 years </label>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Qty : </label>
                  <input
                    type="number"
                    style={{ width: "50px" }} // Add CSS style to make it smaller
                  />
                </div>
                <div className="subBox">
                  <label htmlFor="">
                    &nbsp;&nbsp;&nbsp;&nbsp;3 to 4 years{" "}
                  </label>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Qty : </label>
                  <input
                    type="number"
                    style={{ width: "50px" }} // Add CSS style to make it smaller
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              style={{
                width: "300px",
                height: "100px",
                resize: "none",
                padding: "4px",
              }}
            />
            {/* <label htmlFor="category">Brand:</label>
<select id="brand" name="brand" value={selectedBrand} onChange={handleBrandChange}>
<option value="1">b 1</option>
<option value="2">b 2</option>
<option value="3">b 3</option>
</select> */}
          </div>
          <button type="submit">click</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
