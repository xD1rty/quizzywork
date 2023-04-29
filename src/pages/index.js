import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import Link from 'next/link'
import Header from "@/components/header.jsx"
import useCookies from 'react-cookie/cjs/useCookies'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const [cookies, setCookies, removeCookies] = useCookies()
  console.log(cookies)
  let isLogin
  if (cookies) {
    isLogin=true
  } else {
    isLogin=false
  }
  return (
    <main className={`${montserrat.className}`}>
      <div>
        <Header isLogin={isLogin}/>
        <div className='flex mt-20 ml-auto mr-auto justify-evenly'>
          <div>
              <h1 className='text-4xl font-extrabold'>Ищешь команду?</h1>
              <h2 className='text-3xl font-bold mb-10'>Найди ее тут!</h2>
              <p className='text-2xl font-semibold w-96 mb-20'>Ты пришел на платформу QuizzyWork для поиска проектов для реализации! Сделай аккаунт, опиши свои навыки и ищи! Работодатели тебя заметят и выйдут на связь!</p>
              <div className='bg-blue text-center rounded-full w-72 h-16'>
                <Link href={"/registration"} className='text-xl font-semibold relative top-4'>Зарегистрироваться</Link>
              </div>
          </div>
          <div>
            <Image src={"/homeimage.png"} width={603} height={730} alt='home page'></Image>
          </div>
        </div>
      </div>
    </main>
  )
}
