import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react'
import useForm from '../lib/Hooks/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Router from 'next/router';

const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION(
        $name: String! 
        $description: String!
        $price: Int!
        $image: Upload
    ){
    createProduct(
        data:{
            name: $name
            description: $description
            price: $price
            status: "AVAILABLE"
            photo: {
                create: {
                    image: $image,
                    altText: $name
                }
            }
    }) {
        id
        description
        price
        name
    }
    }
`;

const CreateProduct = () => {
    const { inputs, handleChange, clearForm, resetForm } = useForm();

    const [createProduct, {loading, error, data}] = useMutation(CREATE_PRODUCT_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: ALL_PRODUCTS_QUERY }]
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createProduct()
        clearForm();
        Router.push({
            pathname: `/product/${res.data.createProduct.id}`
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <DisplayError error={error}/>
            <fieldset disabled={ loading } aria-busy={ loading }>
                <label htmlFor="image">
                    Image
                    <input required type="file" id="image" name="image" onChange={handleChange} />
                </label>
                <label htmlFor="name">
                    Name
                    <input type="text" id="name" name="name"
                        placeholder="Name" value={inputs.name} onChange={handleChange} />
                </label>
                <label htmlFor="price">
                    Price
                    <input type="number" id="price" name="price"
                        placeholder="Price" value={inputs.price} onChange={handleChange} />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea id="description" name="description"
                        placeholder="Price" value={inputs.description} onChange={handleChange} />
                </label>
                <button type="submit"> + Add Product </button>
                <button onClick={resetForm}> Clear Form </button>
            </fieldset>
        </Form>
    )
}

export default CreateProduct
