class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render())
            //            block.innerHTML += productObj.render();
        }
    }

}


class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
    }

    render() {
        return `<div class="product-item">
                <h3>${this.title}</h3>
                <img src="img/${this.id}/preview.jpg" alt="${this.title}">
                <p>${this.price} &#8381</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductsList();
list.render();

class CartList {
    //Класс родитель класса элемента корзины.
    constructor(container = '.cart') {
        this.container = container;
        this.goods = [];
    }

    quantityGoods() {
        //Метод подсчтета количества товаров
    }
    sumPrice() {
        //Метод подсчета общей стоимости товаров в корзине
        for (let product of this.goods) {
            let sum = 0;
            sum += product.price;
        }
        return sum;
    }
}

class CartItem {
    //Класс элемента корзины.
    delItem() {
        //Удаление элемента из корзины
    }
    addItem() {
        //Добавление еще одного элемента в корзину
    }
}