import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { clientContext } from '../../contexts/ClientContext';

const ProductDetail = () => {
    const { getProductDetail, productDetail } = useContext(clientContext)
    const { id } = useParams()

    useEffect(() => {
        getProductDetail(id)
    }, [])
    console.log(productDetail)


    return (
        <>
            {
                productDetail ? (
                    <div className="container">
                        <div className="product-detail">
                            < div className="detail-left">
                                <img src={productDetail.image} />
                            </div>
                            < div className="detail-right">
                                <h3>{productDetail.title}</h3>
                                <ul>
                                    <li>
                                        <div>Цена:</div>
                                        <div>{productDetail.price} сом</div>
                                    </li>
                                    <li>
                                        <div>Скидка:</div>
                                        <div>{productDetail.discount} %</div>
                                    </li>
                                    <li>
                                        <div>Продавец:</div>
                                        <div>{productDetail.author}</div>
                                    </li>
                                    <li>
                                        <div>Телефон:</div>
                                        <div>{productDetail.phone}</div>
                                    </li>
                                    <li>
                                        <div>Категория:</div>
                                        <div>{productDetail.category}</div>
                                    </li>
                                    <li>
                                        <div>Кол-во в нал:</div>
                                        <div>{productDetail.countInStock}</div>
                                    </li>
                                    <li>
                                        <div>Локация:</div>
                                        <div>{productDetail.storeAddress}</div>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                ) : (
                    <h1>Loading......</h1>
                )
            }

        </>
    );
};

export default ProductDetail;