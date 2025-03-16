import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <Link to={`/job-detail/${job?._id}`}>
      <div
        className='flex flex-col justify-between bg-white shadow-lg px-3 py-5 rounded-md w-full md:w-[16rem] 2xl:w-[18rem] h-[16rem] md:h-[18rem]'
      >
  <div className="flex flex-col justify-between w-full h-full">
  <div className='flex gap-3'>
          <img
            src={job?.logo}
            alt={job?.name}
            className='w-14 h-14'
          />

          <div className='flex flex-col justify-center w-full h-16-col'>
            <p className='flex iteme-center w-full h-12 overflow-hidden font-semibold text-lg truncate leading-5'>{job?.jobTitle}</p>
            <span className='flex items-center gap-2'>
              <GoLocation className='text-slate-900 text-sm' />
              {job?.location}
            </span>
          </div>
        </div>

        <div className='py-3'>
          <p className='text-sm'>
            {job?.detail[0]?.desc?.slice(0, 150) + "..."}
          </p>
        </div>

        <div className='flex justify-between items-center'>
          <p className='bg-[#1d4fd826] px-1.5 py-0.5 rounded font-semibold text-[#1d4fd8] text-sm'>
            {job?.jobType}
          </p>
          <span className='text-gray-500 text-sm'>
            {moment(job?.createdAt).fromNow()}
          </span>
        </div>
  </div>
      </div>
    </Link>
  );
};

export default JobCard;
