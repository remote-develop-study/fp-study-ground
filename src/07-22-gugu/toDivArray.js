const toDivArray = (dan, numRows) => {
  return numRows.map((number, index) => {
    const divTag = document.createElement('div');
    divTag.classList.add('row');
    const spanTag1 = document.createElement('span');
    spanTag1.innerText = dan;
    const spanTag2 = document.createElement('span');
    spanTag2.innerText = 'X';
    const spanTag3 = document.createElement('span');
    spanTag3.innerText = index + 1;
    const spanTag4 = document.createElement('span');
    spanTag4.innerText = '=';
    const spanTag5 = document.createElement('span');
    spanTag5.innerText = number;

    divTag.appendChild(spanTag1);
    divTag.appendChild(spanTag2);
    divTag.appendChild(spanTag3);
    divTag.appendChild(spanTag4);
    divTag.appendChild(spanTag5);

    return divTag;
  });
};

export default toDivArray;
