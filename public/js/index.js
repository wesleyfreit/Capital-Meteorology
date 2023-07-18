if (window.location.pathname == '/metereology') {
  const queryParams = new URLSearchParams(window.location.search);
  const date = queryParams.get('date');
  const capital = queryParams.get('capital');
  document.getElementById('date').value = date;
  document
    .querySelectorAll('.option-capital')
    .forEach(
      (option) => capital && capital == option.value && option.setAttribute('selected', true),
    );
}
