// Script for the Star Wars RPG!
$(document).ready(function() {
    // Handler for .ready() called.
    //Avatar object declaration
    var myAvatar;
    var myEnemy;

    var yoda = {
        id: 0,
        name: "Yoda",
        picture: "yoda.jpg",
        hp: 120,
        attackPower: 0,
        counterAttackPower: 8,
        attack: function (defender) {
            defender.hp -= this.attackPower;
            this.attackPower += this.counterAttackPower;
            this.hp -= defender.damage;
        },

    }
    var luke = {
        id: 1,
        name: "Luke Skywalker",
        picture: "luke.jpg",
        hp: 100,
        attackPower: 0,
        counterAttackPower: 10,
        attack: function (defender) {
            this.hp -= defender.damage;
            this.attackPower += this.attackPower;
        },

    }
    var maul = {
        id: 2,
        name: "Darth Maul",
        picture: "maul.jpg",
        hp: 150,
        attackPower: 0,
        counterAttackPower: 20,
        attack: function (defender) {
            this.hp -= defender.damage;
            this.attackPower += this.attackPower;
        },

    }
    var vader = {
        id: 3,
        name: "Darth Vader",
        picture: "vader.jpg",
        hp: 180,
        attackPower: 0,
        counterAttackPower: 25,
        attack: function (defender) {
            this.hp -= defender.damage;
            this.attackPower += this.attackPower;
        },

    }
    //Array of objects containing all the characters
    var avatarList = [yoda,luke,maul,vader];
    
    
    //Create avatars
    function createAvatar(avatar, place) {
        var card = $("<div>");
        
        card.addClass("avatar character thumbnail");
        card.attr('data',avatar.id);
        card.append("<div class = 'avatar-name'>" + avatar.name + "</div>");
        card.append("<img src='assets/images/" + avatar.picture + "'></img>");
        card.append("<div class = 'avatar-hp'>" + avatar.hp + "</div>");
        place.append(card);
        
    }
    //Populate character's list
    $.each(avatarList, function(i, element) {
        createAvatar(element,$(".characters"));
    });

    $('.character').click(function(){
        if(!myAvatar){
            myAvatar = avatarList[$(this).attr('data')];
            $(this).removeClass('character').addClass('selected-card');
            // $('.character').removeClass('character').addClass('remaining-card');
            // $('.character').remove();
            $('.character').appendTo($('.remaining-enemies'));
        }
    });
    $('.remaining-card').click(function(){
        $(this).attr('class', 'avatar enemy-card thumbnail');
        $(this).appendTo($('.defender-area'));
    });

});

