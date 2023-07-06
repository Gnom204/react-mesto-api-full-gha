function PopupWithForm(props) {
    return (
        <div className={`popup ${props.name}-popup ${((props.isOpen) ? 'popup_is-open' : '')}`}>
            <div className="popup__container">
                <button className="popup__close" onClick={props.isClose}></button>
                <h2 className="popup__heading">{props.title}</h2>
                <form onSubmit={props.onSubmit} name={`popup__${props.name}forms`} className="popup__forms">
                    <>{props.children}</>
                    <button className={`popup__save-button popup__${props.name}-btn`}>{props.btnText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm