import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }


    function handleSubmit(e) {
        e.preventDefault();

        props.onAddCard(name, link)
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} btnText="Создать" name="AddCard" title="Новое место" isClose={props.closeAllPopups} isOpen={props.isOpen}>
            <input value={name} onChange={handleChangeName} required minLength="2" maxLength="30" type="text" placeholder="Название" id="popupAddCardTitle"
                name="name" className="popup__form popup__form_type_name" />
            <span className="popup__error" id="popupAddCardTitle-error"></span>
            <input value={link} onChange={handleChangeLink} required type="url" placeholder="Ссылка на картинку" id="popupAddCardLink" name="link"
                className="popup__form popup__form_type_description" />
            <span className="popup__error" id="popupAddCardLink-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup