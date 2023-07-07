import React from "react"
import Card from "./Card"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
function Main(props) {
    const user = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-bg" onClick={props.EditAvatarClick}>
                    <img src={`${user ? user.avatar : ''}`} alt="" className="profile__avatar" />
                </div>
                <div className="profile__intro">
                    <div className="profile__container">
                        <h1 className="profile__title">{user ? user.name : ''}</h1>
                        <button type="button" aria-label="Редактировать" className="profile__edit-button" onClick={props.EditProfileClick}></button>
                    </div>
                    <p className="profile__subtitle">{user ? user.about : ''}</p>
                </div>
                <button type="button" aria-label="Добавить" className="profile__add-button" onClick={props.AddPlaceClick}></button>
            </section>
            <div className="elements">
                <ul className="elements__container">
                    {props.cards.map((cardConfig, i) => (
                        <Card card={cardConfig} key={cardConfig._id} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} />
                    ))}
                </ul>
            </div>
        </main>
    )
}

export default Main