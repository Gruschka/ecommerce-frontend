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
    
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signin();
        console.log(`res`, res)
        resetForm()


    }
    const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        //refetch currently logged in user
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
    })

    const error = data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure' ? data?.authenticateUserWithPassword : undefined;
    console.log(`data`, data)
    return (
        <Form method='post' onSubmit={handleSubmit}>
            <h2>Sign Into your account</h2>
            <DisplayError error={error} />
            <fieldset>
                <label htmlFor="email">
                    Email
                    <input type="email" name="email" placeholder="Your email address" autoComplete="email" value={inputs.email} onChange={handleChange} required/>
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" name="password" placeholder="Password" autoComplete="password" value={ inputs.password } onChange={ handleChange } required/>
                </label>
                <button type="submit">Submit</button>
            </fieldset>
        </Form>
    )
}

export default SignIn
