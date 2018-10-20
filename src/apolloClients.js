import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';

import { authHeader } from './utils/userService';

const READ_URL = "https://query-staging.assignar.com.au/v5/candidate";
const MUTATION_URL = "https://query-staging.assignar.com.au/v5/mutation";

function createClient(url) {
    const httpLink = new HttpLink({ uri: url });

    const authLink = new ApolloLink((operation, forward) => {
        // Retrieve the authorization header from local storage.
        const header = authHeader();

        // Use the setContext method to set the HTTP headers.
        operation.setContext({
            headers: header
        });

        // Call the next link in the middleware chain.
        return forward(operation);
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink), // Chain it with the HttpLink
        cache: new InMemoryCache()
    });

    return client;
}

export const readClient = createClient(READ_URL);
export const mutationClient = createClient(MUTATION_URL);