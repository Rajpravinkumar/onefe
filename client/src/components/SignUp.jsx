import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { apiRequest } from "../utils";
import { Login } from "../redux/userSlice";

const SignUp = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isRegister, setIsRegister] = useState(true);
  const [accountType, setAccountType] = useState("seeker");

  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  let from = location.state?.from?.pathname || "/";

  const closeModal = () => setOpen(false);

  const onSubmit = async (data) => {
    let URL = null;
    if (isRegister) {
      if (accountType === "seeker") {
        URL = "auth/register";
      } else URL = "companies/register";
    } else {
      if (accountType === "seeker") {
        URL = "auth/login";
      } else {
        URL = "companies/login";
      }
    }
    try {
      const res = await apiRequest({
        url: URL,
        data: data,
        method: "POST",
      });
    


       if (res?.status === "failed") {
        setErrMsg(res?.message);
      } else {
        setErrMsg("");
        const data = { token: res?.token, ...res?.user };
        dispatch(Login(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
        window.location.replace(from);
      } 
      console.log (data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Transition appear show={open || false}>
        <Dialog as="div" className="z-10 relative" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex justify-center items-center p-4 min-h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-md overflow-hidden text-left align-middle transition-all transform">
                  <Dialog.Title
                    as="h3"
                    className="font-semibold text-gray-900 text-xl lwading-6"
                  >
                    {isRegister ? "Create Account" : "Account Sign In"}
                  </Dialog.Title>

                  <div className="flex justify-center items-center py-4 w-full">
                    <button
                      className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
                        accountType === "seeker"
                          ? "bg-[#1d4fd862] text-blue-900 font-semibold"
                          : "bg-white border border-blue-400"
                      }`}
                      onClick={() => setAccountType("seeker")}
                    >
                      User Account
                    </button>
                    <button
                      className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
                        accountType !== "seeker"
                          ? "bg-[#1d4fd862] text-blue-900 font-semibold"
                          : "bg-white border border-blue-400"
                      }`}
                      onClick={() => setAccountType("company")}
                    >
                      Company Account
                    </button>
                  </div>

                  <form
                    className="flex flex-col gap-5 w-full"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <TextInput
                      name="email"
                      label="Email Address"
                      placeholder="email@example.com"
                      type="email"
                      register={register("email", {
                        required: "Email Address is required!",
                      })}
                      error={errors.email ? errors.email.message : ""}
                    />

                    {isRegister && (
                      <div className="flex gap-1 md:gap-2 w-full">
                        <div
                          className={`${
                            accountType === "seeker" ? "w-1/2" : "w-full"
                          }`}
                        >
                          <TextInput
                            name={
                              accountType === "seeker" ? "firstName" : "name"
                            }
                            label={
                              accountType === "seeker"
                                ? "First Name"
                                : "Company Name"
                            }
                            placeholder={
                              accountType === "seeker"
                                ? "eg. James"
                                : "Comapy name"
                            }
                            type="text"
                            register={register(
                              accountType === "seeker" ? "firstName" : "name",
                              {
                                required:
                                  accountType === "seeker"
                                    ? "First Name is required"
                                    : "Company Name is required",
                              }
                            )}
                            error={
                              accountType === "seeker"
                                ? errors.firstName
                                  ? errors.firstName?.message
                                  : ""
                                : errors.name
                                ? errors.name?.message
                                : ""
                            }
                          />
                        </div>

                        {accountType === "seeker" && isRegister && (
                          <div className="w-1/2">
                            <TextInput
                              name="lastName"
                              label="Last Name"
                              placeholder="Wagonner"
                              type="text"
                              register={register("lastName", {
                                required: "Last Name is required",
                              })}
                              error={
                                errors.lastName ? errors.lastName?.message : ""
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-1 md:gap-2 w-full">
                      <div className={`${isRegister ? "w-1/2" : "w-full"}`}>
                        <TextInput
                          name="password"
                          label="Password"
                          placeholder="Password"
                          type="password"
                          register={register("password", {
                            required: "Password is required!",
                          })}
                          error={
                            errors.password ? errors.password?.message : ""
                          }
                        />
                      </div>

                      {isRegister && (
                        <div className="w-1/2">
                          <TextInput
                            label="Confirm Password"
                            placeholder="Password"
                            type="password"
                            register={register("cPassword", {
                              validate: (value) => {
                                const { password } = getValues();

                                if (password != value) {
                                  return "Passwords do no match";
                                }
                              },
                            })}
                            error={
                              errors.cPassword &&
                              errors.cPassword.type === "validate"
                                ? errors.cPassword?.message
                                : ""
                            }
                          />
                        </div>
                      )}
                    </div>

                    {errMsg && (
                      <span
                        role="alert"
                        className="mt-0.5 text-red-500 text-sm"
                      >
                        {errMsg}
                      </span>
                    )}

                    <div className="mt-2">
                      <CustomButton
                        type="submit"
                        containerStyles={`inline-flex justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white outline-none hover:bg-blue-800`}
                        title={isRegister ? "Create Account" : "Login Account"}
                      />
                    </div>
                  </form>

                  <div className="mt-4">
                    <p className="text-gray-700 text-sm">
                      {isRegister
                        ? "Already has an account?"
                        : "Do not have an account"}

                      <span
                        className="ml-2 hover:font-semibold text-blue-600 hover:text-blue-700 text-sm cursor-pointer"
                        onClick={() => setIsRegister((prev) => !prev)}
                      >
                        {isRegister ? "Login" : "Create Account"}
                      </span>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SignUp;
