import { SetStateAction, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { appId } from "../appId/appId";
import weatherApi from "../axios";
import { SearchProps } from "../types";


const Search = ({ onSearchChange }: SearchProps) => {

    const [search, setSearch] = useState(null);
    const loadOptions = async (inputValue: string) => {

        const res = await weatherApi.get('/weather', {
            params: {
                q: inputValue,
                units: 'metric',
                appid: appId,
            },
        })
        const responseJSON = {
            results: [
              {
                value: 1,
                label: "Java"
              }
            ],
          };
    
          return {
            options: responseJSON.results
          }

    }

    const handleOnChange = (searchData: SetStateAction<null>) => {
        setSearch(searchData);
        onSearchChange(searchData)
    }

    return (
        <AsyncPaginate
            className="form-control relative flex-auto w-full min-w-0 block  text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder='Search for city'
            debounceTimeout={600}
            value={search}
            // onChange={handleOnChange}
            loadOptions={loadOptions} />
    )

}
export default Search;

