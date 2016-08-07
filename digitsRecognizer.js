var NeuralNetwork = require('./modules/neuralNetwork');
var neuralNetwork = new NeuralNetwork({
    layersConfig: [80, 3],
    connection  : 'allToAll'
});

var numbers = [
    {
        inputs: [
            0, 0, 0, 0, 0, 1, 1, 1,
            0, 0, 0, 0, 1, 1, 1, 1,
            0, 0, 0, 1, 1, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 1, 1, 0, 0, 0, 1, 1,
            0, 0, 0, 0, 0, 0, 1, 1,
            0, 0, 0, 0, 0, 0, 1, 1,
            0, 0, 0, 0, 0, 0, 1, 1,
            0, 0, 0, 0, 0, 0, 1, 1,
            0, 0, 0, 0, 0, 0, 1, 1
        ],
        outputs: [1, 0, 0]
    },
    {
        inputs: [
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            0, 0, 0, 0, 0, 0, 1, 1,
            0, 0, 0, 0, 0, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 0, 0, 0, 0, 0, 0,
            1, 1, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1
        ],
        outputs: [0, 1, 0]
    },
    {
        inputs: [
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            0, 0, 0, 0, 0, 0, 1, 1,
            0, 0, 0, 0, 0, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            0, 0, 0, 0, 0, 0, 1, 1,
            0, 0, 0, 0, 0, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1
        ],
        outputs: [0, 0, 1]
    }
];

for (var i = 0; i < 3; i++) {
    neuralNetwork.train(numbers, {
        maxTrainIteration: 20000,
        permissibleError : 0.005
    });
}

console.log('normal 3');
console.log(neuralNetwork.run([
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1
]));

console.log('normal 2');
console.log(neuralNetwork.run([
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0,
    1, 1, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1
]));

console.log('normal 1');
console.log(neuralNetwork.run([
    0, 0, 0, 0, 0, 1, 1, 1,
    0, 0, 0, 0, 1, 1, 1, 1,
    0, 0, 0, 1, 1, 0, 1, 1,
    0, 0, 1, 1, 0, 0, 1, 1,
    0, 1, 1, 0, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 1
]));

console.log('not normal 1');
console.log(neuralNetwork.run([
    0, 0, 1, 0, 0, 1, 1, 1,
    0, 1, 0, 0, 1, 1, 1, 1,
    0, 0, 0, 0, 1, 0, 1, 1,
    0, 0, 1, 1, 0, 0, 1, 1,
    0, 1, 1, 0, 0, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 1, 0, 0, 0, 1, 1,
    0, 0, 1, 0, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 1
]));

console.log('not normal 2');
console.log(neuralNetwork.run([
    1, 0, 1, 1, 1, 1, 1, 0,
    1, 1, 1, 0, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 0,
    1, 1, 0, 1, 0, 0, 0, 0,
    1, 1, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 1, 0, 1, 1
]));