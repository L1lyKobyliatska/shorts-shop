import allProducts from "./shorts.js";

const [...shorts] = document.querySelectorAll('[data-id="allShorts"]');
shorts.forEach(element => {
    element.addEventListener('click', () => { document.location = '../catalog page/index.html' });
});

const [...imgs] = document.querySelectorAll('[data-id="img"]'),
    [...shortName] = document.querySelectorAll('[data-id="shortName"]'),
    [...shortPrice] = document.querySelectorAll('.short__price'),
    btn1 = document.querySelector('[data-id="btn1"]'),
    btn2 = document.querySelector('[data-id="btn2"]'),
    btn3 = document.querySelector('[data-id="btn3"]'),
    btn4 = document.querySelector('[data-id="btn4"]'),
    btn5 = document.querySelector('[data-id="btn5"]'),
    btnNext = document.querySelector('[data-id="next"]'),
    [...btns] = document.querySelectorAll('.page-pagination__item'),
    [...hiddenCard] = document.querySelectorAll('.short'),
    btnColor = document.querySelector('[data-id="color"]'),
    btnSize = document.querySelector('[data-id="size"]'),
    [...btnProduct] = document.querySelectorAll('.short'),
    changeCard = function (a, n, m) {
        a.forEach((e, i) => {
            if (i >= n && i < m) {
                btnProduct[i - n].dataset.id = e.id;
                imgs[i - n].src = e.image;
                shortName[i - n].innerText = e.title;
                shortPrice[i - n].innerHTML = `<span>As low as</span> $${parseFloat(e.price).toFixed(2)}`;

                let [...colorImgs] = document.querySelectorAll(`[data-id="${i - (n - 1)}"] img`),
                [...shortBtnColor] = document.querySelectorAll(`[data-id="${i - (n - 1)}"]`);

                colorImgs.forEach((element, index) => {
                    if (e.color.includes(element.alt)) {
                        shortBtnColor[index].classList.remove('hidden');
                        shortBtnColor[index].classList.add('visible');
                    } else {
                        shortBtnColor[index].classList.add('hidden');
                        shortBtnColor[index].classList.remove('visible');
                    }
                })
            }
        });
        btns.forEach((el) => {
            el.classList.remove('current')
        });

    },
    hidden = function (b) {
        b.classList.add('hidden');
        b.classList.remove('visible');
    },
    showCard = function () {
        hiddenCard.forEach(e => e.classList.remove('cover-up'));
    },
    page1 = function (a) {
        changeCard(a, 0, 10);
        btn1.classList.add('current');
        showCard();
        hidden(btn3);
        hidden(btn4);
        hidden(btn5);
    },

    page2 = function (a) {
        changeCard(a, 10, 20);
        btn2.classList.add('current');
        showCard();
    },

    page3 = function (a) {
        if (a.length < 30) {
            let n = 30 - a.length;
            hidden(btn4);
            hidden(btn5);
            for (let i = 10 - n; i < 10; i++) {
                hiddenCard[i].classList.add('cover-up');
            }
            changeCard(a, 20, 30);
        } else {
            changeCard(a, 20, 30);
            showCard();
        };
        btn3.classList.add('current');
    },

    page4 = function (a) {
        if (a.length < 40) {
            let n = 40 - a.length;
            hidden(btn5);
            for (let i = 10 - n; i < 10; i++) {
                hiddenCard[i].classList.add('cover-up');
            }
            changeCard(a, 30, 40);
        } else {
            changeCard(a, 30, 40);
            showCard();
        };
        btn4.classList.add('current');
    },

    page5 = function (a) {
        if (a.length < 50) {
            let n = 50 - a.length;
            for (let i = 10 - n; i < 10; i++) {
                hiddenCard[i].classList.add('cover-up');
            }
        }
        changeCard(a, 40, 50);
        btn5.classList.add('current');
    },

    nextPage = function (a) {
        let current = document.querySelector('.current'),
            next = document.querySelector('.current + li');
        next.classList.remove('hidden');
        next.classList.add('visible');
        switch (next.innerText) {
            case '2': page2(a);

                break;
            case '3': page3(a);
                if (a.length < 30) {
                    let n = 30 - a.length;
                    for (let i = 10 - n; i < 10; i++) {
                        hiddenCard[i].classList.add('cover-up');
                    }
                }
                break;
            case '4':
                if (a.length < 30) {
                    next.classList.add('hidden');
                    next.classList.remove('visible');
                    return
                } else if (a.length > 30) {
                    page4(a);
                }
                if (a.length < 40) {
                    let n = 40 - a.length;
                    for (let i = 10 - n; i < 10; i++) {
                        hiddenCard[i].classList.add('cover-up');
                    }
                };
                break;
            case '5':
                if (a.length < 40) {
                    next.classList.add('hidden');
                    next.classList.remove('visible');
                    return
                } else if (a.length > 40) {
                    page5(a);
                }
                if (a.length < 50) {
                    let n = 50 - a.length;
                    for (let i = 10 - n; i < 10; i++) {
                        hiddenCard[i].classList.add('cover-up');
                    }
                };
                break;
        };
        next.classList.add('current');
    },
    goods = {
        allGoods: allProducts,
        colors: [],
        sizes: []
    },
    validate = (r, v) => r.test(v),
    filter = function (a) {
        if (goods.colors.length == 0 && goods.sizes.length == 0) {
            goods.allGoods = a;
        } else if (goods.sizes.length > 0 || goods.colors.length > 0) {
            goods.allGoods = a.filter((n) => (!goods.sizes.length ||
                n.size.includes(parseInt(goods.sizes[0]) || parseInt(goods.sizes[1]) || parseInt(goods.sizes[2]) || parseInt(goods.sizes[3]) || parseInt(goods.sizes[4]) || parseInt(goods.sizes[5]) || parseInt(goods.sizes[6]) || parseInt(goods.sizes[7]) || parseInt(goods.sizes[8]) || parseInt(goods.sizes[9]))) && (!goods.colors.length ||
                    n.color.includes(goods.colors[0] || goods.colors[1] || goods.colors[2] || goods.colors[3] || goods.colors[4] || goods.colors[5] || goods.colors[6])));
        }
    },
    product = {
        id: '',
        product: []
    };
    
// Відкривання сторінки товару
btnProduct.forEach(element => {
    element.addEventListener('click', () => {
        product.id = element.dataset.id;
        product.product = allProducts.filter(n => n.id == product.id);
        localStorage.setItem('someCard', JSON.stringify(product));
        document.location = '../product page/index.html'
    });
});

btnColor.addEventListener('click', (c) => {
    if (c.target.classList[0] !== 'choice' && (c.target.alt !== undefined)) {
        c.target.classList.add('choice');
    } else if (c.target.classList[0] == 'choice') {
        c.target.classList.remove('choice');
    }
    goods.colors = [...document.querySelectorAll('.choice')].map((n) => n.alt);
    filter(allProducts);
    page1(goods.allGoods);

});

btnSize.addEventListener('click', (size) => {
    if (size.target.classList[3] !== 'out' && validate(/^\d\d/, size.target.dataset.id)) {
        size.target.classList.add('out');
    } else if (size.target.classList[3] == 'out') {
        size.target.classList.remove('out');
    }
    goods.sizes = [...document.querySelectorAll('.out')].map((n) => n.innerText);
    filter(allProducts);
    page1(goods.allGoods);
    console.dir(goods.allGoods)
});


btn1.addEventListener('click', () => {
    page1(goods.allGoods);
});

btn2.addEventListener('click', () => {
    page2(goods.allGoods);
});

btn3.addEventListener('click', () => {
    page3(goods.allGoods);
});

btn4.addEventListener('click', () => {
    page4(goods.allGoods);
});

btn5.addEventListener('click', () => {
    page5(goods.allGoods);
});

btnNext.addEventListener('click', () => {
    nextPage(goods.allGoods);
});




