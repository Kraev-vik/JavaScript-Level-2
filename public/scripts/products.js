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
                            <button :class="'buy-btn ' + product.id_product"
                                @click="$root.addProduct(product)">Купить</button>
                        </div>`
})