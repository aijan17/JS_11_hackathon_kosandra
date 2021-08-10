import {TextField} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { adminContext } from '../../contexts/AdminContext';

const useStyles = makeStyles({
    main: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px"
    },
    divs: {
        display: "flex",
        flexDirection: "column",
        width: '49%'
    },
    buttonBlock: {
        marginBottom: "50px",
        width: '100%'
    },
    button: {
        width: "100%",
        padding: "10px",
        background: "lightBlue",
        color: "white"
    }
})

const Add = () => {
    const classes = useStyles()
    const { createProduct } = useContext(adminContext)
    const [newProduct, setNewProduct] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        countInStock:''
    })

    function handleInput(e) {
        let obj = {
            ...newProduct,
            [e.target.name]: e.target.value
        }
        setNewProduct(obj)
    }

    function handleClick() {
        createProduct(newProduct)
        setNewProduct({
            title: "",
            description: "",
            price: "",
            image: "",
            countInStock:''
          
        })
    }

    return (
        <>
            <div className={classes.main}>
                <div className={classes.divs}>
                    <TextField value={newProduct.title} onChange={handleInput} name="title" id="standart-basic" label="Название" />
                    <TextField value={newProduct.description} onChange={handleInput} name="description" id="standart-basic" label="Описание" />
                    <TextField value={newProduct.price} onChange={handleInput} name="price" id="standart-basic" label="Цена" />
  
                </div>
                <div className={classes.divs}>
                    <TextField value={newProduct.image} onChange={handleInput} name="image" id="standart-basic" label="Фото" />
                    <TextField value={newProduct.countInStock} onChange={handleInput} name="countInStock" id="standart-basic" label="Кол-во в наличии" />
              
                </div>
            </div>
            <div className={classes.buttonBlock}>
                <button onClick={handleClick} className={classes.button}>ADD</button>
            </div>
        </>
    );
};

export default Add;