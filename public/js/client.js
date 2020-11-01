const cardForm = document.querySelector('.card_form');
const nextButton = document.querySelector('[data-name="next_button"]');

cardForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const id = document.querySelector('p').id;
  const formData = new FormData(cardForm);
  const parseData = Object.fromEntries(formData);

  const response = await fetch(`/card/showCards/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parseData),
  });

  const data = await response.json();

  const p = document.createElement('p');
  p.innerText = data.answer;
  cardForm.after(p);
  const submitButton = document.querySelector('[data-name="submit_button"]');

  submitButton.classList.add('hidden');
  nextButton.classList.remove('hidden');
});
