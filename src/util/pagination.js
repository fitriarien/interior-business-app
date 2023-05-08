export default function generatePageArray(currentPage, totalPages) {
  let arrayOfPage = [];
  const arrayLength = 5;

  // Prev button will be displayed if currentPage > 1
  if (currentPage > 1) {
    arrayOfPage.push('Prev');
  }

  if (totalPages <= arrayLength) {  // if totalPages less than or equal to 5
    for (let i = 1; i <= totalPages; i++) {
      arrayOfPage.push(i);
    }
  } else if (currentPage <= Math.ceil(arrayLength/2)) {  // if currentPage is in the beginning of arrayOfPage
    for (let i = 1; i <= arrayLength; i++) {
      arrayOfPage.push(i);
    }
    arrayOfPage.push('... ');
  } else if (currentPage >= totalPages-Math.floor(arrayLength/2)) {  // if currentPage is in the end of arrayOfPage
    arrayOfPage.push(1, ' ...');
    for (let i = totalPages-arrayLength+2; i <= totalPages; i++) {
      arrayOfPage.push(i);
    }
  } else {  // if currentPage is in the middle
    arrayOfPage.push(1, ' ...');
    for (let i = (currentPage-2); i <= (currentPage); i++) {
      arrayOfPage.push(i+1);
    }
    arrayOfPage.push('... ', totalPages);
  }

  // Next button will be displayed if currentPage < last page
  if (currentPage < totalPages) {
    arrayOfPage.push('Next')
  }

  return arrayOfPage;
}