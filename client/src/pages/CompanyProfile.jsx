import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall, FiEdit3, FiUpload } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

import { CustomButton, JobCard, Loading, TextInput } from "../components";
import { apiRequest, handleFileUpload } from "../utils";
import { Login } from "../redux/userSlice";

const CompnayForm = ({ open, setOpen }) => {
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
  const [isLoading , setIsLoading] = useState( false);
  const [errMsg , setErrMsg] = useState({status: false, message: ""});
 
  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrMsg(null);
    const uri = profileImage && (await handleFileUpload(profileImage));

    const newData = uri ? {...data, profileUrl: uri } : data;

    try {
      const res = await apiRequest ({
        url: "companies/update-company",
        token: user?.token,
        data: newData,
        method: "PUT",
      });
      setIsLoading(false);

       if(res.status === "failed") {
        setErrMsg({ ...res });
      }else {
        setErrMsg({ status: "success", message: res.message});
        const newData = { token: res?.token, ...res?.user};
        dispatch(Login(newData));
        localStorage.setItem("userInfo", JSON.stringify(data));

        setTimeout( () => { 
        window.location.reload();
      }, 1500);
   } 
    } catch  (error) {
      console.log(error);
      setIsLoading(false);
    }
};

  const closeModal = () => setOpen(false);

  return (
    <>
      <Transition appear show={open ?? false} as={Fragment}>
        <Dialog as='div' className='z-50 relative' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex justify-center items-center p-4 min-h-full text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='bg-white shadow-xl p-6 rounded-2xl w-full max-w-md overflow-hidden text-left align-middle transition-all transform'>
                  <Dialog.Title
                    as='h3'
                    className='font-semibold text-gray-900 text-lg leading-6'
                  >
                    Edit Company Profile
                  </Dialog.Title>

                  <form
                    className='flex flex-col gap-5 mt-2 w-full'
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <TextInput
                      name='name'
                      label='Company Name'
                      type='text'
                      register={register("name", {
                        required: "Compnay Name is required",
                      })}
                      error={errors.name ? errors.name?.message : ""}
                    />

                    <TextInput
                      name='location'
                      label='Location/Address'
                      placeholder='eg. Califonia'
                      type='text'
                      register={register("location", {
                        required: "Address is required",
                      })}
                      error={errors.location ? errors.location?.message : ""}
                    />

                    <div className='flex gap-2 w-full'>
                      <div className='w-1/2'>
                        <TextInput
                          name='contact'
                          label='Contact'
                          placeholder='Phone Number'
                          type='text'
                          register={register("contact", {
                            required: "Contact is required!",
                          })}
                          error={errors.contact ? errors.contact?.message : ""}
                        />
                      </div>

                      <div className='mt-2 w-1/2'>
                        <label className='mb-1 text-gray-600 text-sm'>
                          Company Logo
                        </label>
                        <input
                          type='file'
                          onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                      </div>
                    </div>

                    <div className='flex flex-col'>
                      <label className='mb-1 text-gray-600 text-sm'>
                        About Company
                      </label>
                      <textarea
                        className='px-4 py-2 border border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base resize-none ounded'
                        rows={4}
                        cols={6}
                        {...register("about", {
                          required: "Write a little bit about your company.",
                        })}
                        aria-invalid={errors.about ? "true" : "false"}
                      ></textarea>
                      {errors.about && (
                        <span
                          role='alert'
                          className='mt-0.5 text-red-500 text-xs'
                        >
                          {errors.about?.message}
                        </span>
                      )}
                    </div>

                       <div className='mt-4'>
                      { 
                       isLoading ? (
                        <Loading/>
                       ): (
                        
                      
                      <CustomButton 
                      type='submit'
                      containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 txt-sm font-medium text-white hover:bg-[#14fd846] hover:text-[#1d4fd8] focus:outline-none'
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

const CompanyProfile = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const fetchCompany = async() => {
     setIsLoading(true);
     let id = null;

     if (params.id && params.id !== undefined) 
     {
      id = params?.id;

     }else {
      id = user?._id;
     }

     try {
      const res = await apiRequest({
        url: "/companies/get-company" +
         id,
         method: "GET",
     });

     setInfo(res?.data);
     setIsLoading(false);

     }catch (error) {
       console.log(error);
       setIsLoading(false);
     }
  };
 
  
  useEffect(() => {
     fetchCompany();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='mx-auto p-5 container'>
      <div className=''>
        <div className='flex md:flex-row flex-col justify-between gap-3 w-full'>
          <h2 className='font-semibold text-gray-600 text-xl'>
            Welcome, {info?.name}
          </h2>

          {user?.user?.accountType === undefined &&
            info?._id === user?._id && (
              <div className='flex items-center gap-4 py-5 md:py-0 justifu-center'>
                <CustomButton
                  onClick={() => setOpenForm(true)}
                  iconRight={<FiEdit3 />}
                  containerStyles={`py-1.5 px-3 md:px-5 focus:outline-none bg-blue-600  hover:bg-blue-700 text-white rounded text-sm md:text-base border border-blue-600`}
                />

                <Link to='/upload-job'>
                  <CustomButton
                    title='Upload Job'
                    iconRight={<FiUpload />}
                    containerStyles={`text-blue-600 py-1.5 px-3 md:px-5 focus:outline-none  rounded text-sm md:text-base border border-blue-600`}
                  />
                </Link>
              </div>
            )}
        </div>

        <div className='flex md:flex-row flex-col justify-start md:justify-between mt-4 md:mt-8 w-full text-sm'>
          <p className='flex items-center gap-1 px-3 py-1 rounded-full text-slate-600'>
            <HiLocationMarker /> {info?.location ?? "No Location"}
          </p>
          <p className='flex items-center gap-1 px-3 py-1 rounded-full text-slate-600'>
            <AiOutlineMail /> {info?.email ?? "No Email"}
          </p>
          <p className='flex items-center gap-1 px-3 py-1 rounded-full text-slate-600'>
            <FiPhoneCall /> {info?.contact ?? "No Contact"}
          </p>

          <div className='flex flex-col items-center mt-10 md:mt-0'>
            <span className='text-xl'>{info?.jobPosts?.length}</span>
            <p className='text-blue-600'>Job Post</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2 mt-20 w-full'>
        <p>Jobs Posted</p>

        <div className='flex flex-wrap gap-3'>
          {info?.jobPosts?.map((job, index) => {
            const data = {
              name: info?.name,
              email: info?.email,
              logo: info?.profileUrl,
              ...job,
            };
            return <JobCard job={data} key={index} />;
          })}
        </div>
      </div>

      <CompnayForm open={openForm} setOpen={setOpenForm} />
    </div>
  );
};

export default CompanyProfile;
