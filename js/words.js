const WORDS = [
    {word: 'cat', complexity: 'easy'},
    {word: 'house', complexity: 'easy'},
    {word: 'sun', complexity: 'easy'},
    {word: 'tree', complexity: 'easy'},
    {word: 'fish', complexity: 'easy'},
    {word: 'car', complexity: 'easy'},
    {word: 'dog', complexity: 'easy'},
    {word: 'star', complexity: 'easy'},
    {word: 'boat', complexity: 'easy'},
    {word: 'apple', complexity: 'easy'},

    {word: 'elephant', complexity: 'medium'},
    {word: 'bicycle', complexity: 'medium'},
    {word: 'guitar', complexity: 'medium'},
    {word: 'umbrella', complexity: 'medium'},
    {word: 'penguin', complexity: 'medium'},
    {word: 'castle', complexity: 'medium'},
    {word: 'volcano', complexity: 'medium'},
    {word: 'rocket', complexity: 'medium'},
    {word: 'cactus', complexity: 'medium'},
    {word: 'bridge', complexity: 'medium'},

    {word: 'rollercoaster', complexity: 'hard'},
    {word: 'skyscraper', complexity: 'hard'},
    {word: 'submarine', complexity: 'hard'},
    {word: 'dinosaur', complexity: 'hard'},
    {word: 'spaceship', complexity: 'hard'},
    {word: 'waterfall', complexity: 'hard'},
    {word: 'thunderstorm', complexity: 'hard'},
    {word: 'library', complexity: 'hard'},
    {word: 'trampoline', complexity: 'hard'},
    {word: 'helicopter', complexity: 'hard'},
];

function getRandomWord(){
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}