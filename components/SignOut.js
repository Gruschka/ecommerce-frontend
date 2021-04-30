import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react'
import { CURRENT_USER_QUERY } from '../lib/Hooks/useUser';

const SIGNOUT_MUTATION = gql`
    mutation {
        endSession
    }
`;


const SignOut = () => {
    const [ signOut ] = useMutation(SIGNOUT_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });

    return (
        <button type="button" onClick={ signOut }>
            Sign Out
        </button>
    )
}

export default SignOut
