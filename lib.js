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

// var xorJSON = [
//     [
//         {
//             relations: [
//                 0
//             ],
//             bias: 0
//         },
//         {
//             relations: [
//                 0
//             ],
//             bias: 0
//         }
//     ],
//     [
//         {
//             relations: [
//                 -5.3020457810027395,
//                 -5.29964240467692
//             ],
//             bias: 7.9410216837903755
//         },
//         {
//             relations: [
//                 -2.7020529731425675,
//                 -2.6887870631762163
//             ],
//             bias: 3.851681222814466
//         },
//         {
//             relations: [
//                 -5.098748549084529,
//                 -5.098123850461922
//             ],
//             bias: 2.7935393093798906
//         }
//     ],
//     [
//         {
//             relations: [
//                 -8.62399409479601,
//                 -2.113291308797813,
//                 6.102876873182705
//             ],
//             bias: 5.014379416803722
//         }
//     ]
// ];

//
// console.log('iterations ' + iterations);
//
// result = neuralNetwork.run(numbersJSON[2]);
// console.log(result, 'normal 3');