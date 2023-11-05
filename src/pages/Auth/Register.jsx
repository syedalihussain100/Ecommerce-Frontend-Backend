import React, { useEffect } from "react";
import RegsiterStyle from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUserAction } from "../../redux/Slices/users/UserSlice";
import { useDispatch, useSelector } from "react-redux";

// Form Schema
const formSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const Register = () => {
  const storeData = useSelector((state) => state.users);
  const navigate = useNavigate();

  const { loading, registered, appErr, serverErr } = storeData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (registered) {
      navigate("/login");
    }
  }, [navigate, registered]);

  // formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      console.log(values);
      dispatch(registerUserAction(values));
    },

    validationSchema: formSchema,
  });
  return (
    <div className="w-[50%] bg-[#A5CD40] flex justify-center items-center m-auto flex-col my-20 rounded">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center h-auto w-[100%] items-center"
      >
        <h3 className="mb-10 text-2xl text-white font-bold font-heading">
          Register Account–
          {appErr || serverErr ? (
            <div className="text-red-400 text-center">
              {serverErr} {appErr}
            </div>
          ) : null}
        </h3>
        <label className={RegsiterStyle.label}>Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange("name")}
          onBlur={formik.handleBlur("email")}
          placeholder="Enter Your Name"
          className="w-[70%] py-2 rounded outline-none bg-transparent border placeholder:text-white placeholder:px-2 text-white px-2"
        />
        {/* Err msg*/}
        <div className={RegsiterStyle.error}>
          {formik.touched.name && formik.errors.name}
        </div>
        <label className={RegsiterStyle.label}>Email</label>
        <input
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          name="email"
          id="email"
          placeholder="Enter Your Email"
          className="w-[70%] py-2 rounded outline-none bg-transparent border placeholder:text-white placeholder:px-2 text-white px-2"
        />
        {/* Err msg*/}
        <div className={RegsiterStyle.error}>
          {formik.touched.email && formik.errors.email}
        </div>
        <label className={RegsiterStyle.label}>Password</label>
        <input
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          name="password"
          id="password"
          placeholder="Enter Your Password"
          className="w-[70%] py-2 rounded outline-none bg-transparent border placeholder:text-white placeholder:px-2 text-white px-2"
        />
        {/* Err msg*/}
        <div className={RegsiterStyle.error}>
          {formik.touched.password && formik.errors.password}
        </div>
        <div className="flex items-center gap-3">
          {loading ? (
            <input
              value="Loading Please Wait"
              disabled
              className="py-4 bg-white text-[#A5CD40] font-bold rounded transition duration-200 text-center w-auto"
            />
          ) : (
            <input
              type="submit"
              value="Register"
              className="bg-white text-[#A5CD40] w-20 h-10 rounded cursor-pointer my-3"
            />
          )}
          <Link to="/login">
            <div className="bg-white text-[#A5CD40] w-20 h-10 rounded cursor-pointer my-3 flex items-center justify-center">
              Login
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
