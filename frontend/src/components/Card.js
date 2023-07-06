import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = useContext(CurrentUserContext)
    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__like_type_active'}`
    );
    function handleClick() {
        props.onCardClick(props.card)
    }

    function handleCardDelete() {
        props.onCardDelete(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    return (
        <li className="element">
            {isOwn && <div className="element__trash-can" onClick={() => handleCardDelete()}></div>}
            <img onClick={() => handleClick()} src={props.card.link} alt={props.card.name} className="element__img" />
            <div className="element__group">
                <h2 className="element__heading">{props.card.name}</h2>
                <div className="element__like-group">
                    <button type="button" onClick={() => handleLikeClick()} className={cardLikeButtonClassName}></button>
                    <span className="element__like-amount">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}
export default Card