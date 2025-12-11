

const Footer = () => {
  return (
    <footer className='bg-[#FFF7F0]'>
      <div className='flex flex-col gap-4 lg:gap-12 '>
        <div className='sm:mx-4 my-4 py-4 sm:px-4 lg:px-16 '>
          <hr className='border-[#D8D1CA] ' />
          <div className='flex mt-8'>
            <div className="sm:grid sm:grid-cols-[35%_65%] gap-4 lg:gap-16 w-full p-6 ">
              <div className="flex flex-col gap-4 sm:gap-8 text-[#26221E] max-w-lg">
                <p className="text-lg md:text-2xl font-bold">Todolist</p>
                <p className="text-md md:text-base">
                  Join millions of people who organize work and life with Todoist.
                </p>
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-8 ">
                <div className="p-4 text-center flex flex-col gap-4">
                  <h5 className='md:p-2 text-semibold text-base sm:text-lg hover:bg-[#F1ECE6] rounded'>Features</h5>
                  <div className="text-xs md:text-base flex flex-col gap-2">
                    <p>How it Works</p>
                    <p>For Teams</p>
                    <p>Pricing</p>
                    <p>Compare</p>
                    <p>Templates</p>
                  </div>
                </div>
                <div className="p-4 text-center flex flex-col gap-4 ">
                  <h5 className='md:p-2 text-semibold  text-base sm:text-lg hover:bg-[#F1ECE6] rounded'>Resources</h5>
                  <div className="text-xs md:text-base flex flex-col gap-2">
                    <p>Download Apps</p>
                    <p>Help Center</p>
                    <p>Customer Stories</p>
                    <p>Integrations</p>
                    <p>Status</p>
                  </div>

                </div>
                <div className="p-4 text-center flex flex-col gap-4">
                  <h5 className='md:p-2 text-semibold  text-base sm:text-lg hover:bg-[#F1ECE6] rounded'>Company</h5>
                  <div className="text-xs md:text-base flex flex-col gap-2">
                    <p>About us</p>
                    <p>Careers</p>
                    <p>Press</p>
                    <p>Twist</p>
                    <p>Hub</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
