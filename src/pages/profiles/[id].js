import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { useState, useEffect } from 'react'
import { HiOutlineCheck } from 'react-icons/hi'
import { useRouter } from 'next/router'
import axios from 'axios'
import Header from '@/components/header'

const montserrat = Montserrat({ subsets: ['latin'] })


const Profiles = () => {
    const router = useRouter()
    const {id} = router.query
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await axios.get(
                    `https://hackaton-tinder.onrender.com/user/get-user-by-id/${id}`
                ).then(
                    (result) => {
                        setUser(result.data)
                    }
                )
                
            }
            catch (e) {
                console.log(e)
            }
        }
        if (loading && id) {
            fetchData()
            setLoading(false)

        }
        
    } )
    // console.log(user.topics)
    return (
        <main className={` ${montserrat.className} min-h-screen min bg-blue `}>
        <Header />
        <div className='flex align-middle justify-center'>
        <div className='flex w-5/12 h-2/3 bg-white rounded-3xl align-middle relative top-32'>
            <div className='m-10'>
                <Image src={"/favicon.png"} width={45} height={53} />
                <h1 className='text-3xl font-bold'>Профиль</h1>
                <div className='grid grid-cols-2 mt-10'>
                    <div>
                        <Image src={"/picprofile.jpg"} width={320} height={179} className='rounded-xl'/>
                    </div>
                    <div className='text-center'>
                        <h2 className='text-lg font-medium'>Никнейм</h2>
                        <h1 className='text-2xl font-semibold mb-5'>{user.username}</h1>
                        <h2 className='text-lg font-medium'>Про пользователя</h2>
                        <h1 className='text-2xl font-semibold mb-5'>{user.about}</h1>
                        <h2 className='text-lg font-medium'>Темы</h2>
                        {user.topics?.map((value, inx) => (<h1 className='text-2xl font-semibold' key={inx}>{value.name}</h1>))}
                        {
                            user.topics==[] ? <h1 className='text-2xl font-semibold'>Не указано</h1>
                            : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
        </div>
        </main>
  )
}

export default Profiles