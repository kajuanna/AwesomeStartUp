//**Sends a http request and returns the data.
let lineup;
$.ajax({
  url: "https://randomuser.me/api/?results=12",
  dataType: "json",
  success: function (data) {
    console.log(data);
    lineup = data.results;
    attachDataToScreen();
    getCards();
  },
});
//adds data to screen
function attachDataToScreen() {
  let galleryContainer = document.getElementById("gallery");
  for (let i = 0; i < lineup.length; i++) {
    var card = `<div class="card">
      <div class="card-img-container">
        <img
          class="card-img"
          src=${lineup[i].picture.large}
          alt="profile picture"
        />
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${lineup[i].name.first} ${lineup[i].name.last}</h3>
        <p class="card-text">${lineup[i].email}</p>
        <p class="card-text cap">${lineup[i].location.city}${lineup[i].location.state}</p>
      </div>
    </div>`;

    galleryContainer.insertAdjacentHTML("beforeend", card);
  }
}

// This function allows you to loop through the cards
function getCards() {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
      showModal(i);
    });
  }
}

//shows the modal and diplays the data from the http request.
function showModal(index) {
  var modal = `
  <div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${
            lineup[index].picture.large
          }" alt="profile picture">
          <h3 id="name" class="modal-name cap">${lineup[index].name.first} ${
    lineup[index].name.last
  }</h3>
          <p class="modal-text">${lineup[index].email}</p>
          <p class="modal-text cap">${lineup[index].location.city}${
    lineup[index].location.state
  }</p>
          <hr>
          <p class="modal-text">${formatedNumber(lineup[index].cell)}</p>
          <p class="modal-text">${lineup[index].location.street.number} ${
    lineup[index].location.street.name
  }${lineup[index].location.city}, ${lineup[index].location.state} ${
    lineup[index].location.postcode
  }</p>
          <p class="modal-text">Birthday:${lineup[index].dob.date.slice(
            5,
            7
          )}/${lineup[index].dob.date.slice(8, 10)}/${lineup[
    index
  ].dob.date.slice(2, 4)} </p>
      </div>
  </div>`;

  document.querySelector(`body`).insertAdjacentHTML("afterbegin", modal);
  //Modal close button. When modal opens the X button will allow you to close the modal for each random user.
  var exitModalButton = document.getElementById("modal-close-btn");
  var modalContainer = document.querySelector(".modal-container");

  exitModalButton.addEventListener("click", () => {
    modalContainer.hidden = true;
  });
}
//This function allows the formatting of all telephone numbers to be formatted as the html markup.
function formatedNumber(phoneNumberString) {
  var removeNumbers = ("" + phoneNumberString).replace(/\D/g, "");
  while (removeNumbers.length < 10) {
    removeNumbers = removeNumbers + "0";
  }
  let num = removeNumbers;
  return (
    "(" +
    num.substring(0, 3) +
    ") " +
    num.substring(3, 6) +
    "-" +
    num.substring(6, 10)
  );
}
