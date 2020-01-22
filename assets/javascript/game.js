//Avatar object declaration
var myAvatar;
var defender;

//Array of objects containing all the characters
const characterList = [
  {
    id: 1,
    name: "Yoda",
    picture: "yoda.jpg",
    hp: 120,
    attackPower: 12,
    powerIncrement: 8
  },
  {
    id: 2,
    name: "Luke Skywalker",
    picture: "luke.jpg",
    hp: 100,
    attackPower: 6,
    powerIncrement: 20
  },
  {
    id: 3,
    name: "Darth Maul",
    picture: "maul.jpg",
    hp: 150,
    attackPower: 15,
    powerIncrement: 12
  },
  {
    id: 4,
    name: "Darth Vader",
    picture: "vader.jpg",
    hp: 180,
    attackPower: 20,
    powerIncrement: 10
  }
];

var game = {
  playing: false,
  selectedCharacter: {},
  selectedOpponent: {},
  characterList: [...characterList]
};

//Function to reset the game
function restartGame() {
  game = {
    playing: false,
    selectedCharacter: {},
    selectedOpponent: {},
    characterList: [...characterList]
  };
  renderSelectedCharacters();
  renderCharacterList();
}

function renderSelectedCharacters() {
  // code to render selected character
  if (!game.selectedCharacter || !game.selectedCharacter.name) {
    $("#myCharacter").empty();
    console.log("No Character was selected yet!");
  } else {
    var $myCharacter = $(
      `<div class="avatar card text-white flex-grow-1 mx-3">`
    );
    $myCharacter.append(
      $(
        `<img src="./assets/images/${game.selectedCharacter.picture}" class="avatar card-img" alt="Avatar"/>`
      )
    );
    let $characterInfo = $(`<div class="avatar-info card-img-overlay">`);
    $characterInfo.append(
      $(`<h5 class="card-title mt-auto">${game.selectedCharacter.name}</h5>`)
    );
    $characterInfo.append(
      $(`<p class="card-text">${game.selectedCharacter.hp}</p>`)
    );
    $myCharacter.append($characterInfo);
    $("#myCharacter")
      .empty()
      .append($myCharacter);
  }

  // code to render selected opponent
  if (!game.selectedOpponent || !game.selectedOpponent.name) {
    $("#opponent").empty();
    console.log("No Opponent was selected yet!");
  } else {
    var $opponent = $(`<div class="avatar card text-white flex-grow-1 mx-3">`);
    $opponent.append(
      $(
        `<img src="./assets/images/${game.selectedOpponent.picture}" class="avatar card-img" alt="Avatar"/>`
      )
    );
    let $characterInfo = $(`<div class="avatar-info card-img-overlay">`);
    $characterInfo.append(
      $(`<h5 class="card-title mt-auto">${game.selectedOpponent.name}</h5>`)
    );
    $characterInfo.append(
      $(`<p class="card-text">${game.selectedOpponent.hp}</p>`)
    );
    $opponent.append($characterInfo);
    $("#opponent")
      .empty()
      .append($opponent);
  }
  // console.log(game);
}

// Select Character
function selectCharacter(id) {
  if (!game.selectedCharacter || !game.selectedCharacter.id) {
    game.selectedCharacter = characterList.filter(item => item.id === id)[0];
    game.characterList = game.characterList.filter(item => item.id !== id);
  }
  if (
    game.selectedCharacter.id !== id &&
    (!game.selectedOpponent.id || game.selectedOpponent.hp <= 0)
  ) {
    game.selectedOpponent = characterList.filter(item => item.id === id)[0];
    game.characterList = game.characterList.filter(item => item.id !== id);
  }
  renderSelectedCharacters();
  renderCharacterList();
}

// Select Opponent

//Render the list of Character cards
const renderCharacterList = () => {
  $("#characters").empty();
  game.characterList.map((character, index) => {
    var card = $(`<div id="character-${character.id}">`);
    card.addClass("avatar-thumbnail card mx-3");
    card.data("id", character.id);
    var thumbnailInfo = $(
      '<div class="avatar-thumbnail-info card-img-overlay">'
    );
    $(
      `<h6 class="avatar-name card-title"> ${character.name}  ${character.hp} </h6>`
    ).appendTo(thumbnailInfo);
    card.append(
      `<img src="assets/images/${character.picture}" class="avatar-thumbnail card-img">`
    );
    card.append(thumbnailInfo);
    $("#characters").append(card);
  });
};

// Attack
function attack() {
  if (!game.selectedCharacter || !game.selectedOpponent) {
    return console.log("No Character or Oponent Selected");
  }

  if (game.selectedCharacter.hp <= 0) {
    console.log("You are dead!");
  }

  if (game.selectedOpponent.hp <= 0) {
    console.log("You won the fight");
    game.selectedOpponent = {};
  }

  if (game.selectedCharacter.hp > 0) {
    game.selectedOpponent.hp -= game.selectedCharacter.attackPower;
    game.selectedCharacter.attackPower += game.selectedCharacter.powerIncrement;
    game.selectedCharacter.hp -= game.selectedOpponent.attackPower;
    game.selectedOpponent.attackPower += game.selectedOpponent.powerIncrement;
  }
  renderSelectedCharacters();
  renderCharacterList();
}

$(document).ready(function() {
  // Render the list of characters
  renderCharacterList();
  //OnClick event to select my character from the list of avatars
  $(".characters").on("click", "div.avatar-thumbnail", function() {
    console.log($(this).data("id"));
    selectCharacter($(this).data("id"));
  });

  $("#attack-btn").click(function() {
    if (game.selectedCharacter.hp <= 0) {
      $("#attack-detail").text("You have been defeated...GAME OVER!");
    } else {
      if (game.selectedOpponent.hp <= 0) {
        game.selectedOpponent = {};
        renderSelectedCharacters();
      } else {
        attack();
      }
    }
  });

  $("#restart-btn").click(function() {
    restartGame();
  });
});
