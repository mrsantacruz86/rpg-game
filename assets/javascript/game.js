// Script for the Star Wars RPG!
$(function() {
    // Handler for .ready() called.
    //Avatar object declaration
    var yoda = {
        name: "Yoda",
        picture: "yoda.jpg",
        hp: 120,
        attackPower: 0,
        counterAttackPower: 8,
        attack: function (defender) {
            this.attackPower += this.counterAttackPower;
            this.hp -= defender.damage;
        },

    }
    var luke = {
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
        
        card.addClass("avatar");
        card.append("<div class = 'avatar-name'>" + avatar.name + "</div>");
        card.append("<img src='assets/images/" + avatar.picture + "'></img>");
        card.append("<div class = 'avatar-hp'>" + avatar.hp + "'></div>");
        place.append(card);
        
    }
    avatarList.forEach(element => {
        createAvatar(element,$("all-card-area"));
    });

});

