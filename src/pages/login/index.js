import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { useState } from 'react'
import { HiOutlineCheck } from 'react-icons/hi'
import axios from 'axios'
import useCookies from 'react-cookie/cjs/useCookies'
import Header from '@/components/header'
import Link from 'next/link'


const montserrat = Montserrat({ subsets: ['latin'] })


const Login = () => {
    const [cookies, setCookies, removeCookies] = useCookies()
    const [ type, setType ] = useState('password');
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const changeType = () => {
        if (type==='text'){
            setType('password')
        }
        else if (type==='password'){
            setType('text')
        }
    };
    const loginUser = () => {
        const {data} = axios({
            url:"https://hackaton-tinder.onrender.com/auth/login",
            method: "POST",
            data: {
                username, password
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(
            d => {
                setCookies("token",d.data.access_token, )
                window.location.href = "/profiles/me"
            }
        ).catch(e=>console.log(e))
        
    }
    return (
    <main className={`flex ${montserrat.className} min-h-screen min bg-blue align-middle justify-center`}>
        <div className='grid w-5/12 h-2/3 bg-white rounded-3xl align-middle relative top-32'>
            <div className='m-10'>
                <Image src={"/favicon.png"} width={45} height={53} />
                <h1 className='text-3xl font-bold'>Войти в QuizzyWork!</h1>
                <h2 className='text-2xl font-semibold mb-10'>Следуй с нами!</h2>
                <input className='text-xl font-medium border border-black p-2 mb-8 w-64' placeholder='Никнейм' onChange={e => setUsername(e.target.value)}></input>
                <div className='grid'>
                    <input className='text-xl font-medium border border-black p-2 w-64 ' placeholder='Пароль' type={type} onChange={e => setPassword(e.target.value)}></input>
                
                    
                    <button onClick={changeType} className='rounded-lg bg-gray-200 w-8 h-8 text-center border-gray-700 mt-4'><h2>
                        { type==="text" ?  <HiOutlineCheck className='left-2'/>
                            : <></>
                        }
                    </h2></button> 
                </div>
                <button className='bg-blue text-center rounded-full w-72 h-16 mt-10'yyy onClick={loginUser}>
                    <h1 className='text-xl font-semibold'>Войти</h1>
                </button>
                <Link href={"/registration"}>Или Зарегистрируйся</Link>
            </div>
            <div></div>
        </div>
    </main>
  )
}

export default Login