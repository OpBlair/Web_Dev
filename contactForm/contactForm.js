'use strict'
$('document').ready(function() {
  $('#contactForm').on('submit', function(event) {
    event.preventDefault();

    $('.error').hide();
    $('input, textarea').removeClass('error-border');

    let isValid = true;

    const firstName = $('#firstname').val().trim();
    if(firstName === ''){
      isValid = false;
      $('#firstNameError').show().addClass('error');
      $('#firstname').addClass('error-border');
    }

    const lastName = $('#lastname').val().trim();
    if(lastName === ''){
      isValid = false;
      $('#lastNameError').show().addClass('error');
      $('#lastname').addClass('error-border');
    }

    const email = $('#email').val().trim();
    const emailPattern = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(email === ''){
      isValid = false;
      $('#emailRequiredError').show().addClass('error');
      $('#email').addClass('error-border');
    } else if (!emailPattern.test(email)) {
      isValid = false;
      $('#emailError').show().addClass('error');
      $('#email').addClass('error-border');
    }

    const queryType = $('input[name="queryType"]:checked').val();
    if(!queryType){
      isValid = false;
      $('#queryTypeError').show().addClass('error');
    }

    const message = $('#message').val().trim();
    if(message === ''){
      isValid = false;
      $('#messageError').show().addClass('error');
      $('#message').addClass('error-border');
    }

    const consent = $('#confirm').is(':checked');
    if(!consent){
      isValid = false;
      $('#confirmError').show().addClass('error');
    }

    if(isValid){
      $('.success').show();
      $('#contactForm')[0].reset();
    }else{
      $('.success').hide();
    }
  });
});

//changing the background and border of input when selected
const queries = document.getElementsByClassName('query');

document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener('change',function() {
    for(let query of queries){
      query.style.backgroundColor = '';
      query.style.border = '';
    }

    if(this.checked){
      this.closest('.query').style.backgroundColor = 'hsl(148, 38%, 91%)';
      this.closest('.query').style.border = '1px solid hsl(169, 82%, 27%)';
    }
  });
});


