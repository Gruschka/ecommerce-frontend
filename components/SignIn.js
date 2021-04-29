import Form from './styles/Form';
import useForm from '../lib/Hooks/useForm';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../lib/Hooks/useUser';
import DisplayError from './ErrorMessage';
import { useMutation } from '@apollo/client';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!){
        authenticateUserWithPassword(email: $email, password: $password){
            ... on UserAuthenticationWithPasswordSuccess {
                item {
                    id
                    email
                    name
                }
            }
            ... on UserAuthenticationWithPasswordFailure {
                code
                message
            }
        }
    } 
`;

const SignIn = () => {
    
    const { inputs, handleCHange, resetForm } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signin();
    }
    const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        //refetch currently logged in user
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
    })

    const error = data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure' ? data?.authenticateUserWithPassword : undefined;
    return (
        <Form method='post' onSubmit={handleSubmit}>
            <h>Sign Into your account</h>
            <DisplayError error={error} />
            <fieldset>
                <label htmlFor="email">
                    Email
                    <input type="email" name="email" placeholder="Your email address" autocomplete="email" />
                    <input type="password" name="password" placeholder="Password" autocomplete="password" />
                </label>
                <button type="submit">Submit</button>
            </fieldset>
        </Form>
    )
}

export default SignIn
