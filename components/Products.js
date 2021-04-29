import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react'
import styled from 'styled-components';
import { perPage } from '../config';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
        allProducts(first: $first, skip: $skip) {
            id
            name
            price
            description
            photo {
             id
             image {
                publicUrlTransformed
             }
            }
        }
    }
`
const ProductsList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`;

ProductsList.displayName = 'ProductsList';

const Products = ({ page }) => {
    const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
        variables: {
            skip: page  * perPage - perPage, //Substract to get lower end
            first: perPage,
        }
    });
    if(loading) return <p>Loading ... </p>
    if(error) return <p> Error: { error }</p>
    return (
        <div>
            <ProductsList>
                {data.allProducts.map((product) => <Product product={ product } key={product.id}/>)}
            </ProductsList>
        </div>
    )
}

export default Products;
