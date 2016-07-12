var Relation = function () {

    this.initialize = function (options) {
        this.fromNeuronData = options.fromNeuronConfig;
        this.toNeuronData = options.toNeuronConfig;
        this.change = 0;
        this.weight = Math.random() * 0.4 - 0.2;
    };

    this.setWeight = function (learningRate, delta, momentum) {
        this.change = (learningRate * delta * this.fromNeuronData.neuron.lastOutputSignal) + (this.change * momentum);
        this.weight += this.change;
    };

    this.run = function () {
        return this.fromNeuronData.neuron.lastOutputSignal * this.weight;
    };
};

module.exports = function (options) {
    var relation = new Relation();

    relation.initialize(options || {});

    return relation;
};
