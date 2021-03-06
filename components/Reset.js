import Form from './styles/Form';
import useForm from '../lib/Hooks/useForm';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';
import { useMutation } from '@apollo/client';

const RESET_MUTATION = gql`
    mutation RESET_MUTATION(
        $email: String!, $token: String!, $password: String!
        ) {
        redeemUserPasswordResetToken(
            email: $email, token: $token, password: $password
            ) {
            code  
            message
        }
    }
`;

const Reset = ({token}) => {

    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
        token,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await reset().catch(console.error);
        resetForm();
    }
    const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
        variables: inputs,
    })

    const successfullError = data?.redeemUserPasswordResetToken?.code ? data.redeemUserPasswordResetToken : undefined;

    return (
        <Form method='post' onSubmit={handleSubmit}>
            <h2>Reset Your Password</h2>
            <DisplayError error={error || successfullError} />
            <fieldset>
                {data?.redeemUserPasswordResetToken === null && <p>Success! You can now sign in</p>}
                <label htmlFor="email">
                    Email
                    <input type="email" name="email" placeholder="Your email address" autoComplete="email" value={inputs.email} onChange={handleChange} required/>
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" name="password" placeholder="Password" autoComplete="password" value={inputs.password} onChange={handleChange} required/>
                </label>
                <button type="submit">Request Reset</button>
            </fieldset>
        </Form>
    )
}

export default Reset;
