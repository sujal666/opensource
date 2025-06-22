import Image from 'next/image'
import path from 'path'
import React from 'react'

const menuOptions = [
  {
    id:1,
    name: 'Home',
    path: '/home',
  },
    {
    id:2,
    name: 'History',
    path: '/history',
  },
    {
    id:3,
    name: 'Priceing',
    path: '/priceing',
  },
    {
    id:4,
    name: 'Profile',
    path: '/profile',
  },
]

const AppHeader = () => {
  return (
    <div className='flex items-center p-4 shadow px-10 md:px-20 lg:px-40'>
      {/* Logo on the left */}
      <Image src={'/logo.svg'} alt='logo' width={120} height={60}/>
      
      {/* Menu options centered */}
      <div className='flex-1 flex justify-center'>
        <div className='hidden md:flex items-center gap-12'>
          {menuOptions.map((option, index) => (
            <div key={index}>
              <h2 className='hover:font-bold cursor-pointer transition-all'>{option.name}</h2>
            </div>
          ))}
        </div>
      </div>
      
      {/* This empty div balances the layout */}
      <div className='w-[120px]'></div>
    </div>
  )
}

export default AppHeader