//Avatar object declaration  
var myAvatar;
var defender;

var yoda = {
    id: 0,
    name: "Yoda",
    picture: "yoda.jpg",
    hp: 120,
    attackPower: 0,
    counterAttackPower: 8,
    attack: function (defender) {
        this.attackPower += this.counterAttackPower;
        defender.hp -= this.attackPower;
        this.hp -= defender.counterAttackPower;
    }

}
var luke = {
    id: 1,
    name: "Luke Skywalker",
    picture: "luke.jpg",
    hp: 100,
    attackPower: 0,
    counterAttackPower: 10,
    attack: function (defender) {
        this.attackPower += this.counterAttackPower;
        defender.hp -= this.attackPower;
        this.hp -= defender.counterAttackPower;
    }

}
var maul = {
    id: 2,
    name: "Darth Maul",
    picture: "maul.jpg",
    hp: 150,
    attackPower: 0,
    counterAttackPower: 20,
    attack: function (defender) {
        this.attackPower += this.counterAttackPower;
        defender.hp -= this.attackPower;
        this.hp -= defender.counterAttackPower;
    }

}
var vader = {
    id: 3,
    name: "Darth Vader",
    picture: "vader.jpg",
    hp: 180,
    attackPower: 0,
    counterAttackPower: 25,
    attack: function (defender) {
        this.attackPower += this.counterAttackPower;
        defender.hp -= this.attackPower;
        this.hp -= defender.counterAttackPower;
    }

}
//Array of objects containing all the characters
var avatarList = [yoda, luke, maul, vader];

//Functions to end and reset the game


//Functions to refresh HP

function refreshHP() {
    avatarList.forEach(function(avatar) {
        var $avatarCard = $(`#character-${avatar.id}`);
        $avatarCard.find('.avatar-hp').text(avatar.hp);
    })
}



// Script for the DOM Manipulation 
$(document).ready(function() {
    // Handler for .ready() called.  
    
    //Create avatars
    function createAvatar(avatar, place) {
        var $card = $(`<div id="character-${avatar.id}">`); 
        $card.addClass("avatar character thumbnail");
        $card.data('data',avatar);
        $card.append("<div class = 'avatar-name'>" + avatar.name + "</div>");
        $card.append("<img src='assets/images/" + avatar.picture + "'></img>");
        $card.append("<div class = 'avatar-hp'>" + avatar.hp + "</div>");
        place.append($card);
        
    }
    //Populate character's list
    $.each(avatarList, function(i, element) {
        createAvatar(element, $(".characters"));
    });
    //OnClick event to select my character from the list of avatars
    $('.avatar').click(function(){
        if(!myAvatar){
            myAvatar = $(this).data('data');
            $(this).removeClass('character').addClass('selected-card');
            // $('.character').removeClass('character').addClass('remaining-card');
            $(this).appendTo($('.enemy-space'));
        }
        else {
            defender = $(this).data('data');
            $(this).removeClass('character').addClass('enemy-card');
            $(this).appendTo(".defender-area");
        }
    });
    // $('.remaining-card').click(function(){
    //     $(this).removeClass('remaining-card').addClass('enemy-card');
    //     $(this).appendTo($('.defender-area'));
    // });
    $('#attackBtn').click(function (){
        myAvatar.attack(defender);
        refreshHP();
    });
    $.

});

