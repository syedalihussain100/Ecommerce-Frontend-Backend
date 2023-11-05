import React from "react";
import RegsiterStyle from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgetPasswordAction } from "../../redux/Slices/users/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Form Schema
const formSchema = Yup.object({
  email: Yup.string().required("Email is Required"),
});

const ForgetPassword = () => {
  const storeData = useSelector((state) => state.users);
  const navigate = useNavigate();

  const { loading, forgetPassword, appErr, serverErr } = storeData;
  const dispatch = useDispatch();

  // formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: (values) => {
      console.log(values);
      dispatch(forgetPasswordAction(values));
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
          Forget Password–
          {appErr || serverErr ? (
            <div className="text-red-400 text-center">
              {serverErr} {appErr}
            </div>
          ) : null}
        </h3>
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
              value="Submit"
              className="bg-white text-[#A5CD40] w-20 h-10 rounded cursor-pointer my-3"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
