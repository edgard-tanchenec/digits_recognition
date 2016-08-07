var _ = require('lodash');
var fs = require('fs');
var csv = require('csv-parser');
var NeuralNetwork = require('./modules/neuralNetwork');
var neuralNetwork = new NeuralNetwork({
    layersConfig: [784, 300, 10],
    connection  : 'allToAll'
});

var readStream = fs.createReadStream('train.csv');
var errors = [];

readStream.pipe(csv())
    .on('data', function (imageData) {
        var outputs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var iteration;
        var error;

        outputs[imageData.label] = 1;

        delete imageData.label;

        imageData = _.values(imageData);

        iteration = neuralNetwork.train([
            {
                inputs : imageData,
                outputs: outputs
            }
        ], {
            maxTrainIteration: 20000,
            permissibleError : 0.005
        });

        error = neuralNetwork.getError();
        console.log(iteration);
        console.log(error);
        errors.push(error);
    })
    .on('end', function () {
        var json = neuralNetwork.toJSON();

        console.log(json);
        console.log('');
        console.log(errors);

        fs.writeFile('./network.json', JSON.stringify(json), function (err) {
            if (err) {
                console.log(err);
            }

            console.log('json was saved');
        });
    });