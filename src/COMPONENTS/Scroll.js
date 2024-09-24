export const Scroll = (el) => {
    const yOffset = -150; // Adjust this value according to your navbar height
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
  
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  