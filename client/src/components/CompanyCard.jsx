import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ cmp }) => {
  return (
    <div className='flex justify-between items-center gap-4 bg-white shadow-md rounded w-full h-16'>
      <div className='flex items-center gap-4 w-3/4 md:w-2/4'>
        <Link to={`/company-profile/${cmp?._id}`}>
          <img
            src={cmp?.profileUrl}
            alt={cmp?.name}
            className='rounded w-8 md:w-12 h-8 md:h-12'
          />
        </Link>
        <div className='flex flex-col h-full'>
          <Link
            to={`/company-profile/${cmp?._id}`}
            className='font-semibold text-gray-600 text-base md:text-lg truncate'
          >
            {cmp?.name}
          </Link>
          <span className='text-blue-600 text-sm'>{cmp?.email}</span>
        </div>
      </div>

      <div className='hidden md:flex items-center w-1/4 h-full'>
        <p className='text-base text-start'>{cmp?.location}</p>
      </div>

      <div className='flex flex-col items-center w-1/4 h-full'>
        <p className='font-semibold text-blue-600'>{cmp?.jobPosts?.length}</p>
        <span className='font-normal text-gray-600 text-xs md:base'>
          Jobs Posted
        </span>
      </div>
    </div>
  );
};

export default CompanyCard;
