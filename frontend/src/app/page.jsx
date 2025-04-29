import React from 'react'
import Navbar from './(main)/Navbar';
import Footer from './(main)/footer/page';
import Pricing from './(main)/Pricing/page';
import Features from './(main)/Features/page';


const Home = () => {
  return (
    <div className=''>
      <Navbar />

      <div className='bg-gray-900'>
        {/* <ScrollVelocity/> */}


        {/* Hero */}
        <div className="bg-linear-to-b from-violet-900/10 via-transparent">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
            {/* Announcement Banner */}
            <div className="flex justify-center">
            </div>

            {/* End Announcement Banner */}
            {/* Title */}
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl hover:text-wrap hover:text-white cursor-pointer hover:shadow-blue-700/50">
                Now it's easier than ever to write email
              </h1>
            </div>
            {/* End Title */}
            <div className="max-w-3xl text-center mx-auto">
              <p className="text-lg text-white/70">
                EaseMail is an AI-powered email writing assistant that helps you write better emails faster.
              </p>
            </div>
            {/* Buttons */}
            <div className="text-center">
              <a
                className="inline-flex justify-center items-center gap-x-3 text-center bg-linear-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-hidden focus:shadow-blue-700/50 py-3 px-6 cursor-pointer"
                href="/"
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
        <Features />

        {/* End Hero */}

      </div>


      <Pricing />
      <Footer />
    </div>
  )
}

export default Home;