import Image from "next/image"
import Link from "next/link"
import {HiOutlineLogin} from "react-icons/hi"

const Header = ({isLogin}) => {
  return (
    <div className="flex w-full h-32 bg-blue justify-around">
        <div className="inline relative top-8">
            <Image src={"/favicon.png"} width={45} height={53} className="inline"/>
            <h1 className="text-xl font-bold inline ml-10">QuizzyWork</h1>
        </div>
        <div className="text-xl font-bold relative top-10">
            <ul>
                <li className="inline mr-10">
                    <Link href={"/profiles"}>Профили</Link>
                </li>
                <li className="inline mr-10">
                    <Link href={"/"}>Настройки</Link>
                </li>
                <li className="inline">
                    <Link href={"/"}>Запросы</Link>
                </li>
            </ul>
        </div>
        <div className="text-xl relative font-semibold top-10">
            {   !isLogin ?
                <Link href={"/login"}>
                    <HiOutlineLogin size={"30px"}/>
                </Link>
                : <h1>Профиль</h1>
            }
            
        </div>
    </div>
  )
}

export default Header