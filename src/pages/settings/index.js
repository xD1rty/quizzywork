import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { useState, useEffect } from 'react'
import { HiOutlineCheck } from 'react-icons/hi'
import axios from 'axios'
import useCookies from 'react-cookie/cjs/useCookies'
import Header from '@/components/header'
const montserrat = Montserrat({ subsets: ['latin'] })


const Settings = () => {
    const [cookies, setCookies, removeCookies] = useCookies()
    
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await axios.get(
                    `https://hackaton-tinder.onrender.com/user/get-current-user`, {
                        headers: {
                            "Authorization": `Bearer ${cookies.token}`
                        }
                    }
                ).then(
                    (result) => {
                        setUser(result.data)
                    }
                )
                
            }
            catch (e) {
                console.log(e)
                if (e.response.status === 400) {
                    window.location.href = "/login"
                }
            }
        }
        if (loading) {
            fetchData()
            setLoading(false)

        }
        
    } )
    const [ about, setAbout ] = useState(user.about)
    const [ contacts_data, setContacts ] = useState(user.contacts)
    const [ topics, setTopics ] = useState('')
    const changeData = async () => {
        console.log(topics)
        
            const topics_list = topics.split(',') || topics
            setTopics(topics_list)
        
        const data2 = await axios({
            method: "PUT",
            url: `https://hackaton-tinder.onrender.com/user/edit-contact?contacts_data=${contacts_data}`,
                headers: {
                    Authorization: 'Bearer ' + cookies.token //the token is a variable which holds the token
                  },          
        }
        
        )
        const data3 = await axios({
            method: "PUT",

            url : `https://hackaton-tinder.onrender.com/user/edit-about?about=${about}`, 
                headers: {
                    Authorization: 'Bearer ' + cookies.token //the token is a variable which holds the token
                  },
        }
            
        )
        const data1 = await axios({
            method: "PUT",
            url: `https://hackaton-tinder.onrender.com/user/edit-topics`, 
                headers: {
                    Authorization: 'Bearer ' + cookies.token //the token is a variable which holds the token
                  }, 
                data: {
                    topics: topics_list
                }
        })
        window.location.href = "/profiles/me"
    }
    return (
    <main className={` ${montserrat.className} min-h-screen min bg-blue align-middle justify-center`}>
        <Header />
        <div className='flex w-5/12 h-2/3 bg-white rounded-3xl align-middle relative top-32'>
            <div className='m-10'>
                <Image src={"/favicon.png"} width={45} height={53} />
                <h1 className='text-3xl font-bold'>Изменить данные в QuizzyWork!</h1>
                <h2 className='text-2xl font-semibold mb-10'>Следуй с нами!</h2>
                <h2 className='text-lg font-medium'>О вас</h2>
                <textarea className='text-xl font-medium border border-black p-2 mb-8 w-64' placeholder='О вас' onChange={e => setAbout(e.target.value)}></textarea>
                <h2 className='text-lg font-medium'>Связь</h2>
                <textarea className='text-xl font-medium border border-black p-2 w-64 ' placeholder='Связь' onChange={e => setContacts(e.target.value)}></textarea>
                <h2 className='text-lg font-medium'>Темы (писать через запятую без пробелов)</h2>
                <textarea className='text-xl font-medium border border-black p-2 w-64 ' placeholder='Темы' onChange={e => setTopics(e.target.value)}></textarea>
                
                <button className='bg-blue text-center rounded-full w-72 h-16 mt-10' onClick={changeData}>
                    <h1 className='text-xl font-semibold'>Обновить инфу</h1>
                </button>
            </div>
            <div></div>
        </div>
    </main>
  )
}

export default Settings