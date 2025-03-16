// import React from 'react'

// const Home = () => {
//   return (
//     <div> 
//       <h1 class='font-bold text-center text-5xl'>Home Page </h1>
//       <br />

//         <h3 class='text-center'> Work Under Progress !!</h3>
//     </div>
//   )
// }

// export default Home;
import React from 'react'
import Navbar from './(main)/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <>
  {/* Hero */}
  <div className="bg-linear-to-b from-violet-600/10 via-transparent">
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      {/* Announcement Banner */}
      <div className="flex justify-center">
        <a
          className="group inline-flex items-center bg-white/10 hover:bg-white/10 border border-white/10 p-1 ps-4 rounded-full shadow-md focus:outline-hidden focus:bg-white/10"
          href="../figma.html"
        >
          <p className="me-2 text-black">Give it a Try !!</p>
          <span className="group-hover:bg-white/10 py-1.5 px-2.5 flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-white text-sm">
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </a>
      </div>
      {/* End Announcement Banner */}
      {/* Title */}
      <div className="max-w-3xl text-center mx-auto">
        <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl hover:text-wrap hover:text-blue-500 cursor-pointer ">
          Now it's easier than ever to write email
        </h1>
      </div>
      {/* End Title */}
      <div className="max-w-3xl text-center mx-auto">
        <p className="text-lg text-white/70">
          Preline is a large open-source project, crafted with Tailwind CSS
          framework by Hmlstream.
        </p>
      </div>
      {/* Buttons */}
      <div className="text-center">
        <a
          className="inline-flex justify-center items-center gap-x-3 text-center bg-linear-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-hidden focus:shadow-blue-700/50 py-3 px-6 cursor-pointer"
          href="#"
        >
          Get started
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </a>
      </div>
      {/* End Buttons */}
    </div>
  </div>
  {/* End Hero */}
</>

    </div>
  )
}

export default Home;
