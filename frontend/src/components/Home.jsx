import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigateTo = useNavigate();

    return (
        <div className='flex justify-center items-center p-4 lg:p-8 min-h-screen relative bg-linear-to-r from-[#E8E4FF] via-[#6C5CE7] to-[#231670]'>
            <div className='flex flex-col gap-12'>
                <main>
                    <div className='flex flex-col gap-6 lg:gap-12'>
                        <div className="grid grid-cols-[40%_60%] gap-6 lg:gap-12 items-center m-4 py-4 px-8 lg:px-16">
                            <div className='flex flex-col md:gap-4 xl:gap-8'>
                                <h2 className='md:text-4xl xl:text-6xl text-6xl font-semibold text-[#26221E]'>Clarity finally.</h2>
                                <h3 className='md:text-md xl:text-xl text-white font-semibold'>Join a growing community of professionals who manage tasks, projects, and life with clarity and confidence.</h3>
                                <button className='bg-[#89DA63] md:text-md xl:text-xl md:py-2 lg:py-3 text-white font-semibold px-4 cursor-pointer rounded-lg shadow-[0_8px_15px_rgba(207,54,32,0.4)]' onClick={() => navigateTo('/signup')} >Start for free</button>
                            </div>
                            <div>
                                <img loading='lazy' src="todo_img.avif" alt="Todo App" className="w-full" />
                            </div>

                        </div>
                        <div>
                            <div className='grid grid-cols-[40%_60%] gap-12 items-center m-4 py-4 px-8 lg:px-16'>
                                <div className='flex flex-col gap-2 lg:gap-6'>
                                    <h3 className='md:text-2xl xl:text-4xl font-semibold text-[#26221E]'>In it for the long haul</h3>
                                    <h4 className='md:text-lg xl:text-2xl font-medium text-white'>A task manager you can trust for life.</h4>
                                    <h5 className='md:text-sm xl:text-xl text-white font-medium '>We’re committed to building the best to-do app — without ever compromising our values.</h5>

                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-8 items-center text-center">

                                    <div className="flex flex-col items-center gap-3">
                                        <img loading="lazy" src="appTodo.avif" alt="1k+ downloads" className="h-40" />
                                        <h3 className="text-[#89DA63] font-medium whitespace-nowrap">
                                            1k+ downloads
                                        </h3>
                                    </div>

                                    <div className="flex flex-col items-center gap-3">
                                        <img loading="lazy" src="todouser.avif" alt="Pro Users" className="h-40" />
                                        <h3 className="text-[#89DA63] font-medium whitespace-nowrap">
                                            Pro Users
                                        </h3>
                                    </div>

                                    <div className="flex flex-col items-center gap-3">
                                        <img loading="lazy" src="countriesTodo.avif" alt="Few Countries" className="h-40" />
                                        <h3 className="text-[#89DA63] font-medium whitespace-nowrap">
                                            Few Countries
                                        </h3>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home
