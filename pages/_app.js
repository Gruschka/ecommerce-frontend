import React from 'react';
import Page from '../components/Page';
import Router from 'next/router';
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App = ({Component, pageProps, apollo }) => {

    return (
        <ApolloProvider client={ apollo }>
            <Page>
                <Component {...pageProps}/>
            </Page>
        </ApolloProvider>
    )
}
//Fetch all the queries on all children components
App.getInitialProps = async function({ Component, ctx }) {
    let pageProps = {};
    if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query; //Get query variables on page level
    return { pageProps }
}

export default withData(App);
