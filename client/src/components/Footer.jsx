import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { footerLinks } from "../utils/data";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";

const Footer = () => {
  return (
    <footer className='text-white mp-20'>
      <div className='-mb-0.5 overflow-x-hidden'>
        <svg
          preserveAspectRatio='none'
          viewBox='0 0 1200 120'
          xmlns='http://www.w3.org/2000/svg'
          style={{
            fill: "#1d4ed8",
            width: "125%",
            height: 112,
            transform: "rotate(180deg)",
          }}
        >
          <path d='M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z' />
        </svg>
      </div>

      <div className='bg-[#1d4ed8]'>
        <div className='mx-auto px-5 py-20 container'>
          <div className='flex flex-wrap justify-between gap-10 -mb-10 -px-4 w-full'>
            {footerLinks.map(({ id, title, links }) => (
              <div className='px-4 w-auto' key={id + title}>
                <h2 className='mb-3 font-medium text-white text-sm tracking-widest'>
                  {title}
                </h2>

                <div className='flex flex-col gap-3 mb-10'>
                  {links.map((link, index) => (
                    <Link
                      key={link + index}
                      to='/'
                      className='text-gray-300 hover:text-white text-sm'
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className=''>
          <p className='mx-auto mt-2 px-5 text-white container'>
            Subscribe to our Newsletter
          </p>

          <div className='flex flex-wrap justify-between items-center mx-auto px-5 pt-6 pb-8 container'>
            <div className='flex justify-center md:justify-start items-center w-full md:w-2/4 lg:w-1/3 h-16'>
              <TextInput
                styles='w-full flex-grow md:w-40 2xl:w-64 bg-gray-100 sm:mr-4 md-2'
                type='email'
                placeholder='Email Address'
              />

              <CustomButton
                title='Subscribe'
                containerStyles={
                  "block bg-[#001a36] text-white px-5 py-2.5 text-md rounded hover:bg-blue-800 focus:potline-none flex-col items-center mt-2"
                }
              />
            </div>

            <span className='inline-flex justify-center md:justify-start mt-6 lg:mt-0 lg:ml-auto w-full md:w-auto'>
              <a className='text-white text-xl hover:scale-125 duration-300 ease-in-out'>
                <FaFacebookF />
              </a>
              <a className='ml-3 text-white text-xl hover:scale-125 duration-300 ease-in-out'>
                <FaTwitter />
              </a>
              <a className='ml-3 text-white text-xl hover:scale-125 duration-300 ease-in-out'>
                <FiInstagram />
              </a>

              <a className='ml-3 text-white text-xl hover:scale-125 duration-300 ease-in-out'>
                <FaLinkedinIn />
              </a>
            </span>
          </div>
        </div>

        <div className='bg-[#001a36]'>
          <div className='flex sm:flex-row flex-col flex-wrap mx-auto px-5 py-4 container'>
            <p className='text-gray-300 text-sm sm:text-left text-center'>
              &copy; 2023 Job Finder —
              <a
                href=' '
                className='ml-1 text-[#1199e7]'
                target='_blank'
                rel='noopener noreferrer'
              >
                @xyz
              </a>
            </p>

            <span className='mt-2 sm:mt-0 sm:ml-auto w-full sm:w-auto text-gray-300 text-sm sm:text-left text-center'>
              Designed by xyz
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
