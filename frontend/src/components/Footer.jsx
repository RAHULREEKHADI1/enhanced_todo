

const Footer = () => {
  return (
    <footer className='bg-[#FFF7F0]'>
      <div className='flex flex-col gap-12 '>
        <div className='m-4 py-4 px-16 '>
          <hr className='border-[#D8D1CA] ' />
          <div className='flex mt-8'>
            <div className="grid grid-cols-[35%_65%] gap-16 w-full p-6 ">
              <div className="flex flex-col gap-8 text-[#26221E] max-w-lg">
                <p className="text-2xl font-bold">Todolist</p>
                <p className="text-base">
                  Join millions of people who organize work and life with Todoist.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 ">
                <div className="p-4 text-center flex flex-col gap-4">
                  <h5 className='p-2 text-semibold text-lg hover:bg-[#F1ECE6] rounded'>Features</h5>
                  <p>How it Works</p>
                  <p>For Teams</p>
                  <p>Pricing</p>
                  <p>Compare</p>
                  <p>Templates</p>
                </div>
                <div className="p-4 text-center flex flex-col gap-4">
                  <h5 className='p-2 text-semibold text-lg hover:bg-[#F1ECE6] rounded'>Resources</h5>
                  <p>Download Apps</p>
                  <p>Help Center</p>
                  <p>Customer Stories</p>
                  <p>Integrations</p>
                  <p>Status</p>
                </div>
                <div className="p-4 text-center flex flex-col gap-4">
                  <h5 className='p-2 text-semibold text-lg hover:bg-[#F1ECE6] rounded'>Company</h5>
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
    </footer>
  );
};

export default Footer;
