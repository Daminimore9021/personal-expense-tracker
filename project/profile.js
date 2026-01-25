fetch('register.html')
  .then(response => response.text())
  .then(data => {
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(data, 'text/html');
    var firstname = htmlDoc.querySelector('#firstname').value;
    var lastname = htmlDoc.querySelector('#lastname').value;
    var email = htmlDoc.querySelector('#email').value;

    var profile = 'First Name: ' + firstname + '<br>';
    profile += 'Last Name: ' + lastname + '<br>';
    profile += 'Email: ' + email + '<br>';

    document.querySelector('#profile').innerHTML = profile;
  })
  .catch(error => console.error('Error:', error));