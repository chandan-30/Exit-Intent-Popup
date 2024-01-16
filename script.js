
(function () {
    // Check if the modal should be hidden based on previous interactions
    if( shouldHideModal() ) {
        return null;
    }

    if (window.innerWidth > 768) {
        showModal();
    } else {
        setTimeout(function () {
            showModal();
        }, 5000);
    }
    
    // Close modal if overlay is clicked
    window.onclick = function (event) {
        let overlay = document.getElementById("overlay");
        if (event.target === overlay) {
            closeModal();
        }
    };

    // Function to display the modal
    function showModal() {
        let popupHtml = `    <div id="overlay"></div>

        <div id="modal">
            <span id="closeBtn">&times;</span>
    
            <div style="display: flex; justify-content: space-between;" >
    
                <div id="popup" class="popup">
                    <div class="popup-content" id="chandanPopup">
                    <h3 class="heading">GET $10 OFF WHEN YOU SIGN UP FOR</h3>
                    <p class="subheading">SAVINGS,NEWS,UPDATES AND MORE</p>
                    <form id="subscribeForm" name="myForm" novalidate>
                        <div>
                            <input class="fullsize" type="text" id="name" name="name"  placeholder="your name">
                        </div>
                        <div>
                            <input class="fullsize" type="email" id="email" name="email"  placeholder="email address">
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" id="agree" required name="check"> Check this box to receive monthly newsletter
                            </label>
                        </div>
                        
                        <div class="submit-container">
                            <button class="submit" type="submit">SIGN UP</button>
                        </div>
    
                        
                        
                    </form>
                    <a href="#" style="font-size: x-small; color: black;">PRIVACY POLICY</a>
                    </div>
                </div>
    
    
                <div class="image" >
                    <img src="https://useruploads.visualwebsiteoptimizer.com/useruploads/176372/images/339bf06d957c32e3b61f79b563f229af_offerx500.png" alt="image">
                </div>
            </div>
    
        </div>`;
        let popupCss = `@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Ubuntu&display=swap');

        *, *:before, *:after {
            box-sizing: inherit;
        }
          
        #overlay {
            /* display: none; */
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1;
        }
        
        #modal {
            /* display: none; */
            box-sizing: border-box;
            font-family: 'ubuntu', Arial, sans-serif;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px 30px;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            z-index: 2;
            width: 80%;
            background-color: #FDD503;
            text-align: center;
            max-width: 700px;
        }
        
        #closeBtn {
            position: absolute;
            top: 6px;
            right: 10px;
            cursor: pointer;
            font-size: 30px;
        }
        
        #popup {
            flex: 1;
        }
        
        form {
            margin-bottom: 15px;
        }
        
        img {
            width: 100%;
            height: 100%;
        }
        
        .heading {
            margin-bottom: 0px;
            font-weight:bolder;
        }
        
        .subheading {
            font: menu;
            font-size: medium;
            margin-top: 0px;
        }
        
        .fullsize {
            border: none;
            padding: 5px 20px;
            margin-top: 20px;
            height: 50px;
            width: 100%;
        }
        
        .checkbox {
            margin-top: 20px;
            margin-bottom: 20px;
            text-align: left;
         }
        
         .checkbox label {
            font-size:small;
         }
        
        .image {
            margin-top: 6%;
            width: 45%;
        }
        
        .submit {
            width: 100%;
            border: none;
            height: 50px;
            background-color: black;
            color: white;
        }
        
        
        @media screen and (max-width: 768px) {
            #modal {
                width: 95%;
            }
        
            .image {
                display: none;
            }
        
        }
        
        @media screen and (max-width: 450px) {
            #modal {
                padding: 20px 10px;
             }
        }`;

        if( document.getElementById("chandanPopup")) {
            document.getElementById("overlay").style.display = "block";
            document.getElementById("modal").style.display = "block";
            return null;
        }
        document.body.insertAdjacentHTML('beforeend', popupHtml);
        let style = document.createElement('style');
        style.innerHTML = popupCss;
        document.head.appendChild(style);

        document.getElementById("closeBtn").addEventListener("click", closeModal);
        // Add a submit event listener to the form
        document.getElementById('subscribeForm').addEventListener('submit', function (event) {
            submitForm(event);
        });
    }

    // Function to close the modal
    function closeModal() {
        if( !getCookie('modalClosed')) {
            // Set a cookie to remember that the popup has been closed
            document.cookie = 'modalClosed=true; expires=' + getExpirationDate();
        }
        document.getElementById("overlay").style.display = "none";
        document.getElementById("modal").style.display = "none";
    }
    
    // Function to check if modal should be hidden based on previous interactions
    function shouldHideModal() {
        // Check if the popup has been closed previously
        return getCookie('modalClosed') === 'true';
    }

    // Function to handle form submission
    function submitForm(event) {
        event.preventDefault();
        
        // Perform form validation
        let nameInput = document.getElementById('name');
        let emailInput = document.getElementById('email');
        let agreeCheckbox = document.getElementById('agree');
        
        if (validateName(nameInput) && validateEmail(emailInput) && validateCheckbox(agreeCheckbox)) {
            // Perform any other actions (e.g., submit data)
            alert('Form submitted successfully!');
            event.target.reset();
            closeModal();
        }
    }


    // Function to validate the name field
    function validateName(nameInput) {
        // Add your name validation logic here
        if ( nameInput.value.trim() === '' ) {
            alert('Please enter your name');
            document.myForm.name.focus();
            return false;
        }
        return true;
    }
    
    // Function to validate the email field
    function validateEmail(emailInput) {
        // Add your email validation logic here
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value) ) {
            alert('Please enter a valid email address');
            document.myForm.email.focus();
            return false;
        }
        return true;
    }
    
    // Function to validate the checkbox
    function validateCheckbox(checkbox) {
        // Add your checkbox validation logic here
        if (!checkbox.checked ) {
            alert('Please agree to the newsletter');
            checkbox.focus();
            return false;
        }
        return true;
    }

    // Function to get the expiration date for the cookie
    function getExpirationDate() {
        let date = new Date();
        date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); // Expires in 1 year
        return date.toUTCString();
    }
    
    // Function to get the value of a cookie by name
    function getCookie(name) {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
    }


})();