import { menuArray } from '/data.js'
import loading from '/images/loading.svg'

const menuItemList = document.getElementById('menu-item-list')
const checkout = document.getElementById('checkout')
const totalPrice = document.getElementById('price')
const itemObjArr = []

document.addEventListener('click', function(e){
    if (e.target.dataset.additem){ 
    console.log(e.target.dataset.additem)
        addItem(e.target.dataset.additem)
    }
    else if (e.target.dataset.removeitem){
        removeItem(e.target.dataset.removeitem)
    }
    else if (e.target.id === "submit-order"){
        submitOrder()
    }
})

payForm.addEventListener("submit", confirmationMessage)

function confirmationMessage(e){
    const name = document.getElementById('name').value
    document.getElementById('pay-form').innerHTML = `
    <img src="${loading}">`
    setTimeout(function(){
        document.getElementById('pay-container').classList.add('hidden')
         document.getElementById('checkout-container').innerHTML = `
        <h3 class="confirmation-message">Thanks ${name}! Your order is on its way!</h3>
        `
    }, 1500)
    e.preventDefault();
}

function submitOrder(){
    document.getElementById('pay-container').classList.remove('hidden')
}

function removeItem(itemId){
    const targetItemObject = itemObjArr.filter(function(item){
        return item.id === parseInt(itemId)
    })[0]
    
    const index = itemObjArr.indexOf(targetItemObject)
    itemObjArr.splice(index, 1) 
    console.log(itemObjArr)
    renderCheckOut()
    
    itemObjArr.length === 0 ? document.getElementById('checkout-container').classList.add('hidden') : null
}

function addItem(itemId){
    const targetItemObject = menuArray.filter(function(item){
        return item.id === parseInt(itemId)
    })[0]
    itemObjArr.push(targetItemObject)  
    console.log(itemObjArr)
    renderCheckOut()
}

function renderCheckOut(){
    const checkoutContainer = document.getElementById('checkout-container').classList.remove('hidden') //Show checkout container
    let sum = 0
    let checkoutHtml = ''
    itemObjArr.forEach((itemObj) => {
        checkoutHtml += `
    <div class="checkout-items">
        <div class="item">${itemObj.name}<p data-removeitem="${itemObj.id}" id="delete-item" class="delete-item">Delete</p></div>
        <div class="price">£${itemObj.price}</div>
    </div>`
        sum += itemObj.price 
    })
     checkout.innerHTML = checkoutHtml
    totalPrice.innerHTML = `£${sum}`
}

function render(){
    let menuHtml = ''
    menuArray.map((item) => {
        menuHtml += `
        <div class="menu-item" id="menu-item">
                    <h2 class="emoji">${item.emoji}</h2>
                    <div class="menu-info">
                        <h3>${item.name}</h3>
                        <p></span>${item.ingredients.join(', ')}</span><p>
                        <h3>£${item.price}</h3>
                    </div>
                    <input data-additem="${item.id}" class="btn-addItem" type="button" value="+">
                </div>
        `
    })
    menuItemList.innerHTML = menuHtml
}

render()