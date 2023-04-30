import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import Link from 'next/link'
import Header from "@/components/header.jsx"
import useCookies from 'react-cookie/cjs/useCookies'
import { useEffect, useState } from 'react'
import axios from 'axios'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const [cookies, setCookies, removeCookies] = useCookies()
  const [requests_to_me, setRequestsToMe] = useState([])
  const [requests_to_me_, setRequestsToMe_] = useState([])
  useEffect(() => {
    const data = axios({
        url: 'https://hackaton-tinder.onrender.com/request/get-requests-from-user-to-profile',
        method: "GET",
        headers: {Authorization: "Bearer "+cookies.token}
    }).then(
        (res) => setRequestsToMe(res.data)
    )
    const data2 = axios({
        url: 'https://hackaton-tinder.onrender.com/request/get-req-from-profile',
        method: "GET",
        headers: {Authorization: "Bearer "+cookies.token}
    }).then(
        (res) => setRequestsToMe_(res.data)
    )
  }, [])
  console.log(requests_to_me)
  return (
    <main className={`${montserrat.className}`}>
      <div>
        <Header />
        <div className='flex mt-20 ml-auto mr-auto justify-evenly'>
          <div>
                <h1 className='text-xl font-medium'>Запросы для вашего проекта</h1>
                {
                    requests_to_me.map((value, inx) => (
                        <div className='bg-gray-200'>
                            <h1>Про пользователя</h1>
                            <h1 className='text-xl font-medium m-10'>{value.user_about}</h1>
                            <h1>Данные для связи</h1>
                            <h1 className='text-xl font-medium m-10'>{value.user_contacts}</h1>
                        </div>
                    ))
                }
          </div>
          <div>
                <h1 className='text-xl font-medium'>Запросы для вас</h1>
                {
                    requests_to_me_.map((value, inx) => (
                        <div className='flex'>
                            <Link href={`/projects/${value.profile_id}`} className='text-xl font-medium'>Запрос от проекта</Link>
                            <button onClick={() => {
                                axios({
                                    method: "GET",
                                    headers: {Authorization: "Bearer "+cookies.token},
                                    url: `https://hackaton-tinder.onrender.com/request/answer-on-req-from-profile?req_id=${value.id}&answer=true`
                                })
                            }}>Принять</button>
                            <button onClick={() => {
                                axios({
                                    method: "GET",
                                    headers: {Authorization: "Bearer "+cookies.token},
                                    url: `https://hackaton-tinder.onrender.com/request/answer-on-req-from-profile?req_id=${value.id}&answer=false`
                                })
                            }}>Отменить</button>                          
                        </div>
                    ))
                }
          </div>
        </div>
      </div>
    </main>
  )
}
