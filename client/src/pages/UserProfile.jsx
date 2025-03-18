import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { CustomButton, Loading, TextInput } from "../components";
import { NoProfile } from "../assets";
import { apiRequest } from "../utils";
import { MdTroubleshoot } from "react-icons/md";

const UserForm = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [uploadCv, setUploadCv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data) => {
    setIsSubmitting(MdTroubleshoot);
    try {
      const uri = profileImage && (await handleFileUpload(profileImage));

      const newData = uri ? { ...data, profileUrl: uri } : data;

      const res = await apiRequest({
        url: "/users/update-user",
        token: user?.token,
        data: newData,
        method: "PUT",
      });
 
      if (res) {
        const newData = { token: res?.token, ...res?.user};
        dispatch(Login(newData));
        localStorage.setItem("userInfo", JSON.stringify(res));
        window.location.reload();
      }
      setIsSubmitting(false);
    } catch (error) {
     
      setIsSubmitting(false);
      console.log(error);
    } 
  };

  const closeModal = () => setOpen(false);

  return (
    <>
      <Transition appear show={open ?? false} as={Fragment}
      >
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
                    className="font-semibold text-gray-900 text-lg leading-6"
                  >
                    Edit Profile
                  </Dialog.Title>
                  <form
                    className="flex flex-col gap-5 mt-2 w-full"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                  
                    <div className="flex gap-2 w-full">
                      <div className="w-1/2">
                        <TextInput
                          name="firstName"
                          label="First Name"
                          placeholder="James"
                          type="text"
                          register={register("firstName", {
                            required: "First Name is required",
                          })}
                          error={
                            errors.firstName ? errors.firstName?.message : ""
                          }
                        />
                      </div>
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
                    </div>

                    <div className="flex gap-2 w-full">
                      <div className="w-1/2">
                        <TextInput
                          name="contact"
                          label="Contact"
                          placeholder="Phone Number"
                          type="text"
                          register={register("contact", {
                            required: "Coontact is required!",
                          })}
                          error={errors.contact ? errors.contact?.message : ""}
                        />
                      </div>

                      <div className="w-1/2">
                        <TextInput
                          name="location"
                          label="Location"
                          placeholder="Location"
                          type="text"
                          register={register("location", {
                            required: "Location is required",
                          })}
                          error={
                            errors.location ? errors.location?.message : ""
                          }
                        />
                      </div>
                    </div>

                    <TextInput
                      name="jobTitle"
                      label="Job Title"
                      placeholder="Software Engineer"
                      type="text"
                      register={register("jobTitle", {
                        required: "Job Title is required",
                      })}
                      error={errors.jobTitle ? errors.jobTitle?.message : ""}
                    />
                    <div className="flex gap-2 w-full text-sm">
                      <div className="w-1/2">
                        <label className="mb-1 text-gray-600 text-sm">
                          Profile Picture
                        </label>
                        <input
                          type="file"
                          onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                      </div>

                      <div className="w-1/2">
                        <label className="mb-1 text-gray-600 text-sm">
                          Resume
                        </label>
                        <input
                          type="file"
                          onChange={(e) => setUploadCv(e.target.files[0])}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="mb-1 text-gray-600 text-sm">
                        About
                      </label>
                      <textarea
                        className="px-4 py-2 border border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base resize-none ounded"
                        rows={4}
                        cols={6}
                        {...register("about", {
                          required:
                            "Write a little bit about yourself and your projects",
                        })}
                        aria-invalid={errors.about ? "true" : "false"}
                      ></textarea>
                      {errors.about && (
                        <span
                          role="alert"
                          className="mt-0.5 text-red-500 text-xs"
                        >
                          {errors.about?.message}
                        </span>
                      )}
                    </div>

                    <div className="mt-4">
                      
                      { isSubmitting ? ( <Loading/> 
                      ) : (
                        <CustomButton
                        type="submit"
                        containerStyles="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
                        title={"Submit"}
                      />
                    )}
                    
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const userInfo = user;

  return (
    <div className="flex justify-center items-center mx-auto py-10 container">
      <div className="bg-white shadow-lg p-10 pb-20 rounded-lg w-full md:w-2/3 2xl:w-2/4">
        <div className="flex flex-col justify-center items-center mb-4">
          <h1 className="font-semibold text-slate-600 text-4xl">
            {userInfo?.firstName + " " + userInfo?.lastName}
          </h1>

          <h5 className="font-bold text-blue-700 text-base">
            {userInfo?.jobTitle || "Add Job Title"}
          </h5>

          <div className="flex lg:flex-row flex-wrap justify-between mt-8 w-full text-sm">
            <p className="flex justify-center items-center gap-1 px-3 py-1 rounded-full text-slate-600">
              <HiLocationMarker /> {userInfo?.location ?? "No Location"}
            </p>
            <p className="flex justify-center items-center gap-1 px-3 py-1 rounded-full text-slate-600">
              <AiOutlineMail /> {userInfo?.email ?? "No Email"}
            </p>
            <p className="flex justify-center items-center gap-1 px-3 py-1 rounded-full text-slate-600">
              <FiPhoneCall /> {userInfo?.contact ?? "No Contact"}
            </p>
          </div>
        </div>

        <hr />

        <div className="py-10 w-full">
          <div className="flex md:flex-row flex-col-reverse gap-8 py-6 w-full">
            <div className="flex flex-col gap-4 mt-20 md:mt-0 w-full md:w-2/3 text-slate-600 text-lg">
              <p className="font-semibold text-[#0536e7] text-2xl">ABOUT</p>
              <span className="text-base text-justify leading-7">
                {userInfo?.about ?? "No About Found"}
              </span>
            </div>

            <div className="w-full md:w-1/3 h-44">
              <img
                src={userInfo?.profileUrl || NoProfile}
                alt={userInfo?.firstName}
                className="rounded-lg w-full h-48 object-contain"
              />
              <button
                className="bg-blue-600 mt-4 py-2 rounded w-full md:w-64 text-white"
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserForm open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserProfile;
