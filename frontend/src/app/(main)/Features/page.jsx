import { IconBoltFilled, IconSend } from "@tabler/icons-react"

export default () => {


    const features = [


        {
            icon: <IconBoltFilled />,
            title: "Generate Custom Template",
            desc: "Generate Custom template and personalize according to yourself."
        },
        {
            icon:
                <IconSend />,
            title: "Integration",
            desc: "Send mail direclty with Gmail integration."
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </svg>,
            title: "Dashboard & Smart Reply",
            desc: "Manage all your email with smart reply feature to reply faster."
        },
    ]

    return (
        <section className="relative py-28 bg-gray-900" id="features">
            <div className="md:mb-24 "><h2 className=" mb-4 text-center text-8xl font-bold text-white md:mb-6 lg:text-6xl ">Features Section</h2> </div>
            <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-gray-300 justify-between gap-24 lg:flex md:px-8">
                <div className="max-w-xl">
                    <h3 className="text-white text-5xl font-semibold sm:text-4xl">
                        Do more with less complexity
                    </h3>
                    <p className="mt-3">

                    </p>
                </div>
                <div className="mt-12 lg:mt-0 ">
                    <ul className="grid gap-8 sm:grid-cols-2">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="flex gap-x-4">
                                    <div className="flex-none w-12 h-12 bg-gray-700 text-cyan-400 rounded-lg flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg text-gray-100 font-semibold">
                                            {item.title}
                                        </h4>
                                        <p className="mt-3">
                                            {item.desc}
                                        </p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="absolute inset-0 max-w-md mx-auto h-72 blur-[118px]" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}></div>
        </section>
    )
}