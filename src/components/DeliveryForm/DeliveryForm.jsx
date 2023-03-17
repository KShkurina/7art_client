import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import MaskedInput from 'react-text-mask'
import { useSendMailMutation } from "../../API/sendMailAPI";



const MyInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    console.log(props)


    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field} />
            {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
        </>
    )
};
const MyPhone = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <MaskedInput {...props} {...field} />
            {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
        </>
    )
};

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });

    return (
        <>
            <label className="checkbox">
                <input type='checkbox'{...props} {...field} />
                {children}
            </label>
            {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
        </>
    )
};

const DeliveryForm = () => {
    const user = useSelector((store) => store.header.user);
    // const products = useSelector((store)=>store.cart.userCart.products)
    const [sendMail] = useSendMailMutation();
    const products = useSelector(state => state?.cart?.userCart?.products)
    // console.log(products)
    console.log('2')

    const totalPrice = products?.reduce((total, currentValue) => {
        console.log('3')
        return currentValue.cartQuantity * currentValue.product.currentPrice + total
    },
        0)


    
    console.log(user)
    const initValues = {
        name: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.telephone || '',
        text: '',
        address: '',
        terms: false
    }
    const send = async (data) => {
        console.log('ОТПРАВЛЯЕМ', data)
        const res = await sendMail({

            name: data.name,
            lastName: data.lastName,
            email: data.email,
            address: data.address,
            phone: data.phone,
            message: data.text,
            order: products

        }).unwrap();

    }


    // console.log(res)
    // const dispatch = useDispatch()
    //   const infoCustomer = useSelector(store=> store.deliveryReducer)
    return (
        <Formik

            initialValues={initValues}


            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Имя минимум 2 символа для заполнения!')
                    .required('Обязательное поле'),
                lastName: Yup.string()
                    .min(2, 'Фамилия минимум 2 символа для заполнения!')
                    .required('Обязательное поле'),
                email: Yup.string()
                    .email('Некорректный email адрес')
                    .required('Обязательное поле'),

                address: Yup.string()
                    .min(15, 'Имя минимум 15 символов для заполнения!')
                    .required('Обязательное поле'),


                phone: Yup.string().required('Обязательное поле').matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, 'не верны формат'),


                text: Yup.string()
                    .min(10, 'Не менее 10 символов').max(20, 'Не более 20 символов'),
                terms: Yup.boolean()
                    .required('Необходимо согласие')
                    .oneOf([true], 'Необходимо согласие')
            })}
            enableReinitialize={true}
        onSubmit={values => send(values)}

        >
            {({ values }) => (
                <Form className="form" >

                    <MyInput
                        label='Ваше имя'
                        id='name'
                        name='name'
                        type='text'
                    />

                    <MyInput
                        label='Ваше фамилия'
                        id='lastName'
                        name='lastName'
                        type='text'
                    />

                    <MyInput
                        label='Ваша почта'
                        id='email'
                        name='email'
                        type='email'
                    />

                    <MyInput
                        label='Адрес доставки'
                        id='address'
                        name='address'
                        type='text'
                    />
                    <MyPhone
                        label='Мобильный Телефон'
                        id='phone'
                        name='phone'
                        type='text'
                        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    />

                    <label htmlFor='text'>Ваше сообщение</label>
                    <Field className="textarea"
                        id='text'
                        name='text'
                        as='textarea'
                    />
                    <ErrorMessage name='text' className="error" />

                    <MyCheckbox
                        name='terms'>

                        Соглашаетесь с политикой конфиденциальности?
                    </MyCheckbox>
                    <p>К оплате: {totalPrice} UAH </p>
                    <button className="buttonForm " type='submit'>Отправить</button>
                </Form>)}

        </Formik>
    )
}

export default DeliveryForm;


