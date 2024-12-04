// Navigation
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  navbar.classList.toggle('active');
}

window.onscroll = () => {
  navbar.classList.remove('active');
}

// Dark/Light Mode
document.addEventListener('DOMContentLoaded', () => {
  let darkmode = document.querySelector('#darkmode');

  // Saves the user's preference for darkmode
  if (localStorage.getItem('darkmode') === 'active') {
    document.body.classList.add('active');
    darkmode.classList.replace('bx-moon', 'bx-sun');
  }

  darkmode.onclick = () => {
    if (darkmode.classList.contains('bx-moon')) {
      darkmode.classList.replace('bx-moon', 'bx-sun');
      document.body.classList.add('active');
      localStorage.setItem('darkmode', 'active');
    } else {
      darkmode.classList.replace('bx-sun', 'bx-moon');
      document.body.classList.remove('active');
      localStorage.removeItem('darkmode');
    }
  };
});


// Scroll Reveal
const scroll = ScrollReveal({
  origin: 'top',
  duration: 2200,
  distance: '50px',
  reset: true
});

scroll.reveal(`.home-text, .home-img,
            .education-img, .education-text,
            .heading, .heading2, .experience-box,
            .box, .contact`, {
  interval: 50
})

// Prevent form submission on Enter key press in specific inputs
const preventEnterSubmit = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
};

document.getElementById('name').addEventListener('keydown', preventEnterSubmit);
document.getElementById('email').addEventListener('keydown', preventEnterSubmit);
document.getElementById('subject').addEventListener('keydown', preventEnterSubmit);


const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

function sendMail(event) {
  event.preventDefault(); // Prevent the default form submission

  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let subject = document.getElementById('subject').value;
  let message = document.getElementById('message').value;

  // Check if all fields are filled
  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields.');
    return;
  }

  // Validate email address
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  let parms = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  };

  emailjs.send('service_o3iwhjc', 'template_dat50vz', parms)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Email Sent!');
      document.querySelector('form').reset(); // Reset the form
      // Remove focus class from input containers
      document.querySelectorAll('.input-container').forEach(container => {
        container.classList.remove('focus');
      });
    }, (error) => {
      console.log('FAILED...', error);
      alert('Failed to send email. Please try again later.');
    });
}