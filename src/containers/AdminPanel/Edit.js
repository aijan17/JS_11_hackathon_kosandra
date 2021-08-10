import React, { useContext, useEffect, useState } from 'react';
import {TableCell, TableRow } from '@material-ui/core';
import { adminContext } from '../../contexts/AdminContext';


const Edit = ({setChangeId}) => {
    const {productToEdit,saveEditedProduct} = useContext(adminContext)
    const [editProduct,setEditProduct]= useState(productToEdit)

    useEffect(() =>{
        setEditProduct(productToEdit)
    }, [productToEdit])


    const handleInput = (e) =>{
        let obj = {
            ...editProduct,
            [e.target.name]: e.target.value
        }
        setEditProduct(obj)
    }

    const handleClick= () =>{
        saveEditedProduct(editProduct)
        setChangeId(null)
    }

    return (
        <>
        {
            editProduct ? (
                <TableRow >
                <TableCell align="right"> <button disabled>DEL</button> </TableCell>
                <TableCell align="right"> <button onClick={handleClick}>Save</button> </TableCell>
                <TableCell component="th" scope="row"><input onChange={handleInput} value={editProduct.title} type="text" name="title"/></TableCell>
                <TableCell align="right"> <input onChange={handleInput} value={editProduct.image} type="text" name="image"/> </TableCell>
                <TableCell align="right"><input onChange={handleInput} value={editProduct.description} type="text" name="description"/></TableCell>
                <TableCell align="right"><input onChange={handleInput} value={editProduct.price}type="number" name="price"/></TableCell>
                <TableCell align="right"><input onChange={handleInput} value={editProduct.countInStock}type="number" name="countInStock"/></TableCell>
        
            </TableRow>
           
            ) : (
                <h1>error</h1>
            )
        }
         
         </>   
        
    )
}

export default Edit;