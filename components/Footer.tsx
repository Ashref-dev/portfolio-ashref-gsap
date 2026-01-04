export const Footer = () => {
  return (
    <footer className='h-[80vh] bg-white flex flex-col items-center justify-center z-0 relative px-4 border-t border-neutral-100'>
      <div className='text-center'>
        <p className='text-neutral-400 mb-6 font-sans text-[10px] tracking-[0.3em] uppercase'>
          Let's Meet!
        </p>
        <a href='mailto:hi@ashref.tn' className='group relative inline-block'>
          <h2 className='text-[12vw] font-black text-neutral-900 leading-[0.8] tracking-tighter group-hover:text-neutral-700 transition-colors cursor-pointer'>
            LET'S
            <br />
            TALK
          </h2>
          <div className='absolute bottom-8 right-0 w-full h-1 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left'></div>
        </a>
      </div>

      <div className='mt-20 flex flex-wrap justify-center gap-8 text-neutral-500 font-sans text-[10px] tracking-[0.2em] uppercase'>
        <a
          href='https://www.linkedin.com/in/mohamedashrefbna/'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-black transition-colors'
        >
          LINKEDIN
        </a>
        <a
          href='https://www.behance.net/mohamedashrefbna'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-black transition-colors'
        >
          BEHANCE
        </a>
        <a
          href='https://github.com/Ashref-dev'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-black transition-colors'
        >
          GITHUB
        </a>
        <a
          href='https://leetcode.com/u/mohamedashrefbenabdallah/'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-black transition-colors'
        >
          LEETCODE
        </a>
        <a
          href='/assets/resume_ashref.pdf'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-black transition-colors border-b border-neutral-300 pb-0.5'
        >
          DOWNLOAD CV
        </a>
      </div>

      <div className='absolute bottom-8 left-0 w-full text-center text-[10px] font-sans tracking-widest text-neutral-300 uppercase'>
        &copy; {new Date().getFullYear()} Ashref. All Rights Reserved.
      </div>
    </footer>
  );
};
