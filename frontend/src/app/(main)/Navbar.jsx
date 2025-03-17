import React from 'react'

const Navbar = () => {
  return (
    <div>
      <>
        {/* ========== HEADER ========== */}
        <header className="flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full py-7 ">
          <nav className="relative max-w-7xl w-full flex flex-wrap lg:grid lg:grid-cols-12 basis-full items-center px-4 md:px-6 lg:px-8 mx-auto">
            <div className="lg:col-span-3 flex items-center">


              <div className="font-bold  text-5xl "> EaseMail.ai</div>
            </div>
            {/* Button Group */}
            <div className="flex items-center gap-x-1 lg:gap-x-2 ms-auto py-1 lg:ps-6 lg:order-3 lg:col-span-3">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              >
                Sign in
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl border border-transparent bg-black text-white hover:bg-black focus:outline-hidden focus:bg-black transition disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                Get Started
              </button>
              <div className="lg:hidden">
                <button
                  type="button"
                  className="hs-collapse-toggle size-9.5 flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                  id="hs-navbar-hcail-collapse"
                  aria-expanded="false"
                  aria-controls="hs-navbar-hcail"
                  aria-label="Toggle navigation"
                  data-hs-collapse="#hs-navbar-hcail"
                >
                  <svg
                    className="hs-collapse-open:hidden shrink-0 size-4"
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
                    <line x1={3} x2={21} y1={6} y2={6} />
                    <line x1={3} x2={21} y1={12} y2={12} />
                    <line x1={3} x2={21} y1={18} y2={18} />
                  </svg>
                  <svg
                    className="hs-collapse-open:block hidden shrink-0 size-4"
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
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {/* End Button Group */}
            {/* Collapse */}
            <div
              id="hs-navbar-hcail"
              className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow lg:block lg:w-auto lg:basis-auto lg:order-2 lg:col-span-6"
              aria-labelledby="hs-navbar-hcail-collapse"
            >
              <div className="flex flex-col gap-y-4 gap-x-0 mt-5 lg:flex-row lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 lg:mt-0">
                <div>
                  <a
                    className="relative inline-block text-black focus:outline-hidden before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg"
                    href="#"
                    aria-current="page"
                  >
                    Home
                  </a>
                </div>
                <div>
                  <a
                    className="inline-block text-black hover:text-gray-600 focus:outline-hidden focus:text-gray-600"
                    href="#"
                  >
                    Services
                  </a>
                </div>
                <div>
                  <a
                    className="inline-block text-black hover:text-gray-600 focus:outline-hidden focus:text-gray-600"
                    href="#"
                  >
                    About
                  </a>
                </div>
                <div>
                  <a
                    className="inline-block text-black hover:text-gray-600 focus:outline-hidden focus:text-gray-600"
                    href="#"
                  >
                    Careers
                  </a>
                </div>
                <div>
                  <a
                    className="inline-block text-black hover:text-gray-600 focus:outline-hidden focus:text-gray-600"
                    href="#"
                  >
                    Pricing
                  </a>
                </div>
              </div>
            </div>
            {/* End Collapse */}
          </nav>
        </header>
        {/* ========== END HEADER ========== */}
      </>

    </div>
  )
}

export default Navbar;