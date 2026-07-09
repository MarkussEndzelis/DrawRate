const WORDS = [
    {word: 'cat', complexity: 'easy', refImage: 'images/cat.png'},
    {word: 'house', complexity: 'easy', refImage: 'images/house.png'},
    {word: 'sun', complexity: 'easy', refImage: 'images/sun.png'},
    {word: 'tree', complexity: 'easy', refImage: 'images/tree.png'},
    {word: 'fish', complexity: 'easy', refImage: 'images/fish.png'},
    {word: 'car', complexity: 'easy', refImage: 'images/car.png'},
    {word: 'dog', complexity: 'easy', refImage: 'images/dog.png'},
    {word: 'star', complexity: 'easy', refImage: 'images/star.png'},
    {word: 'boat', complexity: 'easy', refImage: 'images/boat.png'},
    {word: 'apple', complexity: 'easy', refImage: 'images/apple.png'},

    {word: 'elephant', complexity: 'medium', refImage: 'images/elephants.png'},
    {word: 'bicycle', complexity: 'medium', refImage: 'images/bicycle.png'},
    {word: 'guitar', complexity: 'medium', refImage: 'images/guitar.png'},
    {word: 'umbrella', complexity: 'medium', refImage: 'images/umbrella.png'},
    {word: 'penguin', complexity: 'medium', refImage: 'images/penguin.png'},
    {word: 'castle', complexity: 'medium', refImage: 'images/castle.png'},
    {word: 'rocket', complexity: 'medium', refImage: 'images/rocket.png'},
    {word: 'cactus', complexity: 'medium', refImage: 'images/cactus.png'},
    {word: 'bridge', complexity: 'medium', refImage: 'images/bridge.png'},

    {word: 'rollercoaster', complexity: 'hard', refImage: 'images/rollercoaster.png'},
    {word: 'skyscraper', complexity: 'hard', refImage: 'images/skyscraper.png'},
    {word: 'submarine', complexity: 'hard', refImage: 'images/submarine.png'},
    {word: 'dinosaur', complexity: 'hard', refImage: 'images/dinosaur.png'},
    {word: 'spaceship', complexity: 'hard', refImage: 'images/spaceship.png'},
    {word: 'waterfall', complexity: 'hard', refImage: 'images/waterfall.png'},
    {word: 'thunderstorm', complexity: 'hard', refImage: 'images/thunderstorm.png'},
    {word: 'library', complexity: 'hard', refImage: 'images/library.png'},
    {word: 'trampoline', complexity: 'hard', refImage: 'images/trampoline.png'},
    {word: 'helicopter', complexity: 'hard', refImage: 'images/helicopter.png'},
];

function getRandomWord(){
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}