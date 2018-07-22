const render = (dom) => {
  const prevDivTag = document.querySelector('div.content');
  prevDivTag.remove();

  const contentDivTag = document.createElement('div');
  contentDivTag.classList.add('content');
  dom.forEach((element) => contentDivTag.appendChild(element));
  document.querySelector('div.container').appendChild(contentDivTag);
};

export default render;
