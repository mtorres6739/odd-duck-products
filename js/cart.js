/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  let tbody = document.querySelector('tbody');
  // TODO: Iterate over the items in the cart

  for (let i = 0; i < cart.items.length; i++) {
    let tr = document.createElement('tr');
    let tDelete = document.createElement('td');
    tDelete.textContent = 'X';
    tDelete.classList.add('delete');
    tDelete.id = i;
    tr.appendChild(tDelete);

    let tQty = document.createElement('td');
    tQty.textContent = cart.items[i].quantity;
    tr.appendChild(tQty);
    let tableItem = document.createElement('td');
    tableItem.textContent = cart.items[i].product;
    tr.appendChild(tableItem);
    tbody.appendChild(tr);
  }




  // for (let item of cart.items) {
  //   // TODO: Create a TR
  //   const tr = document.createElement('tr');
  //   // TODO: Create a TD for the delete link, quantity,  and the item

  //   const tdEl = document.createElement('td');
  //   tdEl.textContent = item.product.name;
  //   const qtyEl = document.createElement('td');
  //   qtyEl.textContent = item.quantity;
  //   const xEl = document.createElement('td');
  //   xEl.textContent = 'X';
  //   xEl.addEventListener('click', removeItemFromCart);
  //   // TODO: Add the TR to the TBODY and each of the TD's to the TR
  //   tr.append(tdEl, qtyEl, xEl);
  //   tbody.append(tr);

  // }

}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  event.preventDefault();

  if (event.target.classList.contains('delete')) {
    cart.removeItem(parseInt(event.target.id));
    cart.saveToLocalStorage();
    renderCart();
  }




  // const parent = event.target.parentNode;
  // const name = parent.querySelector('td:nth-of-type(3)').textContent;

  // for (let item of cart.items) {
  //   if (item.product.name === name) {
  //     cart.removeItem(item);
  //   }
  // }

  // // TODO: Save the cart back to local storage
  // localStorage['cart'] = JSON.stringify(cart.items);
  // // TODO: Re-draw the cart table
  clearCart();
  showCart();

}

// This will initialize the page and draw the cart on screen
renderCart();
