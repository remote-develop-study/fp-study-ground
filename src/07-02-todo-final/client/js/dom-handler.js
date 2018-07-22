const $ = {
  display: (el, show = true) => {
    [...el].map(e => e.style.display = show ? 'block' : 'none');
  },
  activateButtonSolitude: (target, otherButtons, activeFlag = 'active') => {
    target.classList.add(activeFlag);
    otherButtons.forEach(button => {
      if (button !== target) {
        button.classList.remove('active')
      }
    })
  },
};

export default $