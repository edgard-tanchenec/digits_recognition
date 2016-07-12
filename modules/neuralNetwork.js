var Layer = require('./layer');

var NeuralNetwork = function () {
    this.initialize = function (options) {
        this.layers = [];

        this.setLayers(options.layersConfig);

        if (options.connection === 'allToAll') {
            this.setRelationAllToAll();
        }
    };

    this.setRelationAllToAll = function () {
        var self = this;

        this.layers.forEach(function (selfLayer) {
            var nextLayer = self.layers[selfLayer.index + 1];

            if (nextLayer) {
                selfLayer.connectToLayer(nextLayer);
            }
        });
    };

    this.setLayers = function (layersConfig) { // [2,1]
        var self = this;

        layersConfig.forEach(function (neuronCount, layerIndex) {
            var layer = new Layer({
                neuronCount: neuronCount,
                layerIndex : layerIndex
            });

            self.layers.push(layer);
        });
    };

    this.run = function (inputs, notReturnOuyputs) {
        var result = [];
        var lastLayer;

        this.layers.forEach(function (layer) {
            layer.run(inputs);
        });

        if (!notReturnOuyputs){
            lastLayer = this.getLastLayer();

            lastLayer.neurons.forEach(function (neuron) {
                result.push(neuron.lastOutputSignal);
            });

            return result;
        }
    };

    this.calculateError = function (expectedOutputs) {
        this.layers.reverse();

        this.layers.forEach(function (layer, layerIndex) {
            if (layerIndex) {
                layer.calculateError();
            } else {
                layer.calculateError(expectedOutputs);
            }
        });

        this.layers.reverse();
    };

    this.correctWeight = function () {
        this.layers.forEach(function (layer) {
            layer.correctWeight();
        });
    };

    this.train = function (teachDataArray, options) {
        var self = this;
        var maxTrainIteration;
        var permissibleError;
        var error;
        var iterations = 0;

        options = options || {};

        maxTrainIteration = options.maxTrainIteration;
        permissibleError = options.permissibleError;

        do {
            iterations ++;

            teachDataArray.forEach(function (teachData) {
                self.run(teachData.inputs, true);
                self.calculateError(teachData.outputs);
                self.correctWeight();
            });

            error = this.getError();
        } while (error > permissibleError && iterations < maxTrainIteration);

        return iterations;
    };

    this.fromJSON = function (json) {
        this.layers.forEach(function (layer, layerIndex) {
            layer.fromJSON(json[layerIndex]);
        });
    };

    this.toJSON = function () {
        var json = [];

        this.layers.forEach(function (layer) {
            json.push(layer.toJSON());
        });

        return json;
    };

    this.getLastLayer = function () {
        return this.layers[this.layers.length - 1];
    };

    this.getError = function () { // getGlobalError
        var sum = 0;
        var lastLayer = this.getLastLayer();

        lastLayer.neurons.forEach(function (neuron) {
            sum += Math.pow(neuron.error, 2);
        });

        return sum / lastLayer.neurons.length;
    };
};

module.exports = function (options) {
    var neuralNetwork = new NeuralNetwork();

    neuralNetwork.initialize(options || {});

    return neuralNetwork;
};
