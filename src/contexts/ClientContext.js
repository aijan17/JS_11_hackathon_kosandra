// import { People } from '@material-ui/icons';
import axios from 'axios';
import React, { useReducer } from 'react';
import { calcSubPrice } from '../helpers/calcPrice';
import { AUTH_API, JSON_API } from '../helpers/constants';
import calcTotalPrice from '../helpers/calcPrice'

export const clientContext = React.createContext()

const INIT_STATE = {
    products: null,
    productCountInCart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem("cart")).products.length : 0,
    cartData: null,
    productDetail: null,
    paginatedPages: 0
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return { ...state, products: action.payload }
        case "ADD_AND_DELETE_PRODUCT_IN_CART":
            return { ...state, productCountInCart: action.payload }
        case 'GET_CART':
            return { ...state, cartData: action.payload }
        case 'GET_PRODUCT_DETAIL':
            return { ...state, productDetail: action.payload }
        case 'MAKE_ORDER':
            return { ...state, productCountInCart: action.payload }
        case 'FILTER_PRODUCT_BY_PRICE':
            return { ...state, products: action.payload }
        case 'SEARCH_PRODUCT':
            return { ...state, products: action.payload }
        case 'CHANGE_PAGE_TOTAL':
            return { ...state, paginatedPages: action.payload }
        default:
            return state
    }
}

const ClientContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getProducts = async () => {
        const { data } = await axios(JSON_API)
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }

    const registerUser = async (newUser) => {
        try {
            await axios.post(`${AUTH_API}/api/auth/register`, newUser)
        }
        catch {
            alert('неправильная почта или пароль')
        }
    }
    const loginUser = async (user, history) => {
        try {
            const res = await axios.post(`${AUTH_API}/login`, user)
            console.log(res)
            history.push('/')
        }
        catch {
            alert("введите верные данные")
        }
    }

    function addAndDeleteProductInCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newProduct = {
            product: product,
            count: 1,
            subPrice: 0
        }
        newProduct.subPrice = calcSubPrice(newProduct)
        let newCart = cart.products.filter(item => item.product.id === product.id)
        if (newCart.length > 0) {
            cart.products = cart.products.filter(item => item.product.id !== product.id)
        }
        else {
            cart.products.push(newProduct)
        }
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_CART",
            payload: cart.products.length
        })
    }

    function checkProductInCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart'))

        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newCart = cart.products.filter(item => item.product.id === id)
        return newCart.length > 0 ? true : false
    }

    function getCart() {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                products: []
            }
        }
        dispatch({
            type: "GET_CART",
            payload: cart.products
        })
    }

    function changeCountProduct(count, id) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        cart.products = cart.products.map(item => {
            if (item.product.id === id) {
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        })


        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem("cart", JSON.stringify(cart))
        getCart()
    }

    function makeOrder() {
        localStorage.setItem("cart", null)
        dispatch({
            type: "MAKE_ORDER",
            payload: 0
        })
    }


    async function getProductDetail(id) {
        const { data } = await axios.get(`${JSON_API}/${id}`)
        console.log(data)
        dispatch({
            type: "GET_PRODUCT_DETAIL",
            payload: data
        })
    }

    async function filterProductsByPrice(price) {
        const { data } = await axios(JSON_API)
        const filteredArr = data.filter(item => +item.price <= +price)
        dispatch({
            type: "FILTER_PRODUCT_BY_PRICE",
            payload: filteredArr
        })
    }

    async function searchProducts(searchValue) {
        const { data } = await axios(JSON_API)
        const foundProducts = data.filter(item => typeof item.title == "string" && item.title.includes(searchValue))
        dispatch({
            type: "SEARCH_PRODUCT",
            payload: foundProducts
        })
    }

    async function getProductsByPagination(page) {
        let products = []
        if (page === 0) {
            const { data } = await axios(JSON_API)
            const skip = (1 - 1) * 5;
            products = data;
            products = products.slice(skip, skip + 5);
            dispatch({
                type: 'CHANGE_PAGE_TOTAL',
                payload: data?.length ?? 0
            })
        } else {
            const { data } = await axios(JSON_API)
            const skip = (page - 1) * 5;
            products = data;
            products = products.slice(skip, skip + 5);
        }

        dispatch({
            type: "GET_PRODUCTS",
            payload: products
        })
    }

    return (
        <clientContext.Provider value={{
            products: state.products,
            productCountInCart: state.productCountInCart,
            cartData: state.cartData,
            productDetail: state.productDetail,
            paginatedPages: state.paginatedPages,
            getProducts,
            registerUser,
            loginUser,
            addAndDeleteProductInCart,
            checkProductInCart,
            getCart,
            changeCountProduct,
            makeOrder,
            getProductDetail,
            filterProductsByPrice,
            searchProducts,
            getProductsByPagination
        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;