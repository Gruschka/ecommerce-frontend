import Form from './styles/Form';
import useForm from '../lib/Hooks/useForm';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';
import { useMutation } from '@apollo/client';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        createUser(data: {
            email: $email
            name: $name
            password: $password
        }) {
            id
            email
            name
        }
    }
`;

const SignUp = () => {

    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        name: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signup().catch(console.error);
        resetForm();
    }
    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
    })

    // const error = data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure' ? data?.authenticateUserWithPassword : undefined;

    console.log(`data`, data)
    
    return (
        <Form method='post' onSubmit={handleSubmit}>
            <h2>Sign Up for account</h2>
            <DisplayError error={error} />
            <fieldset>
                {data?.createUser?.id && <p>Signed up with {data.createUser.email} - Please go ahead and Sign In</p>}
                <label htmlFor="email">
                    Your Name
                    <input type="text" name="name" placeholder="Your Name" autoComplete="name" value={inputs.name} onChange={handleChange} required/>
                </label>
                <label htmlFor="email">
                    Email
                    <input type="email" name="email" placeholder="Your email address" autoComplete="email" value={inputs.email} onChange={handleChange} required/>
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" name="password" placeholder="Password" autoComplete="password" value={inputs.password} onChange={handleChange} required/>
                </label>
                <button type="submit">Submit</button>
            </fieldset>
        </Form>
    )
}

export default SignUp;
