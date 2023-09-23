import React from 'react'
import { convertTimestampToDate, truncate } from '../store'
import { Link } from 'react-router-dom'
import MovieAction from './MovieActions'

const MoviesTable = ({ movies }) => {
  return (
    <div className="overflow-x-auto bg-black">
      <table className="min-w-full bg-black">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Genre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Date Added
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, i) => (
            <tr key={i} className="border-b bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  className="h-16 w-16 object-cover rounded"
                  src={movie.imageUrl}
                  alt={movie.name}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                <Link to={'/movie/' + movie.id}>{movie.name}</Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-300">{movie.genre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                {convertTimestampToDate(movie.timestamp)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                {truncate(movie.description, 50, 0, 53)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                <MovieAction movie={movie} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MoviesTable
