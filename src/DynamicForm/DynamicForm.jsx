import styles from './DynamicForm.module.css'
import { useForm } from "react-hook-form";
import { useState } from "react";

const DynamicForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const firstFieldValue = watch("firstField");
    const isFirstValid = firstFieldValue && firstFieldValue.length >= 5;
    const [isSubmitted, setIsSubmitted] = useState(false);
    console.log(isFirstValid);

    const onSubmit = (data) => {
        console.log("Form Dat", data);
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <><div className={styles.container}>
            <h1>Dymanic Form</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="firstField">Fierst Field (min. 5 symbols):</label>
                    <input id='firstField'
                        {...register('firstField', {
                            required: 'This field is required',
                            minLength: {
                                value: 5,
                                message: 'Minimum 5 symbols',
                            },
                        })}
                    />
                    {errors.firstField && (
                        <p className={styles.error}>
                            {errors.firstField.message}
                        </p>
                    )}
                    {isSubmitted && (
                        <p className={styles.success}>The form has been sent successfully!</p>
                    )}
                </div>
                {isFirstValid && (
                    <div className={styles.formGroup}>
                        <label htmlFor="secondField">Second Field</label>
                        <input id='secondField'
                            {...register('secondField', {
                                required: 'This field is required'
                            })} />
                        {errors.secondField && (
                            <p className={styles.error}>
                                {errors.secondField.message}
                            </p>
                        )}

                    </div>
                )}
                <button type='submit' className={styles.button}>
                    Send
                </button>
            </form> </div>
        </>
    )
}
export default DynamicForm;