var Neuron = function () {
    this.initialize = function (options) {
        this.fromRelations = [];
        this.toRelations = [];
        this.bias = Math.random() * 0.4 - 0.2;
        this.delta = 0;
        this.lastOutputSignal = 0;
        this.learningRate = 0.3;
        this.momentum = 0.1;
        this.error = 0;
        this.layerIndex = options.layerIndex;
        this.index = options.index;
    };

    this.getSigmoindDerivative = function (x) {
        return x * (1 - x);
    };

    this.getSigmoind = function (x) {
        return 1 / (1 + Math.exp(-x));
    };

    this.run = function (signal) {
        var inputStateSum = 0;

        this.lastOutputSignal = 0;

        if (this.layerIndex === 0) {
            inputStateSum += signal;

            this.lastInputStateSum = inputStateSum;
            this.lastOutputSignal = inputStateSum;
        } else {
            this.toRelations.forEach(function (relation) {
                inputStateSum += relation.run();
            });

            this.lastInputStateSum = inputStateSum;
            this.lastOutputSignal = this.getSigmoind(this.lastInputStateSum + this.bias);
        }
    };

    this.setToRelation = function (relation) {
        this.toRelations.push(relation);
    };

    this.setFromRelation = function (relation) {
        this.fromRelations.push(relation);
    };

    this.calculateError = function (expectedOutput) {
        var self = this;

        if (expectedOutput || expectedOutput === 0) {
            this.error = expectedOutput - this.lastOutputSignal;
            this.delta = this.error * this.lastOutputSignal * (1 - this.lastOutputSignal);
        } else {
            this.error = 0;

            this.fromRelations.forEach(function (relation) {
                self.error += relation.weight * relation.toNeuronData.neuron.delta;
            });

            this.delta = this.error * this.getSigmoindDerivative(this.lastOutputSignal);
        }

    };

    this.correctWeight = function () {
        var self = this;

        this.toRelations.forEach(function (relation) {
            relation.setWeight(self.learningRate, self.delta, self.momentum);
        });

        this.bias = this.learningRate * this.delta;
    };

    this.fromJSON = function (neuronJSON) {
        this.toRelations.forEach(function (relation, relationIndex) {
            relation.weight = neuronJSON.relations[relationIndex];
        });

        this.bias = neuronJSON.bias;
    };

    this.toJSON = function () {
        var json = {
            relations: [],
            bias     : this.bias
        };

        this.toRelations.forEach(function (relation) {
            json.relations.push(relation.weight);
        });

        return json;
    };
};

module.exports = function (options) {
    var neuron = new Neuron();

    neuron.initialize(options || {});

    return neuron;
};
