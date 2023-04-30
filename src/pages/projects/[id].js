import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { useState, useEffect } from 'react'
import { HiOutlineCheck } from 'react-icons/hi'
import { useRouter } from 'next/router'
import axios from 'axios'
import Header from '@/components/header'
import useCookies from 'react-cookie/cjs/useCookies'

const montserrat = Montserrat({ subsets: ['latin'] })


const Profiles = () => {
    const router = useRouter()
    const [cookies, setCookies, removeCookies] = useCookies()

    const {id} = router.query
    const [project, setProjects] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await axios.get(
                    `https://hackaton-tinder.onrender.com/profile/get-profile-by-id/${id}`, 
                ).then(
                    (result) => {
                        setProjects(result.data)
                        setLoading(false)
                    }
                )
                
            }
            catch (e) {
                console.log(e)
            }
        }
        if (loading && id) {
            fetchData()
        }
        
    } )
    const nextPage = () => {
        window.location.href = `/projects/${Number(id)+1}`
    }
    const sendRequest = async () => {
        try {
            const data = await axios({
                url: `https://hackaton-tinder.onrender.com/request/request-from-user-to-profile/${id}`,
                method: "GET",
                headers: {
                    
                        "Authorization": `Bearer ${cookies.token}`
                    
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <main className={` ${montserrat.className} min-h-screen min bg-blue `}>
    <div>
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
                        <h2 className='text-lg font-medium'>Название</h2>
                        <h1 className='text-2xl font-semibold mb-5'>{project.name}</h1>
                        <h2 className='text-lg font-medium'>Про проект</h2>
                        <h1 className='text-2xl font-semibold mb-5'>{project.text}</h1>
                        <h2 className='text-lg font-medium'>Темы</h2>
                        {project.topics?.map((value, inx) => (<h1 className='text-2xl font-semibold' key={inx}>{value.name}</h1>))}
                        {
                            project.topics==[] ? <h1 className='text-2xl font-semibold'>Не указано</h1>
                            : <></>
                        }
                    </div>
                </div>
                <div className='grid grid-cols-2'>
                    <button onClick={nextPage}>Дальше</button>
                    <button onClick={sendRequest}>Отправить заявку</button>

                </div>
            </div>
        </div>
        </div>
        </div>
        
        </main>
  )
}

export default Profiles