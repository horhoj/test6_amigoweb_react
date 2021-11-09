import React from 'react';
import styled, { css } from 'styled-components';
import { FormikConfig, useFormik } from 'formik';
import { Input } from '../Input';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { Checkbox } from '../Checkbox';
import { ErrorMsg } from '../ErrorMsg';
import { SignUpValues, signUpValuesSchema } from './types';

const initialValues: SignUpValues = {
  name: '',
  email: '',
  telephone: '',
  language: '',
  accept: false,
};

const languageList: string[] = [
  'Русский',
  'Английский',
  'Китайский',
  'Испанский',
];

export const SignUpForm: React.FC = () => {
  const formikConfig: FormikConfig<SignUpValues> = {
    initialValues,
    onSubmit: (values) => {
      const msg = JSON.stringify(values, null, 2);
      alert(msg);
    },
    validationSchema: signUpValuesSchema,
    validateOnMount: true,
  };

  const formik = useFormik(formikConfig);

  return (
    <Wrap>
      <Title>Регистрация</Title>
      <TitleHelper>
        Уже есть аккаунт? <Link href="#">Войти</Link>
      </TitleHelper>
      <Form noValidate onSubmit={formik.handleSubmit} autoComplete={'off'}>
        <ElementWrap marginTop={58}>
          <Input
            type={'text'}
            label={'Имя'}
            placeholder={'Введите Ваше имя'}
            {...formik.getFieldProps('name')}
          />
          <ErrorMsg
            showError={
              Boolean(formik.touched.name) && Boolean(formik.errors.name)
            }
            error={formik.errors.name}
          />
        </ElementWrap>
        <ElementWrap marginTop={8}>
          <Input
            type={'email'}
            label={'Email'}
            placeholder={'Введите Ваш email'}
            {...formik.getFieldProps('email')}
          />
          <ErrorMsg
            showError={
              Boolean(formik.touched.email) && Boolean(formik.errors.email)
            }
            error={formik.errors.email}
          />
        </ElementWrap>
        <ElementWrap marginTop={8}>
          <Input
            type={'text'}
            label={'Телефон'}
            placeholder={'Введите номер телефона'}
            {...formik.getFieldProps('telephone')}
          />
          <ErrorMsg
            showError={
              Boolean(formik.touched.telephone) &&
              Boolean(formik.errors.telephone)
            }
            error={formik.errors.telephone}
          />
        </ElementWrap>
        <ElementWrap marginTop={8}>
          <Dropdown
            itemList={languageList}
            defaultValue={''}
            currentValue={String(formik.values.language)}
            onChange={(value) => formik.setFieldValue('language', value)}
            label={'Язык'}
            placeholder={'Язык'}
          />
        </ElementWrap>
        <ElementWrap marginTop={31}>
          <TermsWrap>
            <Checkbox {...formik.getFieldProps('accept')} />
            <div>
              Принимаю <Link href="#">условия</Link> использования
            </div>
          </TermsWrap>
        </ElementWrap>
        <ElementWrap marginTop={38}>
          <Button
            caption={'Зарегистрироваться'}
            disabled={!formik.isValid}
            type={'submit'}
          />
        </ElementWrap>
      </Form>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 40px 30px;
  min-height: 780px;
  max-width: 460px;
  background-color: #fff;
  width: 100%;
  border-radius: 24px;
  box-shadow: 0 12px 24px rgba(44, 39, 56, 0.02),
    0 32px 64px rgba(44, 39, 56, 0.04);
`;

const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 44px;
  color: #2c2738;
`;

const TextStyle = css`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #2c2738;
`;

const TitleHelper = styled.div`
  ${TextStyle};
  margin-top: 8px;
`;

const Link = styled.a`
  ${TextStyle};
  text-decoration: none;
  color: #0880ae;
`;

const Form = styled.form`
  width: 100%;
`;

const ElementWrap = styled.div<{ marginTop: number }>`
  margin-top: ${({ marginTop }) => marginTop}px;
`;

const TermsWrap = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #756f86;

  & > div:not(:last-child) {
    margin-right: 10px;
  }
`;
