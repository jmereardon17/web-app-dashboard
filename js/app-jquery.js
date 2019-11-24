$('#alertMessage').delay(300).slideDown(700);

$('#alertMessage').on('click', e => {
  if (e.target.className === 'alert__icon') {
    $('#alertMessage').slideUp(700);
  }
});
