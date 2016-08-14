var fs = require('fs');
var mnist = require('mnist');
var NeuralNetwork = require('./modules/neuralNetwork');
var neuralNetwork = new NeuralNetwork({
    layersConfig: [784, 300, 10],
    connection  : 'allToAll'
});
var testExamples = 1000;

fs.readFile('./network.json', function (err, data) {
    var set = mnist.set(0, testExamples);
    var testingSet = set.test;
    var failCount = 0;
    var jsonData;

    if (err) {
        return console.log(err);
    }

    jsonData = JSON.parse(data);

    neuralNetwork.fromJSON(jsonData);

    testingSet.forEach(function (digit, iteration) {
        var networkResponseArray = neuralNetwork.run(digit.input);
        var trueResponseArray = digit.output;
        var trueResponseDigit = trueResponseArray.indexOf(1);
        var networkResponseDigit = networkResponseArray.indexOf(Math.max.apply(null, networkResponseArray));

        if (trueResponseDigit !== networkResponseDigit) {
            failCount ++;
        }

        console.log('iteration: ' + iteration);
        console.log('true response: ' + trueResponseDigit);
        console.log('network response: ' + (trueResponseDigit === networkResponseDigit));
    });

    console.log('testExamples: ' + testExamples);
    console.log('failCount: ' + failCount);
});
