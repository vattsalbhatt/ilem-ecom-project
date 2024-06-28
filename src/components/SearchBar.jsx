import React, { useState, useEffect, useRef } from 'react'
import { commonApiCall } from '@/configs/apiCall'
import { useRouter } from 'next/router'

const SearchBox = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const debounceTimeout = useRef(null)

  const router = useRouter()

  useEffect(() => {
    if (query.length === 0) {
      setResults([])
      setShowDropdown(false)
      return
    }

    // Debounce the API call
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      fetchResults(query)
    }, 300)

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [query])

  const fetchResults = async (searchQuery) => {
    try {
      const response = await commonApiCall(
        `/product/all?searchQuery=${searchQuery}`,
        'get',
      )

      setResults([...response])
      setShowDropdown(true)
    } catch (error) {
      console.error('Error fetching search results:', error)
      setShowDropdown(false)
    }
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSelect = (result) => {
    router.push(`/product/${result._id}`)
    setShowDropdown(false)
  }

  return (
    <div className="relative w-[90vw] max-w-[400px] mt-12">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="w-full px-4 py-2 border rounded-xl shadow-sm"
      />
      {showDropdown && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded shadow-md max-h-40">
          {results.map((result, index) => (
            <li
              key={index}
              onClick={() => handleSelect(result)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {result.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBox
