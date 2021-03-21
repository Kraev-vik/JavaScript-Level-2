Vue.component('cart', {
    props: ['cartProducts'],
    template: `<div class="cart-modal">
                <div class="close" @click='$parent.show=!$parent.show'><img src="img/close.svg" alt="close"></div>
                <p v-if="!cartProducts.length" class="no-data">Нет товаров в корзине</p>
                <itemCart v-for="product of cartProducts" :key="product.id_product" :product="product"></itemCart>
            </div>`
})

Vue.component('itemCart', {
    props: ['product'],
    template: `
                <div class="cart-item">
                    <h3>{{product.product_name}}</h3>
                    <img :src="$root.imgCatalog + '/' + product.id_product + '/preview.jpg'" :alt="product.product_name">
                    <p>{{product.price}} &#8381</p>
                    <div class="quantity">
                        <button class="del-good" :id="product.id_product" @click="$root.delProduct(product)">-</button>
                        <p>{{product.quantity}} шт.</p>
                        <button class="add-good" :id="product.id_product" @click="$root.addProduct(product)">+</button>
                    </div>
                    <p>{{ product.price * product.quantity }} &#8381</p>
                </div>`
})