import React, { useContext, useEffect } from 'react';
import { clientContext } from '../../contexts/ClientContext';
import calcTotalPrice, { calcSubPrice } from '../../helpers/calcPrice';
import makeOrder from '../../contexts/ClientContext'

import { useHistory } from 'react-router-dom';
const Cart = () => {
    const { getCart, cartData, changeCountProduct, makeOrder } = useContext(clientContext)


    useEffect(() => {
        getCart()
    }, [])


    const history = useHistory()
    function handleClick() {
        makeOrder()
        history.push('/')
    }

    return (
        <>
            {cartData ? (
                cartData.length ? (
                    <div className="cart">
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>image</th>
                                        <th>title</th>
                                        <th>price</th>
                                        <th>count</th>
                                        <th>summ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartData.map(item => (
                                            <tr key={item.product.id}>
                                                <td><img width="50" src={item.product.image} /></td>
                                                <td>{item.product.title}</td>
                                                <td>{item.product.price}</td>
                                                <td><input min="1" type="number" onChange={(e) => changeCountProduct(e.target.value, item.product.id)} value={item.count} /></td>
                                                <td>{calcSubPrice(item)}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                            <h4>Общая сумма:{calcTotalPrice(cartData)}</h4>
                            <button onClick={handleClick}>Оплатить</button>
                        </div>
                    </div>
                ) : (
                    <h1>корзина пуста</h1>
                )
            ) : (
                <h1>loading</h1>)
            }

        </>
    );
};

export default Cart;