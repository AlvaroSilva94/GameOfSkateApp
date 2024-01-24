const letterButtonsP1 = document.querySelectorAll('.btn-square1');
const letterButtonsP2 = document.querySelectorAll('.btn-square2');

letterButtonsP1.forEach(button => {
  button.addEventListener('click', () => {
    const letterP1 = button.getAttribute('data-letter');

    // Toggle the pressed state
    if (button.classList.contains('pressed')) {
      button.classList.remove('pressed');
    } else {
      button.classList.add('pressed');
    }
  });
});

letterButtonsP2.forEach(button => {
  button.addEventListener('click', () => {
    const letterP2 = button.getAttribute('data-letter');

    // Toggle the pressed state
    if (button.classList.contains('pressed')) {
      button.classList.remove('pressed');
    } else {
      button.classList.add('pressed');
    }
  });
});