
const [...shorts] = document.querySelectorAll('[data-id="allShorts"]');
shorts.forEach(element => {
    element.addEventListener('click', () => { document.location = '../catalog_page/index.html' });
});

const productCard = JSON.parse(localStorage.getItem('someCard')),
    prodName = document.querySelector('.short-product__name');

const [...prodImg] = document.querySelectorAll('[data-id="prodImg"]'),
    imgBack = document.querySelector('[data-id="imgBack"]'),
    prodPrice = document.querySelector('.short-product__price');

const [...colorImgs] = document.querySelectorAll('.short-product__btn-color img');
const [...shortBtnColor] = document.querySelectorAll('.short-product__btn-color img'),
    colorItem = document.querySelector('.short-product__body');

const [...btnSize] = document.querySelectorAll('.short-product__size'),
    sizeItem = document.querySelector('.short-product__size-body'),
    addCart = document.querySelector('.short-product__btn'),
    cartItem = {
        id: '',
        img: '',
        title: '',
        color: '',
        size: '',
        price: ''
    },
    validate = (r, v) => r.test(v);


prodName.innerHTML = `${productCard.product[0].title}<span>ITEM # ${productCard.product[0].id}</span>`;
cartItem.id = productCard.product[0].id;
cartItem.title = productCard.product[0].title;

prodImg.forEach(el => el.src = productCard.product[0].image);
cartItem.img = productCard.product[0].image;

if (productCard.product[0].imgBack !== undefined) {
    imgBack.src = productCard.product[0].imgBack;
} else if (productCard.product[0].imgBack == undefined) {
    imgBack.classList.add('hidden')
}

imgBack.addEventListener('click', () => {
    prodImg[0].src = imgBack.src;
});

prodImg[1].addEventListener('click', () => {
    prodImg[0].src = prodImg[1].src;
});

prodPrice.innerHTML = `<span>As low as</span> <br>
$${parseFloat(productCard.product[0].price).toFixed(2)}`;
cartItem.price = productCard.product[0].price;

colorImgs.forEach((element, index) => {
    if (productCard.product[0].color.includes(element.alt)) {
        shortBtnColor[index].classList.remove('hidden');
        shortBtnColor[index].classList.add('visible');
    } else {
        shortBtnColor[index].classList.add('hidden');
        shortBtnColor[index].classList.remove('visible');
    }
});

colorItem.addEventListener('click', (e) => {
    if (e.target.alt != undefined) {
     colorImgs.forEach((el) => {
        el.classList.remove('choice');
    });
    e.target.classList.add('choice');
    cartItem.color = e.target.alt;  
    }
})

btnSize.forEach((element, index) => {
    if (productCard.product[0].size.includes(parseInt(element.innerText))) {
        btnSize[index].classList.remove('hidden');
        btnSize[index].classList.add('visible');
    } else {
        btnSize[index].classList.add('hidden');
        btnSize[index].classList.remove('visible');
    }
});

sizeItem.addEventListener('click', (e) => {
    console.dir(validate(/^\d\d/, e.target.dataset.id))
    if (validate(/^\d\d/, e.target.dataset.id)) {
    btnSize.forEach((el) => {
        el.classList.remove('choice');
    });
    e.target.classList.add('choice');
    cartItem.size = e.target.innerText;    
    }
    

});

addCart.addEventListener('click', () => {
    if (cartItem.color !== '' && cartItem.size !== '') {
        let saveCartItems = JSON.parse(localStorage.getItem('saveCartItems'));
        console.dir(saveCartItems)
        if (saveCartItems != null) {
            let flag = false;
            saveCartItems.forEach((el, i) => {
                if (el.id == cartItem.id && el.color == cartItem.color && el.size == cartItem.size) {
                    el.value += 1;
                    flag = true;
                } else {
                    return;
                }
            })
            if (!flag) {
                cartItem.value = 1;
                saveCartItems.push(cartItem);
            };
        } else {
            cartItem.value = 1;
            saveCartItems = [cartItem];
        }
        localStorage.setItem('saveCartItems', JSON.stringify(saveCartItems));
        document.location = '../basket/index.html'
    } else {
        return
    }
})

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

