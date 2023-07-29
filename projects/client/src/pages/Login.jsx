import { Box, useDisclosure } from '@chakra-ui/react';
import * as Yup from "yup";
import { useFormik } from "formik";
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess } from '../redux/reducer/AuthReducer';

const Login = () => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const onForgot = () => {
      onOpen();
    };

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const login = async (values) => {
      try {
        const res = await axios.post(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
          {
            username: values.username,
            password: values.password,
          }
        );
        console.log(res);
        if (res.status === 200) {
          dispatch(loginSuccess(res.data.token));
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    };

    const LoginSchema = Yup.object().shape({
      identifier: Yup.string().required("This field is required"),
      password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: (values) => {
        login(values);
      },
    });

  return (
    <Box>

    </Box>
  )
}

export default Login