import Link from 'next/link';
import React, { useState } from 'react'
import cities from '../lib/city.list.json'
import { InputSearchProps, Cities } from '../types';

export default function Search({ handleSearchCityClick, setNames, names }: InputSearchProps) {
  const [results, setResults] = useState<Cities[]>([]);
  const [hint, setHint] = useState("")

  const onChange = (e: any) => {
    const { value } = e.target;
    setNames(value);
    setHint(value)
    let matchingCities: any = [];

    if (value.length > 3) {
      for (let city of cities as any[]) {
        if (matchingCities.length > 5) {
          break;
        }
        const match = city.name.toLowerCase().startsWith(value.toLowerCase());
        if (match) {
          matchingCities.push(city);
        }
      }
    }
    setResults(matchingCities)

  };

  return (
    <div className='relative'>
      <input
        className='w-full rounded-lg border-2 border-solid border-inherit transition-all'
        type='text'
        value={names}
        onChange={onChange}
      />

      {hint.length > 3 && (
        <ul className='absolute pt-1 rounded-lg w-full m-0 border-2 border-solid border-inherit bg-white'>
          {results.length >= 0 ? (
            results.map((city, index) => (
              <li key={`${city}_${index}`} onClick={(e) => {
                setNames(city.name)
                setHint('')
                handleSearchCityClick(city.name)
              }} className="hover:cursor-pointer">
                {city.name}
                {city.state ? `, ${city.state}` : ''}
                <span>({city.country})</span>
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

