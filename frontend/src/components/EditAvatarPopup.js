import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = useRef('');

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} btnText="Сохранить" name="avatar" title="Обновить аватар" isClose={props.isClose} isOpen={props.isOpen}>
            <input ref={avatarRef} required type="url" id="avatar-input" placeholder="Ссылка на картинку" name="avatar"
                className="popup__form popup__form_type_description" />
            <span className="popup__error" id="avatar-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup