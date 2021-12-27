const showSignUpForm = () => {
	document.querySelector('.signUpForm').style.display = 'block';
	document.querySelector('#disappear').innerHTML = '<br>';
}

const fetchMails = (usernameRequest) => {
				fetch('http://127.0.0.1:3000/mails', {
			  method: "POST",
			  headers: {
				      Accept: "application/json, text/plain, /",
				      "Content-Type": "application/json",
				    },
			  body: JSON.stringify({
			    		username: usernameRequest
							})		    
				})
			  .then(response => response.json())
				.then(mails => {
					document.querySelector('#inboxLink').className = 'active';
					document.querySelector('#starredLink').className = '';
					document.querySelector('#comingSoon').className = '';
					mails.forEach(eachMail => {
						if (eachMail.read === true){
							mailClass = 'mailContainer_Read';
						} else {
							mailClass = 'mailContainer';
						};
						if (eachMail.starred === true){
							starIcon = 'star';
						} else {
							starIcon = 'star_border';
						}
						document.querySelector('section').innerHTML = 
						document.querySelector('section').innerHTML + 
							`	<div class='${mailClass}' id='mail${eachMail.mailid}'>
									<button class="mailContainer_i" onclick="selectMail('${eachMail.mailid}')">
										<i class="material-icons">check_box_outline_blank</i>
									</button>	
									<button id='star${eachMail.mailid}' class="mailContainer_ii" 
											onclick="changeStarredStatus(${eachMail.mailid},'${usernameRequest}')">
										<i class="material-icons">${starIcon}</i>
									</button>
									<button class="mailContainer_iii" 
												onclick="deleteMail(${eachMail.mailid},'${usernameRequest}')">
										<i class="material-icons">delete</i>
									</button>
									<div class='sender' onclick="changeReadStatus(${eachMail.mailid},
											'${usernameRequest}')">${eachMail.sender}</div>
									<div class='mailContent' onclick="changeReadStatus(${eachMail.mailid},
											'${usernameRequest}')">${eachMail.mailcontent}</div>
								</div> `
					})
				})
			}

function fetchMailsStarred(usernameRequest) {
		fetch('http://127.0.0.1:3000/mails', {
	  method: "POST",
	  headers: {
		      Accept: "application/json, text/plain, /",
		      "Content-Type": "application/json",
		    },
	  body: JSON.stringify({
	    		username: usernameRequest
					})		    
		})
	  .then(response => response.json())
		.then(mails => {
			document.querySelector('#inboxLink').className = '';
			document.querySelector('#starredLink').className = 'active';
			mails.forEach(eachMail => {
				if (eachMail.read === true){
					mailClass = 'mailContainer_Read';
				} else {
					mailClass = 'mailContainer';
				};
				if (eachMail.starred === true){
					
				document.querySelector('section').innerHTML = 
				document.querySelector('section').innerHTML + 
					`	<div class='${mailClass}' id='mail${eachMail.mailid}'>
							<button class="mailContainer_i" onclick="selectMail('${eachMail.mailid}')">
								<i class="material-icons">check_box_outline_blank</i>
							</button>	
							<button id='star${eachMail.mailid}' class="mailContainer_ii" 
									onclick="changeStarredStatus(${eachMail.mailid},'${usernameRequest}')">
								<i class="material-icons">star</i>
							</button>
							<button class="mailContainer_iii" 
										onclick="deleteMail(${eachMail.mailid},'${usernameRequest}')">
								<i class="material-icons">delete</i>
							</button>
							<div class='sender' onclick="changeReadStatus(${eachMail.mailid},
									'${usernameRequest}')">${eachMail.sender}</div>
							<div class='mailContent' onclick="changeReadStatus(${eachMail.mailid},
									'${usernameRequest}')">${eachMail.mailcontent}</div>
						</div> `
					}
			})
		})
	}


function changeReadStatus(mailID, user) {
	fetch('http://127.0.0.1:3000/changeread', {
	  		  method: "PUT",
	  		  headers: {
		     						Accept: "application/json, text/plain, /",
		      					"Content-Type": "application/json",
		   						},
  		    body: 		JSON.stringify({
  		    					mailID: mailID
  		    				}),
  		  		})
  		    .then(response => response.json())
  		    .then(data => {
  		    	if (data === 1){
  		    		document.querySelector(`#mail${mailID}`).className = 'mailContainer_Read';
  		    	} else{
  		    		document.querySelector(`#mail${mailID}`).className = 'mailContainer';
  		    	}
  		    })
  		    .catch(err => console.log(err.body))
}

function selectMail(mailID) {
	// body...
}

function changeStarredStatus(mailID, user) {
	fetch('http://127.0.0.1:3000/changestar', {
	  		  method: "PUT",
	  		  headers: {
		     						Accept: "application/json, text/plain, /",
		      					"Content-Type": "application/json",
		   						},
  		    body: 		JSON.stringify({
  		    					mailID: mailID
  		    				}),
  		  		})
  		    .then(response => response.json())
  		    .then(data => {
  		    	if (data === 1){
  		    		document.querySelector(`#star${mailID}`).innerHTML = `<i class="material-icons">star</i>`  		    	
  		    	} else{
  		    		document.querySelector(`#star${mailID}`).innerHTML = `<i class="material-icons">star_border</i>`
  		    	}
  		    })
  		    .catch(err => console.log(err.body))
}

function deleteMail(mailID, user) {
	fetch('http://127.0.0.1:3000/delete', {
	  		  method: "DELETE",
	  		  headers: {
		     						Accept: "application/json, text/plain, /",
		      					"Content-Type": "application/json",
		   						},
  		    body: 		JSON.stringify({
  		    					mailID: mailID,
  		    					username: user
  		    				}),
  		  		})
  		    .then(response => response.json())
  		    .then(data => {
  		    	console.log('deleting mails');
  		    	document.querySelector(`#mail${mailID}`).style.display = `none`;
  		    })
  		    .catch(err => console.log(err.body))
}

function signUpFunction() {
	const form = {
					firstName: document.querySelector('#signUpFirstName'),
					lastName: document.querySelector('#signUpLastName'),
				 	username: document.querySelector('#signUpUsername'),
				  	password: document.querySelector("#signUpPassword"),
				 
			};
		
			if (form.username.value )  {
				if (form.password.value){
			  	fetch('http://127.0.0.1:3000/signup', {
			  		  method: "POST",
			  		  headers: {
	  		     						Accept: "application/json, text/plain, /",
	  		      					"Content-Type": "application/json",
	  		   						},
		  		    body: 		JSON.stringify({
		  		    					firstName: form.firstName.value,
		  		    					lastName: form.lastName.value,
		  		      				username: form.username.value,
		  		     					password: form.password.value
		  		    				}),
		  		  		})
		  		    .then(response => response.json())
		  		    .then(data => {
		  		    	console.log(data)
		  		    	if (data === true){
		  		    		enterAccount(form.username.value);
		  		    	} else {
		  		    		document.querySelector('#signUpError').innerHTML = 'Username already taken'
		  		    	}
			  		 })
			  		}	else{
			  			document.querySelector('#signUpError').innerHTML = 'Alaye put password'
			  		}} else{
			  			document.querySelector('#signUpError').innerHTML = 'Guy you no go use username ni?'
			  		}
}

function signInFunction() {
	const form = {
					username: document.querySelector('#signInUsername'),
					password: document.querySelector('#signInPassword'),
				};
	if(form.username.value){
		  fetch('http://127.0.0.1:3000/signin', {
		    method: "POST",
		    headers: {
		     			Accept: "application/json, text/plain, /",
		      					"Content-Type": "application/json",
		   			},
		    body: 		JSON.stringify({
		    				username: form.username.value,
		    				password: form.password.value
		    		}),
		  		})
		    .then(response => response.json())
		    .then(data => {
		    	if (data === 1) {
		    		enterAccount(form.username.value);
		    	} else if (data === 2) {
		    		document.querySelector('#signInError').innerHTML = 'Wrong Password'
		    	} else {
		    		document.querySelector('#signInError').innerHTML = `User doesn't exist`
		    	}
		    })	  		
	} else {
		document.querySelector('#signInError').innerHTML = 'Username field cannot be empty'
	}
}

function composeMailFunction(senderUsername) {
	
	document.querySelector('section').innerHTML = 
		` <div class='sendMailBox'>
				<div class='recepient'><p>Recepient:</p> <input id='mailRecepient'></div>
				<div class='message'><p>Message:</p>
						<textarea placeholder="Type message.." id='mailContent' ></textarea></div>
				<p id='sendMailError'></p>
				<button onclick="sendMailFunction('${senderUsername}')" > Send</button><br><br>
				<button onclick="clearError()" style='display: none' id='clearError'> No Vex</button>
			</div>	`;
}

function sendMailFunction(senderUsername) {
	
	const mailForm = {
						  receiver: document.querySelector("#mailRecepient"),
						  mailContent: document.querySelector("#mailContent")
						}; 
		if (mailForm.receiver.value){ 
		  if(mailForm.mailContent.value) {
		  	fetch('http://127.0.0.1:3000/sendmail', {
  				    method: "PUT",
  				    headers: {
  				      Accept: "application/json, text/plain, /",
  				      "Content-Type": "application/json",
  				    },
  				    body: JSON.stringify({
  							      receiver: mailForm.receiver.value,
  							      mailContent: mailForm.mailContent.value,
  							      sender: senderUsername,
  							      starred: false,
  							      read: false,
  							      time: new Date()
  							    })
		  				 	}) 
		  		    .then(response => response.json())
		  		    .then(data => {
		  		    	console.log(data)
		  		    	enterAccount('${senderUsername}')
		  		    }) 
		  		  	.catch(err => document.querySelector('#sendMailError').innerHTML = 'error sending mail')
		  	} else{
		  		document.querySelector('#sendMailError').innerHTML = 'alas the message is empty'
		  		document.querySelector('#clearError').style.display = 'block'
		  	}}else {
		document.querySelector('#sendMailError').innerHTML = 'are you sending to a ghost?'
		document.querySelector('#clearError').style.display = 'block'
	}
}

function clearError() {
	document.querySelector('#sendMailError').innerHTML = '';
	document.querySelector('#clearError').style.display = 'none'
}

function enterAccount(accountOwner) {
	firstName = 'Osemegbe';
	lastName = 'Emuemhonjie';
	document.querySelector('body').innerHTML = `<header id="header">
		<div class="header_logo">	
			<button class="header_icons">	<i class="material-icons">menu</i></button>
				<img src="gmail_logo.png" style="width: 109px; height: 40px;">
		</div>
		<div class="header_search_bar">
				<button class="header_icons">	<i class="material-icons">search</i></button>
	
				<p id='search' ></p>
				<button class="header_icons"><i class="material-icons">menu</i></button>
		</div>
		<div class="header_right">
				<button class="headerRight" onclick="enterAccount('${accountOwner}')">
					<i class="material-icons">refresh</i>	</button>
				<button class="headerRight">
					<i class="material-icons">settings</i>	</button>
				<button class="headerRight">
					<i class="material-icons">help_outline</i>	</button>
				<button class="headerRight" onclick='typeWriter()'>
					<i id="accountOwner">${accountOwner.charAt(0).toUpperCase()}</i>
				</button>		</div>  
				<div id='profile' >
				
					<div class='profilePicture'></div>
					<h1>Osemegbe Emuemhonjie</h1>
					<h2>Lndfgorgerngognegotnooooooooooooooooooooooooooooooooooooooooo</h2>
				
				</div>
				 </header>
			

	<div id="everything"><nav id="menu"><button id="compose" onclick="composeMailFunction('${accountOwner}')">
	<img src="gmail_cross.png">
	<div>Compose</div></button><div id="labels">Labels</div><div id="menu1">
		<ul><li>	<a id='inboxLink'  class="active" onclick="enterAccount('${accountOwner}')">
			<i class="material-icons"style="font-size:20px;">&#xe156;</i><p>Inbox</p></a></li>
				<li>	<a id='starredLink' onclick="enterAccountStarred('${accountOwner}')">
				<i class="material-icons" style="font-size:20px;">star</i><p>Starred</p></a></li>
				<li><a ><i class="material-icons"style="font-size:20px;">send</i><p>Sent</p></a></li>
			<li><a ><i class="material-icons" style="font-size:20px;">watch_later</i><p>Snoozed</p></a></li>
			<li><a ><i class="material-icons" style="font-size:20px;">bookmark</i><p>Important</p></a></li>
			<li><a ><i class="material-icons" style="font-size:20px;">description</i><p>Drafts</p></a></li>
			<li><a ><i class="material-icons" style="font-size:20px;">label</i><p>Categories</p></a></li>
		
		<li>More</li>	
			<li><a><p>Chats</p></a></li>	
			<li><a id='comingSoon' onclick='comingSoon()' ><p>Scheduled</p></a></li>
			<li><a ><p>All Mail</p></a></li><li><a ><p>Spam</p></a></li>
			<li><a ><p>Trash</p></a></li>	<li><a ><p>Manage Labels</p></a></li>
			<li><a ><p>Create new label</p></a></li>	</ul>	</div>
		<div id="meet">		<ul>		<li><a>Meet</a></li>
		<li><a ><i class="material-icons" style="font-size:20px;">videocam</i><p>New meeting</p></a></li>
		<li><a ><i class="material-icons" style="font-size:20px;">watch_later</i>
		<p>Join a meeting</p></a></li>
		</ul>	</div><div id="menu4">
		<a href='bootstrap.html'><p style='text-align: center'>No recent chats</p></a>
			<p class="kontent">Start a new one</p>	</div>
	</nav><section id="main" >	<div id="main_top">
		<i class="material-icons" style="font-size:20px">check_box_outline_blank</i>
		<i class="material-icons" style="font-size:20px">arrow_drop_down</i>
		<i class="material-icons" style="font-size:20px">refresh</i>
		<i class="material-icons" style="font-size:20px">more_vert</i>
		<i class="material-icons" style="font-size:20px">chevron_left</i>
		<i class="material-icons" style="font-size:20px">chevron_right</i>
		<i class="material-icons" style="font-size:20px">keyboard</i>
		<i class="material-icons" style="font-size:20px">arrow_drop_down</i>
	
		<i class="material-icons" style="font-size:20px">star_border</i></div></section></div>`


			 fetchMails(accountOwner)
		}
	

function showProfile() {
	if (document.querySelector('#profile').style.display === ''){
		document.querySelector('#profile').style.display = 'block';
			document.querySelector('#profile').innerHTML = 
			
				console.log('showing profile')
	} else {
		document.querySelector('#profile').style.display = '';
		document.querySelector('#profile').innerHTML = '';
			console.log('removed')
	}		
}

function enterAccountStarred() {
		document.querySelector('#inboxLink').className = '';
		document.querySelector('#starredLink').className = 'active';

	document.querySelectorAll('#')
}

		txt = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum. `
		i = 0;
		var speed = 50;
		function typeWriter() {
			  if (i < txt.length) {
			    document.getElementById("search").innerHTML += txt.charAt(i);
			    i++;
			    setTimeout(typeWriter, speed);
			  }
			}

const comingSoon = () => {
	document.querySelector('#inboxLink').className = '';
	document.querySelector('#starredLink').className = '';
	document.querySelector('#comingSoon').className = 'active';

	document.querySelector('section').innerHTML = 
		`<div class="bgimg">
  				<div class="topleft">
    			<p>Logo</p>
  		</div>
  		<div class="middle">
    		<h1>COMING SOON</h1>
    		<hr>
   		 <p id="demo" style="font-size:30px"></p>
  		</div>
 		 <div class="bottomleft">
   		 <p>Some text</p>
  		</div>
	</div>`

			// Set the date we're counting down to
			var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();
	
			// Update the count down every 1 second
			var x = setInterval(function() {
	
			  // Get todays date and time
			  var now = new Date().getTime();
	
			  // Find the distance between now an the count down date
			  var distance = countDownDate - now;
	
			  // Time calculations for days, hours, minutes and seconds
			  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	
			  // Display the result in an element with id="demo"
			  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
			  + minutes + "m " + seconds + "s ";
				console.log(0);
			  // If the count down is finished, write some text
			  if (distance < 0) {
			    clearInterval(x);
			    document.getElementById("demo").innerHTML = "EXPIRED";
			  }
			}, 1000);
			
}