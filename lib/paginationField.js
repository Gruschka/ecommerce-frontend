import gql from "graphql-tag";
import { PAGINATION_QUERY } from '../components/Pagination';
 
export default function paginationField() {
    return {
        keyArgs: false, //Indicate that we manually take care of read/merge
        read(existing = [], { args, cache }) { //Args -> first and skip values. 
            //When apollo tries to query for all products,
            //it will first ask the read function for the items
            const { skip, first } = args;
            //Read the number of items on the page from the cache
            const data = cache.readQuery({ query: PAGINATION_QUERY });
            const count = data?._allProductsMeta?.count;
            const page = skip / first + 1;
            const pages = Math.ceil(count / first);

            //Check if we have existing items, filtering undefined
            const items = existing.slice(skip, skip + first).filter(x => x);
            //If there are items but not enough to fill the amount of items per page
            //we send whichever amount we have
            if(items.length && items.length !== first && page === pages){
                return items
            }
            
            if(items.length !==  first){
                //We don't have any items, so we fetch from network
                return false
            } 

            //if there are items, return them from the cache. No need to go to network
            if(items.length){
                console.log(`there are ${items.length} items in the cache.` )
                return items
            }

            //We can either return the items because they are already in cash
            //or return false from here, causing a network request to get them 
            //triggering the merge function
        },
        merge(existing, incoming, { args }) {
            const { skip, first } = args;
            //Triggered when apollo comes back from the network request with the products
             const merged = existing ? existing.slice(0) : [];
            /*If a user starts on a page other than the first, we need to fill
            the previous pages with something (even blank data)*/
            for(let i = skip; i < skip + incoming.length; ++i){
                merged[i] = incoming[i - skip]
            }
            //Return merged item from cache. Then it'll try the read function again
            return merged
        },
    }
}