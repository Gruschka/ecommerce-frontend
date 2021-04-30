import Form from './styles/Form';
import useForm from '../lib/Hooks/useForm';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';
import { useMutation } from '@apollo/client';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        sendUserPasswordResetLink(email: $email) {
            code  
            message
        }
    }
`;

const RequestReset = () => {

    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await requestReset().catch(console.error);
        resetForm();
    }
    const [requestReset, { data, loading, error }] = useMutation(REQUEST_RESET_MUTATION, {
        variables: inputs,
    })

    // const error = data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure' ? data?.authenticateUserWithPassword : undefined;

    console.log(`data`, data)
    return (
        <Form method='post' onSubmit={handleSubmit}>
            <h2>Request a Password</h2>
            <DisplayError error={error} />
            <fieldset>
                {data?.sendUserPasswordResetLink === null && <p>Success! Check your email for a link</p>}
                <label htmlFor="email">
                    Email
                    <input type="email" name="email" placeholder="Your email address" autoComplete="email" value={inputs.email} onChange={handleChange} required/>
                </label>

                <button type="submit">Request Reset</button>
            </fieldset>
        </Form>
    )
}

export default RequestReset;
