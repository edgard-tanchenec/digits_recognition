var Neuron = require('./neuron');
var Relation = require('./relation');

var Layer = function () {

    this.initialize = function (options) {
        this.neurons = [];
        this.index = options.layerIndex;

        this.setNeurons(options.neuronCount);
    };

    this.setNeurons = function (neuronCount) {
        var i;

        for (i = 0; i < neuronCount; i++) {
            this.neurons.push(new Neuron({
                layerIndex: this.index,
                index     : i
            }));
        }
    };

    this.connectToLayer = function (forConnectionLayer) {
        var self = this;

        this.neurons.forEach(function (fromNeuron, fromNeuronIndex) {
            forConnectionLayer.neurons.forEach(function (toNeuron, toNeuronIndex) {
                var relation = new Relation({
                    fromNeuronConfig: {
                        neuron          : fromNeuron,
                        neuronIndex     : fromNeuronIndex,
                        neuronLayerIndex: self.index
                    },
                    toNeuronConfig: {
                        neuron          : toNeuron,
                        neuronIndex     : toNeuronIndex,
                        neuronLayerIndex: forConnectionLayer.index
                    }
                });

                fromNeuron.setFromRelation(relation);
                toNeuron.setToRelation(relation);
            });
        });
    };

    this.run = function (inputs) {
        this.neurons.forEach(function (neuron, neuronIndex) {
            if (neuron.toRelations.length) {
                neuron.run();
            } else {
                neuron.run(inputs[neuronIndex]);
            }
        });
    };

    this.calculateError = function (expectedOutputs) {
        this.neurons.forEach(function (neuron, neuronIndex) {
            if (expectedOutputs) {
                neuron.calculateError(expectedOutputs[neuronIndex]);
            } else {
                neuron.calculateError();
            }
        });
    };

    this.correctWeight = function () {
        this.neurons.forEach(function (neuron) {
            neuron.correctWeight();
        });
    };

    this.fromJSON = function (layerJSON) {
        this.neurons.forEach(function (neuron, neuronIndex) {
            neuron.fromJSON(layerJSON[neuronIndex]);
        });
    };

    this.toJSON = function () {
        var json = [];

        this.neurons.forEach(function (neuron) {
            json.push(neuron.toJSON());
        });

        return json;
    };
};

module.exports = function (options) {
    var layer = new Layer();

    layer.initialize(options || {});

    return layer;
};
