import React, { useEffect } from "react";
import RegsiterStyle from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../redux/Slices/users/UserSlice";

// Form Schema
const formSchema = Yup.object({
  email: Yup.string().required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const Login = () => {
  const storeData = useSelector((state) => state.users);
  const navigate = useNavigate();

  const { loading, loginData, appErr, serverErr } = storeData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginData) {
      navigate("/");
    }
  }, [navigate, loginData]);
  // formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      console.log(values);
      dispatch(loginUserAction(values));
    },

    validationSchema: formSchema,
  });
  return (
    <div className="w-[50%] bg-[#A5CD40] flex justify-center items-center m-auto flex-col my-20 rounded">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center h-[50vh] w-[100%] items-center"
      >
        <h3 className="mb-10 text-2xl text-white font-bold font-heading">
          Login Account–
          {appErr || serverErr ? (
            <div className="text-red-400 text-center">
              {serverErr} {appErr}
            </div>
          ) : null}
        </h3>
        <label className={RegsiterStyle.label}>Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          placeholder="Enter Your Email"
          className="w-[70%] py-2 rounded outline-none bg-transparent border placeholder:text-white placeholder:px-2 text-white px-2"
        />
        {/* Err msg*/}
        <div className={RegsiterStyle.error}>
          {formik.touched.email && formik.errors.email}
        </div>
        <label className={RegsiterStyle.label}>Password</label>
        <input
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your Password"
          className="w-[70%] py-2 rounded outline-none bg-transparent border placeholder:text-white placeholder:px-2 text-white px-2"
        />
        {/* Err msg*/}
        <div className={RegsiterStyle.error}>
          {formik.touched.password && formik.errors.password}
        </div>
        <div className="flex justify-around items-center w-full">
          {loading ? (
            <input
              value="Loading Please Wait"
              disabled
              className="py-4 w-auto bg-white text-[#A5CD40] font-bold rounded transition duration-200 text-center"
            />
          ) : (
            <input
              type="submit"
              value="Login"
              className="bg-white text-[#A5CD40] w-20 h-10 rounded cursor-pointer my-3"
            />
          )}
          <Link to="/forget-password">
            <div className="bg-white text-[#A5CD40] w-36 h-10 rounded cursor-pointer my-3 flex justify-center items-center">
              Forget Password
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
