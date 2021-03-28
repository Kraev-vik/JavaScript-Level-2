const API = 'json';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        cartProducts: [],
        amount: 0,
        countGoods: 0,
        imgCatalog: 'img',
        userSearch: '',
        show: false,
        showErrorMsg: false,
    },
    computed: {
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
                this.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            }
            else {
                const el = Object.assign({ quantity: 1 }, product);
                this.postJson(`/api/cart`, el)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartProducts.push(el)
                        }
                    })
            }
        },
        delProduct(product) {
            if (product.quantity > 1) {
                this.putJson(`/api/cart/${product.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            product.quantity--;
                        }
                    })
            } else {
                this.deleteJson(`/api/cart/${product.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
                        }
                    })
            }
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error)

                })
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        deleteJson(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
    },

    mounted() {
        this.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartProducts.push(el);
                }
            });
    }
})

