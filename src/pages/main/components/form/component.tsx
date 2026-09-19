import styles from "./component.module.scss"
import { useEffect, useState } from 'react';
import { SpawnAnimationWrapper } from "../../../common/effects/component";
export default function BitrixForm () {

  const testMode = false;

  const [ formStatus, setFormStatus ] = useState<string>("default");
  const [ formIsSended, setFormIsSended ] = useState<boolean>(false);

  const handleFormSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formIsSended) return;
    setFormStatus("loading");
    const formData = new FormData(event.target);
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();
    if (!email || !phone || !name) { setFormStatus("not-full-data-error"); return }
    if (email && !email.includes(".") && !email.includes("@") && !(email.length >= 5)) { setFormStatus("incorrect-data-error"); return}
    if (phone && !(phone.length>10)) { setFormStatus("incorrect-data-error"); return }
    
    const response = await fetch(`${testMode?"http://localhost:5000":""}/api/send_form/`, {
      headers: {"Content-Type": "application/json",},
      method: "POST",
      body: JSON.stringify({name: name, email: email, phone: phone}),
    });
    if (!response.ok) {setFormStatus("req-error"); return}
    else {setFormIsSended(true); setFormStatus("success") };
  }

  const formStatusTextTemplates: { [key: string]: string } = {
    "default": "Введите свои данные для связи",
    "incorrect-data-error": "Вы некорректно вели данные! Проверьте ещё раз!",
    "not-full-data-error": "Все поля обязательны для заполнения!",
    "button:loading": "Загрузка...",
    "button:success": "Успешно!",
    "button:default": "Отправить",
    "req-error": "Ошибка запроса!",
    "loading": "Идёт обработка...",
    "success": "Данные отправлены!"
  }


  useEffect(()=>{
    const formInputs = document.querySelectorAll<HTMLInputElement>(`.${styles.formInputContainer}`);
    // const onInputChange = (event: Event) => {
    //   const parent = event.currentTarget as HTMLDivElement;
    //   const target = event.target as HTMLInputElement;
    //   if (!target || !parent) return;
    //   if (target.value) parent.classList.add(styles.focused);
    //   if (document.activeElement === target) return;
    //   else parent.classList.remove(styles.focused);
    // }
    const oninputFocusIn = (event: Event) => {
      const parent = event.currentTarget as HTMLDivElement;
      parent.classList.add(styles.focused);
    }
    const oninputFocusOut = (event: Event) => {
      const parent = event.currentTarget as HTMLDivElement;
      parent.classList.remove(styles.focused);
    }
    formInputs.forEach((formInput) => {
      // formInput.addEventListener("input", onInputChange);
      formInput.addEventListener("focusin", oninputFocusIn);
      formInput.addEventListener("focusout", oninputFocusOut);
    });
    return () => formInputs.forEach((formInput) => {
      // formInput.removeEventListener("input", onInputChange);
      formInput.removeEventListener("focusin", oninputFocusIn);
      formInput.removeEventListener("focusout", oninputFocusOut);
    });
  }, [])

  return ( <SpawnAnimationWrapper>
  <div className={styles.bitrixFormContainer} id="form">
      <div className={styles.bitrixFormContainerContent}>
      <div className={styles.bitrixFormTitle}>
        Интересно? <br /> Отправьте нам свою заявку!
      </div>
      <form className={styles.bitrixForm} onSubmit={(e)=>handleFormSubmit(e)}>
        <div className={`${styles.formStatus} ${formStatus.includes("error")?styles.formStatusError:""}`}>
          {formStatusTextTemplates[formStatus]}
        </div>
        <div className={styles.formInputContainer}>
          <input type="text" name="name" className={styles.formInput}/>
          <div className={styles.additionText}>{"Как к вам обращаться?"}</div>
        </div>
        <div className={styles.formInputContainer}>
          <input type="text" name="email" className={styles.formInput}/>
          <div className={styles.additionText}>{"Ваша почта"}</div>
        </div>
        <div className={styles.formInputContainer}>
          <input type="text" name="phone" className={styles.formInput}/>
          <div className={styles.additionText}>{"Номер телефона"}</div>
        </div>
        <button type="submit" className={`${styles.submitButton} ${formStatus==="loading"?styles.submitButtonLoading:""} ${formStatus==="success"?styles.submitButtonSuccess:""}`}>{["loading", "success", "default"]
        .includes(formStatus)?formStatusTextTemplates[`button:${formStatus}`]:formStatusTextTemplates["button:default"]}</button>
      </form>
      </div> 

    </div>
  </SpawnAnimationWrapper> )
}