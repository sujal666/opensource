
'use client'

import { DashboardTable } from '@/app/(protected)/dashboard/_components/DashboardTable'
import React from 'react'
import { motion } from 'framer-motion'


const DashboardPage =  () => {



  return (
    <div className="space-y-6 px-4 md:px-6 py-4 ">
     
      <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-300 md:text-2xl lg:text-3xl">
        {"Start your open source contribution, Today!"
          .split(" ")
          .map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
      </h1>

      <p className='text-center  text-neutral-400'>
        Choose issues according to your preferred programming language  <br />and difficulty level
      </p>



      {/* Table */}
      <DashboardTable />
    </div>
  )
}

export default DashboardPage
