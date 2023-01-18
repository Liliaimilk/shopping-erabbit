import { createStore } from "vuex";
import createPersistence from "vuex-persistedstate";
import user from "./modules/user";
import cart from "./modules/cart";
import cartgory from "./modules/cartgory";
export default createStore({
    modules: {
        user,
        cart,
        cartgory,
        plugins: [
            createPersistence({
                key: 'erabbir-pc',
                paths: 'user'
            })
        ]
    }
})