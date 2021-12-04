function myMove() {
  let id = null;
  clearInterval(id);
  const elem = document.getElementById("animate");   
  let pos = 0;
  id = setInterval(move, 0.1);
  function move() {
    if (pos == 450) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.top = pos + "px"; 
      elem.style.left = pos + "px"; 
      console.log(elem.style.top)
    }
  }
}



let day;
switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case  6:
    day = "Saturday";
}
document.getElementById("day").innerHTML = "Today is " + day;



class Car {
  constructor(brand) {
    this.carname = brand;
  }
  present() {
    return 'I have a ' + this.carname;
  }
}

class Model extends Car {
  constructor(brand, mod) {
    super(brand);
    this.model = mod;
  }
  show() {
    return this.present() + ', it is a ' + this.model;
  }
}

let myCar = new Model("Ford", "Mustang");
document.getElementById("classConstructor").innerHTML = myCar.show();

                function myDisplayer(some) {
                  document.getElementById("Promise").innerHTML = some;
                }

                let myPromise = new Promise(function(myResolve, myReject) {
                  let x = 0;

                // some code (try to change x to 5)

                  if (x == 0) {
                    myResolve("OK");
                  } else {
                    myReject("Error");
                  }
                });

                myPromise.then(
                  function(value) {myDisplayer(value);},
                  function(error) {myDisplayer(error);}
                );

const x = document.getElementById("Location");

function getLocation() {
  try {
    navigator.geolocation.getCurrentPosition(showPosition);
  } catch {
    x.innerHTML = err;
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}