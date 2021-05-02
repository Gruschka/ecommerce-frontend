import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!){
        deleteProduct(id: $id){
            id
            name
        }
    }
`;

function update(cache, payload){
    cache.evict(cache.identify(payload.data.deleteProduct))
}

const DeleteProduct = ({ id, children }) => {

    const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
        variables: { id },
        update: update
    })

    const onClick = () => {
        if(confirm('Are you sure you want to delete this Item?')){
            deleteProduct(id).catch(err => alert(err.message));
        }
    }

    return (
        <button type="button" disabled={ loading } onClick={ onClick }>
            {children}
        </button>
    )
}

export default DeleteProduct
