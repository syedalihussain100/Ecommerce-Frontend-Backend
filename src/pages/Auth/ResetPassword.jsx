import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { resetPasswordAction } from "../../redux/Slices/users/UserSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import RegsiterStyle from "./Register.module.css";

// Form Schema
const formSchema = Yup.object({
  password: Yup.string().required("password is Required"),
});

const ResetPassword = () => {
  const storeData = useSelector((state) => state.users);
  //   const navigate = useNavigate();

  const { loading, resetPassword, appErr, serverErr, message } = storeData;
  const dispatch = useDispatch();
  const match = useMatch("/password/reset/:token");
  let token = match.params.token;
  console.log(token);

  // formik
  const formik = useFormik({
    initialValues: {
      password: "",
    },

    onSubmit: (values) => {
      const data = {
        password: values?.password,
        token,
      };

      dispatch(resetPasswordAction(data));
    },

    validationSchema: formSchema,
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center items-center h-[50vh] bg-[#A5CD40] w-[50%] m-auto mt-24 rounded"
      >
        <h3 className="mb-10 text-2xl text-white font-bold font-heading">
          Reset Password–
          {appErr || serverErr ? (
            <div className="text-red-400 text-center">
              {serverErr} {appErr}
            </div>
          ) : null}
        </h3>
        <h4 className="text-white">{message && message ? message : null}</h4>
        <label className="w-[70%] py-2 text-white ">Password</label>
        <input
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          className="w-[70%] py-2 outline-none bg-transparent border placeholder:text-white placeholder:px-3 px-3 text-white"
          type="password"
          placeholder="Enter Your Password"
        />
        {/* Err msg*/}
        <div className={RegsiterStyle.error}>
          {formik.touched.password && formik.errors.password}
        </div>

        <button type="submit" className="border py-2 px-2 rounded text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
