import UpdateProduct from '../components/UpdateProduct'

const UpdatePage = ({ query }) => {
    return (
        <div>
            <UpdateProduct id={ query.id }/>
        </div>
    )
}

export default UpdatePage
