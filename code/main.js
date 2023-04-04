import allProducts from "./shorts.js";
import allPants from "./pants.js";

/* Активація посилання на каталог товарів */
const [...shorts] = document.querySelectorAll('[data-id="allShorts"]');
shorts.forEach(element => {
    element.addEventListener('click', () => { document.location = '../catalog_page/index.html' });
});

// Відкривання сторінки товару (шорти)

const [...btnProduct] = document.querySelectorAll('[data-name="shorts"]'),
product = {
    id: '',
    product: []
};

btnProduct.forEach(element => {
    element.addEventListener('click', () => {
        product.id = element.dataset.id;
        product.product = allProducts.filter(n => n.id == product.id);
        localStorage.setItem('someCard', JSON.stringify(product));
        document.location = '../product page/index.html'
    });
});

// Відкривання сторінки товару (штани)

const [...btnPants] = document.querySelectorAll('[data-name="pants"]');

btnPants.forEach(element => {
    element.addEventListener('click', () => {
        product.id = element.dataset.id;
        product.product = allPants.filter(n => n.id == product.id);
        localStorage.setItem('someCard', JSON.stringify(product));
        document.location = '../product page/index.html'
    });
});
