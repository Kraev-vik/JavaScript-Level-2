Vue.component('search', {
    template: `<div class="search"><input type="text" v-model=" $parent.userSearch "> <img :src="$root.imgCatalog + '/search.png'" alt="search"></div>`
})