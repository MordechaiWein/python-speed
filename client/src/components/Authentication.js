import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function Authentication({updateUser}) {
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setSignUp((signUp) => !signUp);
  const formSchema = yup.object().shape({
    name: yup.string().required("Please enter a user name"),
    email: yup.string().email(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      fetch(signUp ? "/signup" : "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.ok) {
          res.json().then((user) => {
            updateUser(user);
            navigate("/");
          });
        } else {
          res.json().then((error) => {
            setError(error.message);
            resetForm({
              values: formik.initialValues,
              validationSchema: formik.validationSchema,
            });
          });
        }
      });
    },
  });

  return (
    <> 
    <h2 style={{color:'red'}}> {formik.errors.name}</h2>
    {error&& <h2 style={{color:'red'}}> {error}</h2>}
    <h2>Please Log in or Sign up!</h2>
    <h2>{signUp?'Already a member?':'Not a member?'}</h2>
    <button onClick={handleClick}>{signUp?'Log In!':'Register now!'}</button>
    <form onSubmit={formik.handleSubmit}>
    <label>
      Username
      </label>
    <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} />
    <label>
    Password
    </label>
    <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
    {signUp&&(
      <>
      <label>
      Email
      </label>
      <input type='text' name='email' value={formik.values.email} onChange={formik.handleChange} />
       </>
    )}
    <input type='submit' value={signUp?'Sign Up!':'Log In!'} />
  </form>
    </>
)
}
export default Authentication;
