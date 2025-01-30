// products-logic
let totalPaymentAmount = 0;
let deliveryCharges = 10;
const coupenDiscountAmount = 0;
let productsArray = [
  {
    name: "Denim Pro Jacket",
    size: "XL",
    color: "blue",
    price: "64",
    quantity: "1",
    imgSrc:
      "https://img.mensxp.com/media/content/2020/Aug/Easy-To-Follow-Tips-To-Wear-A-Denim-Jacket-Like-A-Big-Shot-Celebrity-500-2_5f2d458334ee7.jpeg?w=780&h=1167&cc=1",
  },
  {
    name: "Harbour Men Grey Jacket",
    size: "XL",
    color: "grey",
    price: "46",
    quantity: "1",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStzhUaxpq0FQSamuroaJB9gXhS5130fk1qhQ&s",
  },
];

let productContainer = document.getElementById("product-container");
let totalPaymentDiv = document.getElementById("totalPayment");

function showProduct() {
  productContainer.innerHTML = "";

  // Calculate total price dynamically
  totalPaymentAmount =
    deliveryCharges -
    coupenDiscountAmount +
    productsArray.reduce((acc, product) => {
      return acc + Number(product.price) * Number(product.quantity);
    }, 0);
  totalPaymentDiv.innerHTML = `<strong>Total Payment: <span style="margin-left:30px">$${totalPaymentAmount}</span></strong>`;

  productsArray.forEach((product, index) => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("product-item");

    productDiv.innerHTML = `
    <img src=${product.imgSrc} alt="jacket" />
     <div class="product-description">
      <h5 style="font-size:18px"><strong>${product.name}</strong></h5>
    <div class="product-details-grouped">
      <p>Size: <strong>${product.size}</strong></p>
      <p>Color: ${product.color}</p>
    </div>

    <div class="product-details-grouped">
    <p><strong> $ ${product.price}</strong></p>
     <div>
      <span>Qty: </span>
         <select class="quantity-select" data-index="${index}
         "
         style="padding:5px 6px;border:1px solid #9AA6B2;border-radius:6px"
         >
        <option value="1" ${product.quantity == 1 ? "selected" : ""}>1</option>
        <option value="2" ${product.quantity == 2 ? "selected" : ""}>2</option>
        <option value="3" ${product.quantity == 3 ? "selected" : ""}>3</option>
        <option value="4" ${product.quantity == 4 ? "selected" : ""}>4</option>
      </select>
     </div>
    </div>
      
      
   
      
      <p class="remove-btn" data-index="${index}">Remove</p>
     </div>
    `;

    productContainer.appendChild(productDiv);
  });

  // Attach event listeners
  updateProducts();
  updatePaymentSection();
  attachRemoveListeners();
}

function updatePaymentSection() {
  // Find the dynamic "Pay" button inside the payment form
  let payButtons = document.querySelectorAll("#validate-btn");

  payButtons.forEach((button) => {
    button.innerText = `Pay $${totalPaymentAmount}`;
  });
}

// Function to update quantity
function updateProducts() {
  let quantitySelectors = document.querySelectorAll(".quantity-select");

  quantitySelectors.forEach((select) => {
    select.addEventListener("change", function (e) {
      let index = parseInt(e.target.getAttribute("data-index")); // Ensure index is a number
      productsArray[index].quantity = parseInt(e.target.value); // Update quantity correctly
      updateTotalPayment(); // Update total price dynamically
    });
  });
}
function updateTotalPayment() {
  totalPaymentAmount =
    deliveryCharges -
    coupenDiscountAmount +
    productsArray.reduce((acc, product) => {
      return acc + Number(product.price) * Number(product.quantity);
    }, 0);

  totalPaymentDiv.innerHTML = `<strong>Total Payment: <span style="margin-left:30px">$${totalPaymentAmount}</span></strong>`;
  updatePaymentSection(); // Also update the payment button
}

// Function to remove a product
function attachRemoveListeners() {
  let removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      let index = e.target.getAttribute("data-index");
      productsArray.splice(index, 1);
      showProduct();
    });
  });
}
document.addEventListener("DOMContentLoaded", function () {
  deliveryCharges = 10;
  // Updating the   #deliveryCharges span tag
  document.querySelector(
    "#deliveryCharges .charge-amount"
  ).innerHTML = `$${deliveryCharges} <span style="margin-left:30px;font-weight:100">
  Express Delivery
  </span>`;

  // Update the  #couponDiscount span
  document.querySelector(
    "#couponDiscount .charge-amount"
  ).innerHTML = `$${coupenDiscountAmount} <span style="margin-left:30px;font-weight:100">
  No Coupen Available
  </span>`;
});

document.addEventListener("DOMContentLoaded", function () {
  showProduct();
});

// address-modal
let addNewAddressBtn = document.getElementById("add-new-address-btn");

addNewAddressBtn.addEventListener("click", function (e) {
  addressModalParent.classList.toggle("address-modal-open");
});

var changeBtn = document.getElementsByClassName("change-btn");
var addressModalParent = document.getElementById("address-modal-parent");

var modalCloseBtn = document.getElementById("modal-close-btn");
for (let i = 0; i < changeBtn.length; i++) {
  changeBtn[i].addEventListener("click", function () {
    addressModalParent.classList.toggle("address-modal-open");
    renderAddressList();
  });
}
modalCloseBtn.addEventListener("click", function (e) {
  addressModalParent.classList.remove("address-modal-open");
});

// setting the addresses
let addNewAddressForm = document.getElementById("add-new-address-form");
let addressList = document.getElementById("address-list");
let selectedAddress = document.getElementById("selected-address");
let billingAddress = document.getElementById("billing-address");
let shippingAddress = document.getElementById("shipping-address");
let setAddressBtn = document.getElementById("set-address-btn");
// billingAddress.addEventListener("change", function (e) {

// });
// address input fields
let flatNumber = document.getElementById("flatNumber");
let streetNumber = document.getElementById("streetNumber");
let cityName = document.getElementById("cityName");
let countryName = document.getElementById("countryName");
let zipCode = document.getElementById("zipCode");

let addresses = [
  {
    flatNumber: "A-223 Ground Floor",
    streetNumber: "20 ",
    cityName: "Mumbai",
    countryName: "India",
    zipCode: "73883",
    isBillingAddress: true,
    isShippingAddress: false,
  },
  {
    flatNumber: "C-109 Fourth Floor",
    streetNumber: "18",
    cityName: "delhi",
    countryName: "India",
    zipCode: "2025",
    isBillingAddress: false,
    isShippingAddress: true,
  },
];

addNewAddressForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let newAddress = {
    flatNumber: flatNumber.value.trim(),
    streetNumber: streetNumber.value.trim(),
    cityName: cityName.value.trim(),
    countryName: countryName.value.trim(),
    zipCode: zipCode.value.trim(),
    isBillingAddress: true,
    isShippingAddress: true,
  };

  if (Object.values(newAddress).some((value) => value === "")) {
    alert("please fill all details");
    return;
  }

  addresses.unshift(newAddress);

  renderAddressList();
  clearForm();
});
// clearing the form
function clearForm() {
  flatNumber.value = "";
  streetNumber.value = "";
  cityName.value = "";
  countryName.value = "";
  zipCode.value = "";
  newAddress.isBillingAddress = "";
  newAddress.isShippingAddress = "";
}

//rendering the addresses

function renderAddressList() {
  if (addresses.length === 0) {
    addressList.innerHTML = "No address added";
  } else {
    addressList.innerHTML = "";
  }

  addresses.forEach((address, index) => {
    let div = document.createElement("div");
    div.classList.add("address-card");

    div.innerHTML = `
      <p>${address.flatNumber}, ${address.streetNumber}, ${address.cityName}, ${address.countryName} - ${address.zipCode}</p>
      
      <form>
        <input id="billing-${index}" type="radio" name="address-${index}" value="billing">
        <label for="billing-${index}">Set as Billing Address</label>

        <input id="shipping-${index}" type="radio" name="address-${index}" value="shipping">
        <label for="shipping-${index}">Set as Shipping Address</label>
      </form>
    `;

    addressList.appendChild(div);
  });
}

let selectedAddressIndex = null;

let selectedAddressType = null;
// "billing" or "shipping"

addressList.addEventListener("change", function (e) {
  if (e.target.type === "radio") {
    selectedAddressIndex = e.target.id.split("-")[1];
    selectedAddressType = e.target.value;
  }
});

// getting the addresses

setAddressBtn.addEventListener("click", function () {
  if (selectedAddressIndex === null) {
    alert("Please select an address!");
    return;
  }

  let selectedAddress = addresses[selectedAddressIndex];

  let formattedAddress = `
    ${selectedAddress.flatNumber}, ${selectedAddress.streetNumber}, 
    ${selectedAddress.cityName}, ${selectedAddress.countryName} - ${selectedAddress.zipCode}
  `;

  if (selectedAddressType === "billing") {
    billingAddress.innerHTML = formattedAddress;
    addresses[selectedAddressIndex].isBillingAddress = true;
    addresses[selectedAddressIndex].isShippingAddress = false;
  } else if (selectedAddressType === "shipping") {
    shippingAddress.innerHTML = formattedAddress;
    addresses[selectedAddressIndex].isBillingAddress = false;
    addresses[selectedAddressIndex].isShippingAddress = true;
  } else {
    alert("Please select whether it's a Billing or Shipping address!");
    return;
  }

  console.log("Updated Addresses:", addresses);

  // closing modal
  addressModalParent.classList.remove("address-modal-open");
});

let showAddress = document.getElementById("show-address");
console.log(showAddress);
function formatAddress(address) {
  return `${address.flatNumber}, ${address.streetNumber}, ${address.cityName}, ${address.countryName}, ${address.zipCode}`;
}

// Function to update the addresses in the DOM
function updateAddresses() {
  const billingAddressElement = document.getElementById("billing-address");
  const shippingAddressElement = document.getElementById("shipping-address");
  console.log(billingAddressElement, shippingAddressElement);
  addresses.forEach((address) => {
    if (address.isBillingAddress) {
      billingAddressElement.textContent = formatAddress(address);
    }
    if (address.isShippingAddress) {
      shippingAddressElement.textContent = formatAddress(address);
    }
  });
}

// Call the function to update addresses
updateAddresses();

let paymentRadioForm = document.getElementById("payment-radio-form");
paymentRadioForm.addEventListener("submit", function (e) {
  e.preventDefault();
});

document.addEventListener("DOMContentLoaded", function () {
  // Get all radio buttons
  const radioButtons = document.querySelectorAll('input[name="payment-type"]');

  // Add event listener to each radio button
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", function () {
      // Remove any previously appended dynamic content
      const existingContent = document.querySelector(".dynamic-content");
      if (existingContent) {
        existingContent.remove();
      }

      const dynamicContent = document.createElement("div");
      dynamicContent.className = "dynamic-content";

      // Add content based on the selected radio button
      switch (this.value) {
        case "credit-card":
          dynamicContent.innerHTML = ` <div id="credit-card-form "
          class="credit-card-form-dynamic-content"
                  >
                
                   <label for="card-number">enter card number*</label>
    <input type="text" id="card-number" maxlength="16">
   <div class="payment-date">
    <div>
    <p>valid date*</p>  
    <select name="month" id="month" >
    <option value="">MM</option>
        <option value="01">Jan</option>
        <option value="02">Feb</option>
        <option value="03">Mar</option>
        <option value="04">Apr</option>
        <option value="05">May</option>
        <option value="06">Jun</option>
        <option value="07">Jul</option>
        <option value="08">Aug</option>
        <option value="09">Sep</option>
        <option value="10">Oct</option>
        <option value="11">Nov</option>
        <option value="12">Dec</option>
    </select>
    <select name="year" id="year" placeholder="YYYY">
        <option value="">YYYY</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
    </select>
    </div>
    <div>
        <label for="cvv">cvv*</label>
        <input type="number" placeholder="cvv" id="cvv" maxlength="3"
        style="border-radius:6px;border:1px solid black"
        >
    </div>
   <div class="validate-btn-container">
    <button id="validate-btn">Pay $${totalPaymentAmount}</button>
   </div>
   </div>

  <p id="error-message" style="color: red;"></p>
                  </div>`;
          break;
        case "netbanking":
          dynamicContent.innerHTML = ` <div id="credit-card-form "
          class="credit-card-form-dynamic-content"
                  >
                
                   <label for="card-number">enter card number*</label>
    <input type="text" id="card-number" maxlength="16">
   <div class="payment-date">
    <div>
    <p>valid date*</p>  
    <select name="month" id="month" >
    <option value="">MM</option>
        <option value="01">Jan</option>
        <option value="02">Feb</option>
        <option value="03">Mar</option>
        <option value="04">Apr</option>
        <option value="05">May</option>
        <option value="06">Jun</option>
        <option value="07">Jul</option>
        <option value="08">Aug</option>
        <option value="09">Sep</option>
        <option value="10">Oct</option>
        <option value="11">Nov</option>
        <option value="12">Dec</option>
    </select>
    <select name="year" id="year" placeholder="YYYY">
        <option value="">YYYY</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
    </select>
    </div>
    <div>
        <label for="cvv">cvv*</label>
        <input type="number" placeholder="cvv" id="cvv" maxlength="3">
    </div>
   <div class="validate-btn-container">
    <button id="validate-btn">Pay $${totalPaymentAmount}</button>
   </div>
   </div>

  <p id="error-message" style="color: red;"></p>
                  </div>`;
          break;
        case "upi":
          dynamicContent.innerHTML = ` <div id="credit-card-form "
          class="credit-card-form-dynamic-content"
                  >
                
                   <label for="card-number">enter card number*</label>
    <input type="text" id="card-number" maxlength="16">
   <div class="payment-date">
    <div>
    <p>valid date*</p>  
    <select name="month" id="month" >
    <option value="">MM</option>
        <option value="01">Jan</option>
        <option value="02">Feb</option>
        <option value="03">Mar</option>
        <option value="04">Apr</option>
        <option value="05">May</option>
        <option value="06">Jun</option>
        <option value="07">Jul</option>
        <option value="08">Aug</option>
        <option value="09">Sep</option>
        <option value="10">Oct</option>
        <option value="11">Nov</option>
        <option value="12">Dec</option>
    </select>
    <select name="year" id="year" placeholder="YYYY">
        <option value="">YYYY</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
    </select>
    </div>
    <div>
        <label for="cvv">cvv*</label>
        <input type="number" placeholder="cvv" id="cvv" maxlength="3">
    </div>
   <div class="validate-btn-container">
    <button id="validate-btn">Pay $${totalPaymentAmount}</button>
   </div>
   </div>

  <p id="error-message" style="color: red;"></p>
                  </div>`;
          break;
      }

      // Append the dynamic content below the selected radio button
      this.closest(".payment-heading").insertAdjacentElement(
        "afterend",
        dynamicContent
      );
    });
  });
});

const validateBtn = document.getElementById("validate-btn");
document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "validate-btn") {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const cardNumber = document
      .getElementById("card-number")
      .value.replace(/\s/g, ""); // Remove spaces
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    const cvv = document.getElementById("cvv").value;
    const errorMessage = event.target
      .closest(".dynamic-content")
      .querySelector("#error-message");
    if (!errorMessage) {
      console.log("Error message not found!");
      return;
    }

    // Reset error message
    errorMessage.textContent = "";

    // Validation rules
    let isValid = true;

    // 1. Card Number Validation
    const validCardNumbers = ["1001200130014001"]; // Add more valid card numbers if needed
    if (cardNumber.length !== 16 || !validCardNumbers.includes(cardNumber)) {
      errorMessage.textContent += "Card number must be 16 digits and valid.\n";
      isValid = false;
    }

    // 2. Expiration Date Validation
    if (month !== "03" || year !== "2023") {
      errorMessage.textContent += "Expiration date must be 03/2023.\n";
      isValid = false;
    }

    // 3. CVV Validation
    if (cvv !== "123") {
      errorMessage.textContent += "CVV must be 123.\n";
      isValid = false;
    }

    // If all validations pass
    if (isValid) {
      errorMessage.textContent = "All fields are valid!";
      errorMessage.style.color = "green";
    } else {
      errorMessage.style.color = "red";
    }
  }
});
