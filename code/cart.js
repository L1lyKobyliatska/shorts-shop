/* Активація посилання на каталог товарів */
const [...shorts] = document.querySelectorAll('[data-id="allShorts"]');
shorts.forEach(element => {
    element.addEventListener('click', () => { document.location = '../catalog page/index.html' });
});

/* Додавання товару в корзину */

const items = JSON.parse(localStorage.getItem('saveCartItems')),
    itemsNumber = document.querySelector('.cart-title'),
    cartTable = document.querySelector('.cart-table'),
    cartTotal = document.querySelector('.cart-total'),
    cartCheck = document.querySelector('.cart-check ');


if (items == null || items.length == 0) {
    const emptyCart = document.createElement('div');
    emptyCart.innerText = "YOUR CART IS EMPTY";
    itemsNumber.after(emptyCart);
    itemsNumber.innerText = 'YOUR CART (0 ITEMS)';
    cartTable.classList.add('hidden');
    cartTotal.classList.add('hidden');
    cartCheck.classList.add('hidden');
    cartTable.classList.remove('table-form');
    cartTotal.classList.remove('flexible');
    cartCheck.classList.remove('visible');
} else if (items != null) {
    cartTable.classList.remove('hidden');
    cartTotal.classList.remove('hidden');
    cartCheck.classList.remove('hidden');
    cartTable.classList.add('table-form');
    cartTotal.classList.add('flexible');
    cartCheck.classList.add('visible');

    const [...nextItem] = document.querySelectorAll('[data-id="nextItem"]');
    items.forEach(el => {
        nextItem[nextItem.length - 1].insertAdjacentHTML('afterend', `<div class="item__img item-fon">
    <img src="${el.img}" alt="short">
    </div>
    <div class="item__info item-fon">
    <p>
        Sportif USA
    </p>
    <h2>
        ${el.title}
    </h2>
    <div>
        Color: ${el.color}
    </div>
    <div>
        Size: ${el.size}
    </div>
    </div>
    <div class="item-fon">
    $${el.price}
    </div>
    <div class="item__num item-fon">
    <button class="item__minus">
                            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.7804 11.5556L19.6805 2.65536C19.8865 2.44951 20 2.17472 20 1.88171C20 1.58871 19.8865 1.31391 19.6805 1.10806L19.0252 0.452619C18.5982 0.0261187 17.9042 0.0261187 17.4779 0.452619L10.0041 7.92638L2.52209 0.444326C2.31608 0.238475 2.04145 0.124817 1.74861 0.124817C1.45544 0.124817 1.1808 0.238475 0.974627 0.444326L0.31951 1.09977C0.113497 1.30578 2.38419e-06 1.58041 2.38419e-06 1.87342C2.38419e-06 2.16643 0.113497 2.44122 0.31951 2.64707L9.22773 11.5556C9.4344 11.762 9.71033 11.8753 10.0037 11.8746C10.2981 11.8753 10.5739 11.762 10.7804 11.5556Z" fill="#A04955"/>
                                </svg>                                
                        </button>
    <input type="number" name="number" id="number" value="${el.value}">
    <button class="item__plus">
                            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.21862 0.444077L0.318533 9.34433C0.112518 9.55018 -0.000976563 9.82498 -0.000976563 10.118C-0.000976563 10.411 0.112518 10.6858 0.318533 10.8916L0.973812 11.5471C1.4008 11.9736 2.09478 11.9736 2.52112 11.5471L9.99488 4.07332L17.4769 11.5554C17.6829 11.7612 17.9576 11.8749 18.2504 11.8749C18.5436 11.8749 18.8182 11.7612 19.0244 11.5554L19.6795 10.8999C19.8855 10.6939 19.999 10.4193 19.999 10.1263C19.999 9.83327 19.8855 9.55847 19.6795 9.35262L10.7713 0.444077C10.5646 0.237737 10.2887 0.124405 9.99537 0.125055C9.7009 0.124405 9.42513 0.237737 9.21862 0.444077Z" fill="#A04955"/>
                                </svg>    
                        </button>
    </div>
    <div data-id="nextItem" class="item__total item-fon">
    $
    <span>
        ${el.price * el.value}
    </span>
    <button type="button" class="btn-close" aria-label="Закрыть"></button>
    </div>`)
    });

    // Виведення кількості товару в кошику

    const [...itemValue] = document.querySelectorAll('.item__num input');
    let itemsNum = 0;

    itemValue.map(el => itemsNum = parseInt(itemsNum) + parseInt(el.value));
    itemsNumber.innerText = `YOUR CART (${itemsNum} ITEM)`;

    // Виведення вартості кошику
    let subtotal = 0;
    const [...itemTotal] = document.querySelectorAll('.item__total span');

    itemTotal.map(el => subtotal = +parseFloat(subtotal).toFixed(2) + +parseFloat(el.innerHTML).toFixed(2))
    cartTotal.children[1].innerText = `$${subtotal.toFixed(2)}`;

    // Збільшення товару в кошику
    let [...btnPlus] = document.querySelectorAll('.item__plus'),
    [...btnMinus] = document.querySelectorAll('.item__minus');
    console.dir(items)
    btnPlus.forEach((el, i) => {
        el.addEventListener('click', (e) => {
            items[items.length - (i + 1)].value += 1;
            localStorage.setItem('saveCartItems', JSON.stringify(items));
            location.reload()
            console.dir(items[items.length - (i + 1)])
        })
    });

    // Збільшення товару в кошику
    btnMinus.forEach((el, i) => {
        el.addEventListener('click', (e) => {
            items[items.length - (i + 1)].value -= 1;
            localStorage.setItem('saveCartItems', JSON.stringify(items));
            location.reload()
            console.dir(items[items.length - (i + 1)])
        })
    });

    // Видалення товару з кошика

    let [...btnCleen] = document.querySelectorAll('.btn-close');

    btnCleen.forEach((el, i) => {
        el.addEventListener('click', (e) => {
            let saveCartItems = items.filter(element => element !== items[items.length - (i + 1)])
            console.dir(saveCartItems)
            localStorage.setItem('saveCartItems', JSON.stringify(saveCartItems));
            location.reload()
        })
    })
}
