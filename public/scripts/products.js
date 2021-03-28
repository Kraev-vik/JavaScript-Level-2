Vue.component('products', {
    props: ['products'],
    template: `<div class="products">
                    <itemProduct v-for="product in $parent.filterList" :key="product.id_product" :product="product"></itemProduct>
                </div>`
})

Vue.component('itemProduct', {
    props: ['product'],
    template: `
                <div class="product-item">
                            <h3>{{ product.product_name }}</h3>
                            <img :src="$root.imgCatalog + '/' + product.id_product + '/preview.jpg'" :alt="product.product_name">
                            <p>{{ product.price }} &#8381</p>
                            <button :disabled="isDisabled(product)" :class="'buy-btn id' + product.id_product + stillCart(product)"
                            @click="$root.addProduct(product)">{{ stillCart(product, 'Купить') }}</button>
                        </div>`,
    methods: {
        stillCart(product, text) {
            let find = this.$root.cartProducts.find(item => item.id_product === product.id_product);
            if (find && text) {
                return `Уже в корзине`;
            }
            else if (find) {
                return ` inCart`;
            }
            else if (text) {
                return `В корзину`;
            }
            else return ``;
        },
        isDisabled(product) {
            let find = this.$root.cartProducts.find(item => item.id_product === product.id_product);
            if (find) {
                return true;
            }
            else return false;
        }
    }

})