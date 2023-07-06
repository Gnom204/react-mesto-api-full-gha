import { Link } from 'react-router-dom'
import logo from '../images/logo/logo.svg'
function Header(props) {

    // const [burgerOpen, setBurgerOpen] = useState(false)

    // const handleBurgerClick = () => {
    //     setBurgerOpen(!burgerOpen)
    // }

    return (
        <header className="header">
            <img src={logo} alt="Логотип с надписью Место" className="header__logo" />
            <div className='header__burger-menu'>
                <span className='header__email'>{props.email}</span>
                <Link onClick={props.onClick} to={`${props.link}`} className='header__link'>{props.title}</Link>
            </div>
            {/* <button onClick={handleBurgerClick} className='header__burger-btn' type='button'>
                <span>-</span>
                <span>-</span>
                <span>-</span>
            </button> */}
        </header>
    )
}

export default Header