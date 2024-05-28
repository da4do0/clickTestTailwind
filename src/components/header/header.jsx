import logo from '../../../public/logo.png';
import userSvg from '../../assets/user.svg';

export default function Header(){
    return(
        <header className=' h-[100px] border-b-[1px] border-[#ffffff34] flex justify-around items-center'>
            <div className='w-[100px]'>
                <img src={logo} alt="logo"/>
            </div>
            <nav className=''>
                <ul className=' inline-flex gap-[25px] items-center'>
                    <li className=' text-xl w-[150px] text-center'>Click test</li>
                    <li className=' text-xl w-[150px] text-center'>Space test</li>
                </ul>
            </nav>
            <div className=' w-[100px]'>
                <img src={userSvg} alt="user icon"/>
            </div>
        </header>
    );
}