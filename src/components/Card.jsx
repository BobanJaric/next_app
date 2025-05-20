import Link from 'next/link';
import { FiThumbsUp } from 'react-icons/fi';
export default function Card({ result }) {

  return (
    <div className='group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200'>
      <Link href={`/movie/${result.imdbID}`}>
        <img
          src={result.Poster}
          alt={result.Title || result.name}
          className='sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300
            w-full sm:h-36 object-cover
          '
        ></img>
        <div className='p-2'>
          <p className='line-clamp-3 text-sm'>{result.Plot}</p>
          <h2 className='font-bold truncate my-2 text-sm'>
            {result.Title}
          </h2>
          <p className='flex items-center text-xs'>
            {result.Year}
            <FiThumbsUp className='h-5 mr-1 ml-3' />
            {result.vote_count}
          </p>
        </div>
      </Link>
    </div>
  );
}