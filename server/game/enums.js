(function (type) {
    type.Diet = Object.freeze({
        herbivor: 1,
        1: "herbivor",
        omnivore: 2,
        2: "omnivore",
        carnivore: 3,
        3: "carnivore"
    });

    type.Edible = Object.freeze({
        fruit: 1,
        1: 'fruit'
    });
})(module.exports);
