import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { useState } from 'react'
import { HiOutlineCheck } from 'react-icons/hi'

const montserrat = Montserrat({ subsets: ['latin'] })


const Profiles = () => {
    return (
    <main className={`flex ${montserrat.className} min-h-screen min bg-blue align-middle justify-center`}>
        <div className='grid w-9/12 h-2/3 bg-white rounded-3xl align-middle relative top-32'>
            аваав
        </div>
    </main>
  )
}

export default Profiles