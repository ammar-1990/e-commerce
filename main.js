// elements assignings

let start = document.querySelector("#start");
let title = document.querySelector(".title");
let myForm = document.querySelector("#first-form");
let caret = document.querySelector(".caret");
let myCart = document.querySelector(".my-cart");
let searchBtn = document.getElementById("sub");
let searchInput = document.getElementById("search");
// let sortInput = document.getElementById("sort");
// let maxInput = document.getElementById("max");
// let minInput = document.getElementById("min");
let resultsWraper = document.querySelector(".results-wraper");
let myProducts = document.querySelector(".products");
let indicator = document.querySelector('.amount-caret')
let removeAll=document.querySelector('.remove-all button');
let theTotal=document.querySelector('.the-total')
let searchOption = document.querySelectorAll('input[type="radio"]')
let searchValue = document.querySelector('.search-type input[type="text"]')
let load = document.querySelector('.load-layer')
let moreInfo=document.querySelector('.more-info-layer')


// events
// animation
let anime = document.querySelector(".anime");
let list = document.querySelector("ul");
anime.addEventListener("animationend", () => {
  list.classList.remove("animated");
  setTimeout(() => {
    list.classList.add("animated");
  }, 1);
});

start.addEventListener("click", () => {
  title.classList.add("hide");
  myForm.classList.remove("hide");
});

// toggle caret
caret.addEventListener("click", () => {
  myCart.classList.toggle("show-cart");
});

// search event

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  load.classList.remove('disable')
  load.classList.remove('disappear')
      load.classList.add('appear')
  
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "b1d8064e85msh358693e78f0c3fep15184cjsn7b2984d11c67",
  //     "X-RapidAPI-Host": "amazon23.p.rapidapi.com",
  //   },
  // };
  // let myUrl = `https://amazon23.p.rapidapi.com/product-search?query=${searchInput.value}`;
let myUrl="./products.json"
  getData(myUrl)
    .then((myData) => {
      showData(myData);
     
     
   

   
      return myData;
    })
    .then((myData) => {
      let addCart = [...document.querySelectorAll(".add-cart")];
      
      addCart.forEach((ele) =>{
// check if exist
let botId=ele.dataset.id
let cartArr=JSON.parse(localStorage.getItem('cart'))
if(cartArr)
{let added=cartArr.find(ele=>ele.asin===botId)
if(added)
{
ele.classList.add('added-cart')
ele.innerText='added to cart'
}
}
// add to cart
        ele.addEventListener("click", (e) => {
          if(!e.target.classList.contains('added-cart')){
            e.target.classList.add('added-cart')
            e.target.innerText='added to cart';
          let id = e.target.dataset.id;
        
          let myElement = myData.find((ele) => ele.asin === id);
        
          let myCartItem = {
            ...myElement,
            amount: 1,
           
          }
          myCartItem.totalPrice=myCartItem.price.current_price*myCartItem.amount;
         
          
          //  add to local storage
          let cartArr;
          localStorage.getItem("cart")
            ? (cartArr = JSON.parse(localStorage.getItem("cart")))
            : (cartArr = []);
          cartArr.push(myCartItem);
          localStorage.setItem("cart", JSON.stringify(cartArr));
          // show in cart
          myProducts.innerHTML = `
        <div class="product enter-left">
<div class="product-wraper">
    <div class="cart-img"><img src=${myCartItem.thumbnail} alt=""></div>
    <div class="product-info">
        <p class="product-title">${myCartItem.title}</p>
        <p class="product-price"><span>price</span>  ${myCartItem.price.current_price} $</p>
        <p class="total-price"><span>Total price</span>  <span>${myCartItem.totalPrice}</span> $</p>
    </div>
    
</div>
<div class="product-control">
    <div class="product-amount"><span data-id=${myCartItem.asin} class=" change add">+</span><span class="the-amount">${myCartItem.amount} </span><span data-id=${myCartItem.asin} class="minus change">-</span></div>
    <button class="product-remove" data-id=${myCartItem.asin}>remove</button>
</div>
<div class="see-more">
<button class="btn details" data-id=${myCartItem.asin}>see more </button>
</div>
            </div>
        
       `+ myProducts.innerHTML;
      }
      setTimeout(()=>{document.querySelector('.enter-left').classList.remove('enter-left')},500)
      
      setIndicator();
      getTotal ()
    })
    });
    });
});



// remove from cart
document.addEventListener('click',(e)=>{
  if(e.target.classList.contains('product-remove'))
  {let id = e.target.dataset.id;
    let cartArr=JSON.parse(localStorage.getItem('cart'))
    
   cartArr=cartArr.filter(ele=>ele.asin!==id)
   localStorage.setItem('cart',JSON.stringify(cartArr))
   e.target.closest('.product').classList.add('to-right')
   setTimeout(()=>{
    e.target.closest('.product').remove()
   },600)
   setIndicator()
   getTotal ()
   
let bottons =[...document.querySelectorAll('.add-cart')]
let botton =bottons.find(ele=>ele.dataset.id===id)
if(botton){
botton.innerText='add to cart';
botton.classList.remove('added-cart')
}






  }
})




document.addEventListener('DOMContentLoaded',()=>{
showCart();
setIndicator();
getTotal ()
})





// add and minus 
document.addEventListener('click',(e)=>{
 
  if(e.target.classList.contains('change'))
  changeValue(e);
  getTotal ()
})


// choose search type 
searchOption.forEach(ele=>{
  ele.addEventListener('click',()=>
  {
    document.querySelector('input[checked]').removeAttribute("checked");
    ele.setAttribute("checked",true)
  })
})

// search proccess
searchValue.addEventListener('keyup',()=>{
let option= document.querySelector('input[checked]')
let value = searchValue.value;
let cartArr=JSON.parse(localStorage.getItem('cart'))
let result= '';
if(cartArr)
cartArr.forEach(ele=>{

  if (option.value==="name")
  {
  if(ele.title.toLowerCase().includes(value.toLowerCase()))
  result+=`<div class="product ">
  <div class="product-wraper">
      <div class="cart-img"><img src=${ele.thumbnail} alt=""></div>
      <div class="product-info">
          <p class="product-title">${ele.title}</p>
          <p class="product-price"><span>price</span>  ${ele.price.current_price} $</p>
          <p class="total-price"><span>Total price</span>  <span>${ele.totalPrice}</span> $</p>
      </div>
      
  </div>
  <div class="product-control">
      <div class="product-amount"><span data-id=${ele.asin} class=" change add">+</span><span class="the-amount">${ele.amount} </span><span data-id=${ele.asin} class="minus change">-</span></div>
      <button class="product-remove" data-id=${ele.asin}>remove</button>
  </div>
  <div class="see-more">
  <button class="btn details" data-id=${ele.asin}>see more </button>
  </div>
              </div>
          
         `
  }
         else if(option.value==="price")
         { console.log(ele.price.current_price + "  " + value)
          if(ele.price.current_price==value)
          {
           
            result+=`<div class="product ">
  <div class="product-wraper">
      <div class="cart-img"><img src=${ele.thumbnail} alt=""></div>
      <div class="product-info">
          <p class="product-title">${ele.title}</p>
          <p class="product-price"><span>price</span>  ${ele.price.current_price} $</p>
          <p class="total-price"><span>Total price</span>  <span>${ele.totalPrice}</span> $</p>
      </div>
      
  </div>
  <div class="product-control">
      <div class="product-amount"><span data-id=${ele.asin} class=" change add">+</span><span class="the-amount">${ele.amount} </span><span data-id=${ele.asin} class="minus change">-</span></div>
      <button class="product-remove" data-id=${ele.asin}>remove</button>
  </div>
  <div class="see-more">
  <button class="btn details" data-id=${ele.asin}>see more </button>
  </div>
              </div>
          
         `
          }
         }
}
)

myProducts.innerHTML=result
if(value ==='')
showCart()

}
)

// get details

document.addEventListener('click',(e)=>{
if(e.target.classList.contains('details'))
moreInfo.classList.remove('disable')
moreInfo.classList.add('appear')
})


// close btn
document.addEventListener('click',(e)=>{
  if(e.target.classList.contains('close'))
  {
moreInfo.classList.replace('appear','disappear')
setTimeout(() => {
  moreInfo.classList.add('disable')
  moreInfo.classList.remove('disappear')
}, 800);
}
}
)



document.addEventListener("click",(e)=>{

  if (e.target.classList.contains('small-imgs'))
  {
  
  let img=document.querySelector('.big-img')
  img.style.opacity='0';


  setTimeout(() => {  img.setAttribute('src',`${e.target.getAttribute('src')}`)
 img.style.opacity='1'
}, 300);
 
  

  

  
  }
} 
)

// flip 
document.addEventListener("click",(e)=>{
  if(e.target.classList.contains('flip')){
    let myInfo=document.querySelector('.more-info')
    myInfo.classList.toggle('rotate')
  }
})






// functions
async function getData(url, option) {
  try {
    let response = await fetch(url, option);
    let data = await response.json();

    let myData = data.result;
    if (myData){
      
    return myData;
    }
   
    
  
  } catch (err) {
    resultsWraper.innerHTML=`
    <p class="invest">No data available...you can either check the connection or your input value</p>`
    load.classList.add('disappear')
    load.classList.remove('appear')
    setTimeout(() => {
      load.classList.add('disable')
    }, 500);
  window.scrollBy(0,innerHeight)
    console.log(err);
  }
}

function showData(data) {
  if(data){
  let resultShow = "";
  data.forEach((element) => {
    resultShow += `<div class="result">
<div class="img">
  <img
    src=${element.thumbnail}
    alt=""
  />
  <span data-id=${element.asin} class="add-cart"
    >Add to cart</span
  >
</div>
<div class="info">
  <p class="pro-title">
   ${element.title}
  </p>
  <p class="price"><span>price </span> ${element.price.current_price} $</p>
  <div class='result-btn'>
<button data-id=${element.asin} class="btn details">see more</button>
</div>
  
</div>

</div>
`;
  });

  resultsWraper.innerHTML = resultShow;
  let loadedImgs=[...resultsWraper.getElementsByTagName('img')]  //data imgs onload listener to tray to shut the anime
    let i =0;
  loadedImgs.forEach(ele=>
    ele.addEventListener('load',()=>{
     i++
    if(i===loadedImgs.length)
    {
      load.classList.add('disappear')
      setTimeout(() => {
        load.classList.add('disable')
      }, 500);
      resultsWraper.scrollIntoView();
    }
    })
    )
}

}

function showCart()
{
  let cartArr=JSON.parse(localStorage.getItem('cart'))
  let cart='' ;
  if(cartArr)
cartArr.sort((a,b)=>-1).forEach(ele=>
 cart+=`
 <div class="product">
<div class="product-wraper">
    <div class="cart-img"><img src=${ele.thumbnail} alt=""></div>
    <div class="product-info">
        <p class="product-title">${ele.title}</p>
        <p class="product-price"><span>price</span>  ${ele.price.current_price} $</p>
        <p class="total-price"><span>Total price</span> <span> ${ele.totalPrice} </span> $</p>
    </div>
    
</div>
<div class="product-control">
    <div class="product-amount"><span data-id=${ele.asin} class="add change">+</span><span  class="the-amount">${ele.amount} </span><span data-id=${ele.asin} class="minus change">-</span></div>
    <button class="product-remove" data-id=${ele.asin}>remove</button>
</div>
<div class="see-more">
<button class="btn details" data-id=${ele.asin}>see more </button>
</div>
            </div>
 ` )
 myProducts.innerHTML=cart;

}


// remove all

removeAll.addEventListener('click',removeAllproducts)

function changeValue(e) {
let id = e.target.dataset.id;
let myAmount;
let cartArr=JSON.parse(localStorage.getItem('cart'))
myElement= cartArr.find(ele=>ele.asin===id)

if(e.target.classList.contains('add'))
{
myElement.amount+=1;
 myAmount = e.target.nextElementSibling;
}
else 
{
   myAmount = e.target.previousElementSibling;
  if(myElement.amount===1)
  myElement.amount=1;
  else
  myElement.amount-=1
}
 newValue=myElement.amount;

cartArr=cartArr.map(ele=>{
  if(ele.asin===id){
 
    ele.amount=newValue
    ele.totalPrice=ele.price.current_price*ele.amount;
   
    return ele
  }
  else {
    return ele
  }

  
})

localStorage.setItem('cart',JSON.stringify(cartArr))

myAmount.innerText=newValue
e.target.parentElement.parentElement.parentElement.firstElementChild.children[1].children[2].children[1].innerText=myElement.totalPrice


}

function setIndicator (){
let cartArr=JSON.parse(localStorage.getItem('cart'))
if(cartArr) {
 let lengthNum = cartArr.length;
if(lengthNum==0)
{
   indicator.classList.remove('active-caret')
   indicator.innerText=lengthNum
 } else {
  indicator.classList.add('active-caret')
   indicator.innerText=lengthNum
}
}
else{
  indicator.innerText=0
  indicator.classList.remove('active-caret')
}


}


function removeAllproducts(){
  localStorage.removeItem('cart');
  myProducts.innerHTML="";

  let btns =document.querySelectorAll('.added-cart')

  btns.forEach(ele=>{
    ele.classList.remove('added-cart')
    ele.innerText="add to cart"
    
  })
  setIndicator();
}


function getTotal (){
  let cartArr=JSON.parse(localStorage.getItem('cart'))
  let result;
  if(cartArr)
  {

    
   result= cartArr.reduce((sum,ele)=>{
let result = sum + ele.totalPrice

    return result
  
    }
    
  
 ,0 )
}
else 
result=0;
theTotal.innerText=`Total Price ${result} $`
}
