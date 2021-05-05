import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift'
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown'

const SEARCH_PRODUCTS_QUERY = gql`
    query SEARCH_PRODUCTS_QUERY($searchTerm: String!){
        searchedProducts: allProducts(where: {
            OR: [
                { name_contains_i: $searchTerm },
                { description_contains_i: $searchTerm }
            ]
        }){
            id
            name
            photo {
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`;

const Search = () => {
    const router = useRouter();
    const [findItems, { loading, data, error }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
        fetchPolicy: 'no-cache' //entirely bypass apollo cache and use network
    });

    const items = data?.searchedProducts || [];
    const debouncedFindItems = debounce(findItems, 350);

    resetIdCounter();

    const { isOpen, inputValue, getMenuProps, getInputProps, getComboboxProps, getItemProps, highlightedIndex } = useCombobox({
        
        items,

        onInputValueChange(){
            debouncedFindItems({
                variables: {
                    searchTerm: inputValue
                }
            })
        },

        onSelectedItemChange({ selectedItem }){
            router.push({
                pathname: `/product/${selectedItem.id}`
            })
        },
        itemToString: item => item?.name || ''
    });


    console.log(`items`, items)
    return (
        <SearchStyles>
            <div {...getComboboxProps()}>
                <input {... getInputProps({
                    type: 'search',
                    placeholder: 'Search for an Item',
                    id: 'search',
                    className: loading ? 'loading' : '',
                })} />
            </div>
            <DropDown {...getMenuProps()}>
                {isOpen && items.map((item, index) =>
                     <DropDownItem {...getItemProps({ item })} key={item.id} highlighted={index === highlightedIndex}>
                         <img src={item.photo.image.publicUrlTransformed} alt={item.name} width="50" />
                        {item.name}
                    </DropDownItem>)}
                {isOpen && !items.length && !loading && (
                    <DropDownItem>No items found for {inputValue}</DropDownItem>
                )}
            </DropDown>
        </SearchStyles>
    )
}

export default Search
