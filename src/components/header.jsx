import Image from "next/image"
import Link from "next/link"
import {HiOutlineLogin} from "react-icons/hi"
import useCookies from 'react-cookie/cjs/useCookies'
import { useState, useEffect } from "react"
import axios from "axios"


const Header = () => {
    const [cookies, setCookies, removeCookies] = useCookies()

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    if (cookies.token) {
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
                    if (e.response.status === 400 || 401) {
                        window.location.href = "/login"
                    }
                }
            }
            if (loading) {
                fetchData()
                setLoading(false)
    
            }
            
        } )
    }
    
  return (
    <div className="flex w-full h-32 bg-blue justify-around">
        <div className="inline relative top-8">
            <Image src={"/favicon.png"} width={45} height={53} className="inline" alt="kk"/>
            <h1 className="text-xl font-bold inline ml-10">QuizzyWork</h1>
        </div>
        <div className="text-xl font-bold relative top-10">
            <ul>
                <li className="inline mr-10">
                    <Link href={"/profiles"}>Профили</Link>
                </li>
                <li className="inline mr-10">
                    <Link href={"/projects/1"}>Проекты</Link>
                </li>
                <li className="inline mr-10">
                    <Link href={"/projects/create"}>Создать проект</Link>
                </li>
                <li className="inline mr-10">
                    <Link href={"/settings"}>Настройки</Link>
                </li>
                <li className="inline">
                    <Link href={"/requests"}>Запросы</Link>
                </li>
            </ul>
        </div>
        <div className="text-xl relative font-semibold top-10">
            {   !user ?
                <Link href={"/login"}>
                    <HiOutlineLogin size={"30px"}/>
                </Link>
                : <Link href={"/profiles/me"}><h1 className="">{user.username}</h1></Link>
            }
            
        </div>
    </div>
  )
}

export default Header