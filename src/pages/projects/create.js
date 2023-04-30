import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { useState, useEffect } from 'react'
import { HiOutlineCheck } from 'react-icons/hi'
import axios from 'axios'
import useCookies from 'react-cookie/cjs/useCookies'
import Header from '@/components/header'
const montserrat = Montserrat({ subsets: ['latin'] })


const CreateProject = () => {
    const [cookies, setCookies, removeCookies] = useCookies()
    const [ topic, setTopic ] = useState("")
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [quiz, setQuiz] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await axios.get(
                    `https://hackaton-tinder.onrender.com/profile/get-profile-of-current-user`, {
                        headers: {
                            "Authorization": `Bearer ${cookies.token}`
                        }
                    }
                ).then(
                    (result) => {
                        if (result.data !== null) {
                            window.location.href = "/projects/me"
                        }
                        setLoading(false)

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
        }
        
    } )
    
    const [ name, setName ] = useState(user.about)
    const [ about, setAbout ] = useState(user.contacts)
    const [ topics, setTopics ] = useState([])
    const addTopic = () => {
        setTopics(oldArray => [...oldArray, topic])
        document.getElementById("input-for-topics").value = ""
        console.log(topics)
    }
    
    const createProject = async () => {    
        const data1 = await axios({
            method: "POST",
            url: `https://hackaton-tinder.onrender.com/profile/create-profile`, 
                headers: {
                    Authorization: 'Bearer ' + cookies.token //the token is a variable which holds the token
                  }, 
                data: {
                    topics, name, text: about
                }
        })
        window.location.href = "/projects/me"
    }
    return (
    <main className={` ${montserrat.className} min-h-screen min bg-blue align-middle justify-center`}>
        <Header />
        <div className='flex w-5/12 h-2/3 bg-white rounded-3xl align-middle relative top-32'>
            <div className='m-10'>
                <Image src={"/favicon.png"} width={45} height={53} />
                <h1 className='text-3xl font-bold'>Создать проект в QuizzyWork!</h1>
                <h2 className='text-2xl font-semibold mb-10'>Следуй с нами!</h2>
                <h2 className='text-lg font-medium'>Название</h2>
                <input className='text-xl font-medium border border-black p-2 mb-8 w-64' placeholder='Название' onChange={e => setName(e.target.value)}></input>
                <h2 className='text-lg font-medium'>Про проект</h2>
                <textarea className='text-xl font-medium border border-black p-2 w-64 ' placeholder='Связь' onChange={e => setAbout(e.target.value)}></textarea>
                <h2 className='text-lg font-medium'>Темы</h2>
                <input className='text-xl font-medium border border-black p-2 w-64 ' placeholder='Темы' onChange={e => setTopic(e.target.value)} id='input-for-topics'></input>
                <button onClick={addTopic} className='bg-blue ml-10 text-center rounded-full w-72 h-16 mt-10 text-xl font-semibold'>Добавить тему</button>
                {/* <textarea className='text-xl font-medium border border-black p-2 w-64 ' placeholder='Квиз' onChange={e => setQuiz(e.target.value)} value={""}></textarea> */}
                <button className='bg-blue text-center rounded-full w-72 h-16 mt-10' onClick={createProject}>
                    <h1 className='text-xl font-semibold'>Обновить инфу</h1>
                </button>
            </div>
            <div></div>
        </div>
    </main>
  )
}

export default CreateProject