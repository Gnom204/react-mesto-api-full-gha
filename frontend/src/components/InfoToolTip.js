import pictureYes from '../images/svg/Union.svg'
import pictureNo from '../images/svg/UnionNot.svg'
function InfooToolTip(props) {
    return (
        <>
            <div className={`popup ${((props.isOpenCurrent) ? 'popup_is-open' : '')}`}>
                <div className="popup__container">
                    <button className="popup__close" onClick={props.onClose}></button>
                    <img src={pictureYes} className='popup__secure-picture' alt="Регистрация прошла успешно" />
                    <h2 className="popup__heading popup__heading_position_center">Вы успешно зарегистрировались!</h2>
                </div>
            </div >
            <div className={`popup ${((props.isOpenError) ? 'popup_is-open' : '')}`}>
                <div className="popup__container">
                    <button className="popup__close" onClick={props.onClose}></button>
                    <img src={pictureNo} className='popup__secure-picture' alt="Регистрация прошла успешно" />
                    <h2 className="popup__heading popup__heading_position_center">Что-то пошло не так!
                        Попробуйте ещё раз.</h2>
                </div>
            </div >
        </>
    )
}

export default InfooToolTip