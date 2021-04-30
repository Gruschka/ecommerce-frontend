import React from 'react'
import RequestReset from '../components/RequestReset'
import Reset from '../components/Reset'

const ResetPage = ({ query }) => {
    if(!query?.token){
        return (
            <div>
                <p>Sorry, you must supply a token</p>
                <RequestReset />
            </div>
        )
    }
    return (
        <div>
            <p>Reset your Password {query.token}</p>
            <Reset token={query.token} />
        </div>
    )
}

export default ResetPage
