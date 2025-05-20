'use client'
 
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathName = usePathname();
  return (
    <div className='flex dark:bg-gray-600 bg-amber-100 p-4 lg:text-lg justify-center gap-6'>
      <div className={ 'underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg'
            
        }>
          {pathName.slice(1).toUpperCase()}
        </div>
    </div>
  );
}