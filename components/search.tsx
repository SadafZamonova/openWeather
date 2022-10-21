import Link from 'next/link';
import React, { useState } from 'react'
import cities from '../lib/city.list.json'
import { AddNamesProps, Cities } from '../types';

export default function Search({addNames, setNames, names}:AddNamesProps) {
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
        const match = city.name.toLowerCase().startsWith(value.toLowerCase())
        if (match) {
          matchingCities.push(city);
        }
      }
    }

    return setResults(matchingCities)
  };



  
  return (
    <div>
      <input type='text' value={names} onChange={onChange} />
      {names.length > 3 && (
        <ul>
          {results.length > 0 ? (
            results.map((city, index) => (
              <li key={index}>
                <div onClick={(e) => addNames(e)}>
                    {city.name}
                    {city.state ? `, ${city.state}` : ''}
                    <span >({city.country})</span>
                </div>
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

