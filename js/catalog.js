/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the product options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //DONE: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select Product'
  selectElement.append(defaultOption);

  for (let i in Product.allProducts) {
    let products = Product.allProducts[i];
    let option = document.createElement('option');
    // option.value = i;
    option.textContent = products.name;
    selectElement.appendChild(option);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // DONE: Prevent the page from reloading
  event.preventDefault();


  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  let selectedItem = document.getElementById("items").value;
  let selectedQuan = document.getElementById("quantity").value;
  // const product = Product.allProducts[selectedItem];
  // cart.addItem(product, selectedQuan);
  cart.addItem(selectedItem, selectedQuan);

  // const select = $('#items');
  // TODO: get the quantity



  // TODO: using those, add one item to the Cart

}

// TODO: Update the cart count in the header nav with the number of items in the Cart
let count = 0;
let itemCount = document.getElementById('itemCount');
function updateCounter() {
  count = 0;
  let countArray = [];
  for (let i = 0; i < cart.items.length; i++) {
    let quantity = cart.items[i].quantity;
    countArray.push(Number(quantity));
    count += countArray[i];
  }
  itemCount.innerText = `: ${count} Items`
  // const itemCount = document.getElementById("itemCount");
  // itemCount.textContent = cart.items.length;

}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  let product = null;
  let cartContents = document.getElementById('cartContents');
  let item = document.getElementById('items').value;
  let quantity = document.getElementById('quantity').value;
  let cartPreview = document.createElement('div');
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (item === Product.allProducts[i].name) {
      product = Product.allProducts[i];
    }
  }

  cartPreview.innerText = `You added ${quantity} ${item} to your cart.`;
  cartContents.appendChild(cartPreview);

  // const cartCont = document.getElementById("cartContents");

  // TODO: Get the item and quantity from the form

  // let selectedItem = document.getElementById("items").value;
  // let selectedQuan = document.getElementById("quantity").value;
  // const listItem = document.createElement("li");
  // let itemQuan = `You added ${selectedQuan} ${Product.allProducts[selectedItem].name} to the cart.`;
  // listItem.textContent = itemQuan;

  // TODO: Add a new element to the cartContents div with that information

  // cartCont.appendChild(listItem);

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
