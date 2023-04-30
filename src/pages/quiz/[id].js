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
    const profile_id = router.query.id
    const [quiz, setQuiz] = useState({})
    const [loading, setLoading] = useState(true)
    const [answers, setAnswers] = useState([ ])
    const [cookies, setCookies, removeCookies] = useCookies()

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await axios(
                    {
                        url: `https://hackaton-tinder.onrender.com/quiz/get-quiz-by-profile-id?profile_id=${profile_id}`,
                        method: "GET",
                    }
                    
                ).then(
                    (result) => {
                        setQuiz(result.data)
                        console.log(result.data)
                        setLoading(false)
                    }
                )
                
            }
            catch (e) {
                console.log(e)
            }
        }
        if (loading && profile_id) {
            fetchData()
           

        }
        
    } )
    const checkQuiz = async () => {
        
            try {
                const data = await axios({
                    url: `https://hackaton-tinder.onrender.com/request/request-from-user-to-profile/${profile_id}`,
                    method: "GET",
                    headers: {
                        
                            "Authorization": `Bearer ${cookies.token}`
                        
                    }
                })
                return (<h1>Отправлено</h1>)
            } catch (e) {
                console.log(e)
            }
        
    }
    return (
        <main className={` ${montserrat.className} min-h-screen min bg-blue `}>
            <Header />
            { !loading ? <div className='flex align-middle justify-center'>
                <div className='flex w-5/12 h-2/3 bg-white rounded-3xl align-middle relative top-32'>
                    <div className='m-10'>
                        { quiz.questions.map((value, inx) => (
                            
                            <div className=''>
                                <h1 className=' text-2xl font-semibold'>{value.title}</h1>
                                <div className='grid grid-cols-2'>
                                    {value.answers.map((answer, inx) => (
                                        <div>
                                            <button className='m-10 text-xl font-medium' onClick={() => {
                                                setAnswers(old => [...old, answer.is_right])
                                                console.log(answers)
                                            }}>{answer.title}</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                        }
                        <button onClick={checkQuiz}>Решено</button>
                    </div>
                </div>
            </div>
            : <>loading</>}
        </main>
  )
}

export default Profiles