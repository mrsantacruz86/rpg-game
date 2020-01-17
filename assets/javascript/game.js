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

const game = {
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
}

function renderSelectedCharacters() {
  if (!game.selectedCharacter) {
    console.log("No Character was selected yet!");
  } else {
    console.log(game.selectedCharacter);
  }
  if (!game.selectedOpponent) {
    console.log("No Opponent was selected yet!");
  } else {
    console.log(game.selectedOpponent);
  }
  console.log(game);
}

// Select Character
function selectCharacter(id) {
  game.selectedCharacter = characterList.filter(item => item.id === id)[0];
  game.characterList = game.characterList.filter(item => item.id !== id);
  renderSelectedCharacters();
  renderCharacterList();
}

// Select Opponent
function selectOponent(id) {
  game.selectedOpponent = characterList.filter(item => item.id === id)[0];
  game.characterList = game.characterList.filter(item => item.id !== id);
  renderSelectedCharacters();
  renderCharacterList();
}
//Render the list of Character cards
const renderCharacterList = () => {
  $(".avatar-thumbnail").remove();
  game.characterList.map((character, index) => {
    var card = $(`<div id="character-${character.id}">`);
    card.addClass("avatar-thumbnail card mx-3");
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
    $(".characters").append(card);
  });
};

// Attack
function attack() {
  if (!game.selectedCharacter || !game.selectedOpponent) {
    return console.log("No Character or Oponent Selected");
  }

  if (game.selectedCharacter.hp > 0) {
    game.selectedOpponent.hp -= game.selectedCharacter.attackPower;
    game.selectedCharacter.attackPower += game.selectedCharacter.powerIncrement;
    game.selectedCharacter.hp -= game.selectedOpponent.attackPower;
    game.selectedOpponent.attackPower += game.selectedOpponent.powerIncrement;
  }
  if (game.selectedCharacter.hp <= 0) {
    console.log("You are dead!");
  }
  if (game.selectedOpponent.hp <= 0) {
    console.log("You won the fight");
    game.selectedOpponent = {};
  }
  renderSelectedCharacters();
  renderCharacterList();
  return console.log(game.selectedCharacter, game.selectedOpponent);
}

$(document).ready(function() {
  //OnClick event to select my character from the list of avatars
  $(".avatar").click(function() {
    if (!myAvatar) {
      myAvatar = $(this).data("data");
      $(this)
        .removeClass("character")
        .addClass("selected-card");
      $(this).appendTo($(".mySpace"));
    } else {
      defender = $(this).data("data");
      $(this)
        .removeClass("character")
        .addClass("enemy-card");
      $(this).appendTo(".defender-area");
    }
  });
  $("#attackBtn").click(function() {
    var remainingDefenders = 3;
    if (remainingDefenders > 0) {
      myAvatar.attack(defender);
      refreshHP();
      if (myAvatar.hp <= 0) {
        $("#attack-detail").text("You have been defeated...GAME OVER!");
      } else {
        if (defender.hp <= 0) {
          $(".enemy-card").remove();
          defender = null;
          remainingDefenders--;
        } else {
          $("#attack-detail").html(
            "You attacked " +
              defender.name +
              " for " +
              myAvatar.attackPower +
              " damage.</br>"
          );
          $("#attack-detail").append(
            defender.name +
              " attacked you back for " +
              defender.counterAttackPower +
              " damage."
          );
        }
      }
    } else {
      $("#attack-detail").text("You Won!...GAME OVER!");
    }
  });
  $("#restartBtn").click(function() {
    location.reload();
  });
});
