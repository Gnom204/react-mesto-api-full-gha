import { useContext, useEffect, useState } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm"
function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        currentUser && setName(currentUser.name);
        currentUser && setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
        console.log(name)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser(name, description);
    }
    return (
        <PopupWithForm onSubmit={handleSubmit} btnText="Сохранить" name="profile" title="Редактировать Профиль" isClose={props.closeAllPopups} isOpen={props.isOpen}>
            <input value={name} onChange={handleChangeName} required type="text" placeholder="Имя" name="userName" minLength="2" maxLength="40"
                id="profile-name" className="popup__form popup__form_type_name" />
            <span className="popup__error" id="profile-name-error"></span>
            <input value={description} onChange={handleChangeDescription} required type="text" placeholder="Вид деятельности" name="userDescription" id="popup-description"
                minLength="2" maxLength="200" className="popup__form popup__form_type_description" />
            <span className="popup__error" id="popup-description-error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup