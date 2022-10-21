import Link from 'next/link';
import React, { useState } from 'react'
import cities from '../lib/city.list.json'
import { AddNamesProps, Cities } from '../types';

export default function Search({ addNames, setNames, names }: AddNamesProps) {
  const [results, setResults] = useState<Cities[]>([]);
  const onChange = (e: any) => {
    const { value } = e.target;
    setNames(value);
    let matchingCities: any = [];
    if (value.length > 3) {
      for (let city of cities) {
        if (matchingCities.length >= 5) {
          break;
        }
        const match = city.name.toLowerCase().startsWith(value.toLowerCase());
        if (match) {
          matchingCities.push(city);
        }
      }
    }
    return setResults(matchingCities)
  };

  return (
    <div className='relative'>
      <input
        className='w-full rounded-lg border-2 border-solid border-inherit transition-all'
        type='text'
        value={names}
        onChange={onChange}
      />

      {names.length > 3 && (
        <ul   className='absolute pt-1 rounded-lg w-full m-0 border-2 border-solid border-inherit bg-white'>
          {results.length > 0 ? (
            results.map((city, index) => (
              <li onClick={(e) => addNames(e)}  className="hover:cursor-pointer" key={index}>
                    {city.name}
                    {city.state ? `, ${city.state}` : ''}
                    <span >({city.country})</span>
              </li>
            ))
          ) : (
            <li>no result</li>
          )}
        </ul>
      )}
    </div>
  )
}

