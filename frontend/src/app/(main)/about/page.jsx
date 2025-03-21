import React from 'react'

const About = () => {
  return (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="flex items-center justify-center md:justify-start ">
              <div className="h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto mx-auto ">
                <img
                  src="https://img.freepik.com/free-vector/mail-sent-concept-illustration_114360-96.jpg?t=st=1742127223~exp=1742130823~hmac=8f9e323ccc58947a76f775c274b352d461d5e9e7f91eaf12e84858e161ba8b53&w=826"
                  loading="lazy"
                  alt="Photo"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="md:pt-8">
              <p className="text-center font-bold text-black md:text-left text-5xl">

                About Us

              </p>
              <p className="mb-6 text-gray-800 sm:text-lg md:mb-8"> <br />

                Writing emails can be time-consuming, repetitive, and challenging, especially when dealing with different tones, formats, and industry-specific requirements. Many professionals struggle with structuring emails, maintaining a formal tone, and ensuring clarity. <i> <br />
                <b className='text-2xl font-bold text-blue-700'> Easemail.ai </b> </i> is a one-stop solution designed to generate well-structured email templates, with seamless Gmail integration, users can send emails directly from the platform and automate follow-up replies, reducing manual effort and increasing response rates. <br />
                <br />


                <p className="text-center font-bold text-black md:text-left text-5xl">
                  Team
                </p>
                <p className="mb-6 text-gray-800 sm:text-lg md:mb-8"> <br />

                Our team at <i> <b className='text-2xl font-bold text-blue-700'> Easemail.ai </b> 
                </i> is a group of passionate professionals dedicated to making the lives of both professionals and individuals easier. We are a team of developers, designers, and marketers working together to make the world a better place.<br />
                </p>
                <br />
              </p>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About;