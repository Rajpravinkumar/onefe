import { useEffect, useState } from "react";
import { Linkedin } from "../assets";
import moment from "moment";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { jobs } from "../utils/data";
import { CustomButton, JobCard, Loading } from "../components";
import { useSelector } from "react-redux";
import { apiRequest } from "../utils";

const JobDetail = () => {
  const {id} = useParams();

  const { user } = useSelector((state) => state.user);
 
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);

  const [selected, setSelected] = useState("0");
  const [isFetching, setIsFetching] = useState(false);

  const getJobDetails = async () => {

    setIsFetching(true);

    try{
      const res = await apiRequest({
        url: "/jobs/get-job-detail" + id,
        method: "GET",
      });

      setJob(res?.data);
      setSimilarJobs(res?.similarJobs);
      setIsFetching(false);

    }catch (error) {
      setIsFetching(false);
      console.log(error)
    }
  };

  const handleDeletePost = async () => {
    setIsFetching(true);
    try {
    if (window.confirm("Delete Job Post?")) {
          const res = await apiRequest( {
           url: "/jobs/delete-job" + job?._id,
           token: user?.token,
              method: "DELETE",
    });
          if (res?.success) {
            alert(res?.message);
            window.location.replace("/");
          }
    }
    setIsFetching(false);
    

    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  }

 

  useEffect(() => {
    id && getJobDetails();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  return (
    <div className='mx-auto container'>
      <div className='flex md:flex-row flex-col gap-10 w-full'>
        {/* LEFT SIDE */}
        {
          isFetching? (
            <Loading/>
          ) : (
        
        <div className='bg-white shadow-md px-5 md:px-10 py-10 w-full md:w-2/3 h-fit 2xl:2/4'>
          <div className='flex justify-between items-center w-full'>
            <div className='flex gap-2 w-3/4'>
              <img
                src={job?.company?.profileUrl}
                alt={job?.company?.name}
                className='rounded w-20 md:w-24 h-20 md:h-20'
              />

              <div className='flex flex-col'>
                <p className='font-semibold text-gray-600 text-xl'>
                  {job?.jobTitle}
                </p>

                <span className='text-base'>{job?.location}</span>

                <span className='text-blue-600 text-base'>
                  {job?.company?.name}
                </span>

                <span className='text-gray-500 text-sm'>
                  {moment(job?.createdAt).fromNow()}
                </span>
              </div>
            </div>

            <div className=''>
              <AiOutlineSafetyCertificate className='text-blue-500 text-3xl' />
            </div>
          </div>

          <div className='flex md:flex-row flex-wrap justify-between items-center gap-2 my-10 w-full'>
            <div className='flex flex-col justify-center items-center bg-[#bdf4c8] rounded-lg w-40 h-16'>
              <span className='text-sm'>Salary</span>
              <p className='font-semibold text-gray-700 text-lg'>
                $ {job?.salary}
              </p>
            </div>

            <div className='flex flex-col justify-center items-center bg-[#bae5f4] rounded-lg w-40 h-16'>
              <span className='text-sm'>Job Type</span>
              <p className='font-semibold text-gray-700 text-lg'>
                {job?.jobType}
              </p>
            </div>

            <div className='flex flex-col justify-center items-center bg-[#fed0ab] px-6 rounded-lg w-40 h-16'>
              <span className='text-sm'>No. of Applicants</span>
              <p className='font-semibold text-gray-700 text-lg'>
                {job?.application?.length}
              </p>
            </div>

            <div className='flex flex-col justify-center items-center bg-[#cecdff] px-6 rounded-lg w-40 h-16'>
              <span className='text-sm'>No. of Vacancies</span>
              <p className='font-semibold text-gray-700 text-lg'>
                {job?.vacancies}
              </p>
            </div>
          <div className="flex flex-col justify-center bg-[#ffcddf] px-6 w-40 h-16 rouned-lg">
            <span className="text-sm">Yr.  of Experience</span>
            <p className="font-semibold text-gray-700 text-lg">{job?.experience} </p>
            </div>
             
          </div>

          <div className='flex gap-4 py-5 w-full'>
            <CustomButton
              onClick={() => setSelected("0")}
              title='Job Description'
              containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${
                selected === "0"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
            />

            <CustomButton
              onClick={() => setSelected("1")}
              title='Company'
              containerStyles={`w-full flex items-center justify-center  py-3 px-5 outline-none rounded-full text-sm ${
                selected === "1"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
            />
          </div>

          <div className='my-6'>
            {selected === "0" ? (
              <>
                <p className='font-semibold text-xl'>Job Decsription</p>

                <span className='text-base'>{job?.detail[0]?.desc}</span>

                {job?.detail[0]?.requirement && (
                  <>
                    <p className='mt-8 font-semibold text-xl'>Requirement</p>
                    <span className='text-base'>
                      {job?.detail[0]?.requirements}
                    </span>
                  </>
                )}
              </>
            ) : (
              <>
                <div className='flex flex-col mb-6'>
                  <p className='font-semibold text-blue-600 text-xl'>
                    {job?.company?.name}
                  </p>
                  <span className='text-base'>{job?.company?.location}</span>
                  <span className='text-sm'>{job?.company?.email}</span>
                </div>

                <p className='font-semibold text-xl'>About Company</p>
                <span>{job?.company?.about}</span>
              </>
            )}
          </div>

          <div className='w-full'>
           {user?._id === job?.company?._id  ?
           (
           <CustomButton
              title='Delete Post'
              onClick={handleDeletePost}
              containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
            />
           ) : ( 
            <CustomButton
              title='Apply Now'
              containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
            />
          ) }
          </div>
        </div>
          )
        }

        {/* RIGHT SIDE */}
        <div className='mt-20 md:mt-0 p-5 w-full md:w-1/3 2xl:w-2/4'>
          <p className='font-semibold text-gray-500'>Similar Job Post</p>

          <div className='flex flex-wrap gap-4 w-full'>
            {similarJobs?.slice(0, 6).map((job, index) => {
              const data = {
                name: job?.company.name,
                logo: job?.company.profileUrl,
                ...job,
              };
             return <JobCard job={data} key={index} />;
      })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;

