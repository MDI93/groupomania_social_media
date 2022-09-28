import logo from '../assets/icon-left-font-monochrome-black.svg'
import '../styles/Banner.css'

function Banner() {
    return  <div className='grpmania-banner'>
                <img src={logo} alt='Groupomania' className='grpmania-logo' />
            </div>
}

export default Banner