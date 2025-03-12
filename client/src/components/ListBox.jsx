import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BsCheck2, BsChevronExpand } from "react-icons/bs";

const options = ["Newest", "Oldest", "A-Z", "Z-A"];

const ListBox = ({ sort, setSort }) => {
  return (
    <div className='w-[8rem] md:w-[10rem]'>
      <Listbox value={sort} onChange={setSort}>
        <div className='relative mt-1'>
          <Listbox.Button
            className={
              "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            }
          >
            <span className='block truncate'>{sort}</span>

            <span className='right-0 absolute inset-y-0 flex items-center pr-2 pointer-events-none'>
              <BsChevronExpand
                className='w-5 h-5 text-gray-500'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute bg-white ring-opacity-5 shadow-lg mt-1 py-1 rounded-md focus:outline-none ring-1 ring-black w-full max-h-60 overflow-auto sm:text-sm text-base'>
              {options.map((op, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-[#1d4fd830] text-[#1d4ed8]" : "text-gray-900"
                    }`
                  }
                  value={op}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {op}
                      </span>
                      {selected ? (
                        <span className='left-0 absolute inset-y-0 flex items-center pl-3 text-[#1d4ed8]'>
                          <BsCheck2 className='w-5 h-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ListBox;
