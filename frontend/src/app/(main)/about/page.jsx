import React from 'react'

const about = () => {
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

                Writing emails can be time-consuming, repetitive, and challenging, especially when dealing with different tones, formats, and industry-specific requirements. Many professionals struggle with structuring emails, maintaining a formal tone, and ensuring clarity. <br />
                <b className='text-2xl font-bold text-blue-700'> Easemail.ai </b> is a one-stop solution designed to generate well-structured email templates, with seamless Gmail integration, users can send emails directly from the platform and automate follow-up replies, reducing manual effort and increasing response rates. <br />
                By leveraging <b className='font-bold'>Natural Language Processing (NLP) </b> and <b className='font-bold'>AI-driven customization</b>, <b className='font-bold'>Easemail.ai</b> ensures that every email maintains a consistent tone, aligns with industry-specific requirements, and accurately reflects the sender's intent. Whether for job applications, client outreach, or business correspondence, Easemail.ai optimizes email writing, saving time and improving engagement. <br />
                With features like <b className='font-bold'>grammar correction, tone adjustments, and email tracking</b>, the platform provides a complete email management solution, helping users communicate more efficiently and professionally.
                This AI-powered tool will optimize email communication, ensuring efficiency and consistency.

                <br />
                <br />



              </p>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default about;