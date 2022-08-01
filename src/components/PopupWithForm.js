function PopupWithForm({name, title, buttonText, isOpen, onClose, onSubmit, children}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_popup-opened"}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className={`popup-form popup-form_${name}`} name={name} method="post" onSubmit={onSubmit}>
          {children}
          <button className="popup-form__save-button" type="submit" aria-label="Сохранить изменения">{buttonText}</button>
        </form>
        <button className="popup__close-button" type="button" aria-label="Закрыть форму" onClick={onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;
