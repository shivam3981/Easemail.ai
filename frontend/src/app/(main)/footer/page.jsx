import { IconBrandFacebook, IconBrandGithub, IconBrandTwitter, IconCopyright } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'

const Footer = () => {
    return (
        <div className="flex flex-col bg-[#18181b]">
            <footer className="w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto text-gray-200 border-t border-gray-800">
                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
                    <div>
                        <a
                            className="flex-none text-4xl font-semibold text-white focus:outline-hidden"
                            href="#"
                            aria-label="Brand"
                        >
                            EaseMail.ai
                        </a>
                        <div className="flex items-center gap-2 mt-2 text-gray-400">
                            <span><IconCopyright /></span>
                            2025 All right reserved 
                        </div>
                    </div> 
                    {/* End Col */}
                    <ul className="text-center">
                        <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-600">
                            <Link
                                className="inline-flex gap-x-2 text-sm text-gray-400 hover:text-white focus:outline-hidden focus:text-white"
                                href="/about"
                            >
                                About
                            </Link>
                        </li>
                        <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-600">
                            <Link
                                className="inline-flex gap-x-2 text-sm text-gray-400 hover:text-white focus:outline-hidden focus:text-white"
                                href="#features"
                            >
                                Features
                            </Link>
                        </li>
                        <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-600">
                            <Link
                                className="inline-flex gap-x-2 text-sm text-gray-400 hover:text-white focus:outline-hidden focus:text-white"
                                href="/contact"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                    {/* End Col */}
                    {/* Social Brands */}
                    <div className="md:text-end space-x-2">
                        <a
                            className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-hidden focus:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none"
                            href="#"
                        >
                            <IconBrandFacebook />
                        </a>
                        <a
                            className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-hidden focus:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none"
                            href="#"
                        >
                            <IconBrandTwitter />
                        </a>
                        <a
                            className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-hidden focus:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none"
                            href="#"
                        >
                            <IconBrandGithub />
                        </a>
                    </div>
                    {/* End Social Brands */}
                </div>
                {/* End Grid */}
            </footer>
        </div>
    )
}

export default Footer;