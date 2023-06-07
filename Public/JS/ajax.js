$(document).ready(function() {
    $('#Sign_Up').submit(function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Perform form validation
      if (!validateForm()) {
        return;
      }
  
      var formData = new FormData(this);
  
      $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
          // Handle the success response (e.g., display a success message)
          if (response.success) {
            $('#register').html('<h1>Account Created Successfully!</h1>');
          } else {
            if (response.error === 'Username already exists') {
              $('#nameerr').text('Username is already taken');
            } else {
              $('#register').html('<h1>Account Creation Failed. Please try again.</h1>');
            }
          }
        },
        error: function(error) {
          // Handle the error response (e.g., display an error message)
          $('#register').html('<h1>Error occurred during account creation. Please try again later.</h1>');
        }
      });
    });
  
    function validateForm() {
      var name = document.getElementById('un').value;
      var nameerr = document.getElementById('nameerr');
      var email = document.getElementById('em').value;
      var emailerr = document.getElementById('ema');
      var password = document.getElementById('password').value;
      var confirmPassword = document.getElementById('confirmPassword').value;
      var passwordError = document.getElementById('passwordError');
  
      if (name.trim() === '') {
        nameerr.textContent = 'You must enter a user name';
        return false;
      }
  
      if (email.trim() === '') {
        emailerr.textContent = 'You must enter an email';
        return false;
      }
  
      if (password !== confirmPassword) {
        passwordError.textContent = 'Passwords do not match';
        return false;
      }
  
      nameerr.textContent = '';
      emailerr.textContent = '';
      passwordError.textContent = '';
      return true;
    }
  });
  