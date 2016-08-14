var fs = require('fs');
var mnist = require('mnist');
var NeuralNetwork = require('./modules/neuralNetwork');
var neuralNetwork = new NeuralNetwork({
    layersConfig: [784, 300, 10],
    connection  : 'allToAll'
});

var set = mnist.set(5000, 0);
var trainingSet = set.training;
var json;

trainingSet.forEach(function (digit, iteration) {
    var iterationToRecognize;
    var error;

    iterationToRecognize = neuralNetwork.train([
        {
            inputs : digit.input,
            outputs: digit.output
        }
    ], {
        maxTrainIteration: 20000,
        permissibleError : 0.005
    });

    error = neuralNetwork.getError();

    console.log('iteration to recognize: ' + iterationToRecognize);
    console.log('error: ' + error);
    console.log('iteration: ' + iteration);
});

json = neuralNetwork.toJSON();

fs.writeFile('./network.json', JSON.stringify(json), function (err) {
    if (err) {
        console.log(err);
    }

    console.log('json was saved');
});
