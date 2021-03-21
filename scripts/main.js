const API = 'json';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        cartProducts: [],
        imgCatalog: 'img',
        userSearch: '',
        show: false,
        showErrorMsg: false,
    },
    computed: { //собрал с просторов интернета
        filterList() {
            let search = this.userSearch;
            return this.products.filter(el => {
                if (search === '') return true;
                else return el.product_name.toLowerCase().indexOf(search.toLowerCase()) > -1;
            })
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.showErrorMsg = true;
                })
        },
        addProduct(product) {
            let find = this.cartProducts.find(item => item.id_product === product.id_product);
            if (find) {
                find.quantity++;
            }
            else {
                let el = {
                    id_product: product.id_product,
                    price: product.price,
                    product_name: product.product_name,
                    quantity: 1
                };
                this.cartProducts.push(el);
            }
        },
        delProduct(product) {
            let find = this.cartProducts.find(item => item.id_product === product.id_product);
            if (find.quantity > 1) {
                find.quantity--;
            }
            else {
                this.cartProducts.splice(this.cartProducts.indexOf(find), 1);
            }
        },
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartProducts.push(el);
                }
            });
    }
})

///OOP-------------------------------------------------------///
// const API = 'json';

// class ProductsList {
//     constructor(container = '.products') {
//         this.container = container;
//         this.goods = [];
//         this._getProducts()
//             .then(data => { //data - объект js
//                 this.goods = [...data];
//                 this.render()
//             });
//     }

//     _getProducts() {
//         return fetch(`${API}/catalogData.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const productObj = new ProductItem(product);
//             block.insertAdjacentHTML('beforeend', productObj.render())
//         }
//     }
// }

// class ProductItem {
//     constructor(product) {
//         this.title = product.product_name;
//         this.price = product.price;
//         this.id = product.id_product;
//     }

//     render() {
//         return `<div class="product-item">
//                 <h3>${this.title}</h3>
//                 <img src="img/${this.id}/preview.jpg" alt="${this.title}">
//                 <p>${this.price} &#8381</p>
//                 <button class="buy-btn" id="${this.id}">Купить</button>
//             </div>`
//     }
// }

// class CartList {
//     constructor(container = '.cart-modal') {
//         this.container = container;
//         this.goods = [];
//         this._getBasket()
//             .then(data => { //data - объект js
//                 this.goods = [...data.contents];
//                 this.render();
//             });
//     }

//     _getBasket() {
//         return fetch(`${API}/getBasket.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const productObj = new CartItem(product);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//         block.insertAdjacentHTML("beforeend", `<p>Количество товаров: ${this.quantityGoods()} шт.</p>`);
//         block.insertAdjacentHTML("beforeend", `<p>Cтоимость товаров: ${this.sumPrice()} &#8381</p>`);
//     }
//     quantityGoods() {
//         return this.goods.reduce((accum, item) => accum += item.quantity, 0);
//     }
//     sumPrice() {
//         //Метод подсчета общей стоимости товаров в корзине
//         return this.goods.reduce((accum, item) => accum += item.price, 0);
//     }
//     openCartList(clsFind, clsChange) {
//         const block = document.querySelector(clsFind);
//         block.addEventListener("click", () => {
//             document.querySelector(clsChange).style.visibility = "visible";
//         });
//     }
//     closeCartList(clsFind, clsChange) {
//         const block = document.querySelector(clsFind);
//         block.addEventListener("click", () => {
//             document.querySelector(clsChange).style.visibility = "hidden";
//         });
//     }
//     addItem() {
//         let buyBtn = document.querySelectorAll('.buy-btn');
//         buyBtn.forEach(item => {
//             item.addEventListener("click", (e) => {
//                 let ff = e.target;
//                 console.log(ff)
//             })
//         })
//     }
// }

// class CartItem {
//     constructor(product) {
//         this.title = product.product_name;
//         this.price = product.price;
//         this.id = product.id_product;
//         this.quantity = product.quantity;
//     }

//     render() {
//         return `<div class="cart-item">
//                 <h3>${this.title}</h3>
//                 <img src="img/${this.id}/preview.jpg" alt="${this.title}">
//                 <p>${this.price} &#8381</p>
//                 <div class="quantity">
//                 <button class="del-good" id="${this.id}">-</button>
//                 <p>${this.quantity} шт.</p>
//                 <button class="add-good" id="${this.id}">+</button>
//                 </div>
//             </div>`
//     }

//     delQuantityItem() {
//         const block = document.querySelector();
//         block.addEventListener("click", () => {
//             return (this.quantity > 1) ? this.quantity-- : this.quantity;
//         });
//     }
//     addQuantityItem(clsFind) {
//         const block = document.querySelector(clsFind);
//         block.addEventListener("click", () => {
//             this.quantity++;

//         });
//     }
// }

// let listGoods = new ProductsList();
// let listBasket = new CartList();
// listBasket.openCartList('.cart', '.cart-wrap');
// listBasket.closeCartList('.close', '.cart-wrap');
