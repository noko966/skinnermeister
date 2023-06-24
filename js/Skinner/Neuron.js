var cuid = require('cuid');

function Neuron(bias) {
    this.id = cuid();

    this.bias = bias == undefined ? Math.random() * 2 - 1 : bias;
    this.squash;
    this.cost;

    this.incoming = {
        targets: {}, //new Map(),
        weights: {} //new Map()
    }
    this.outgoing = {
        targets: {}, // new Map(),
        weights: {} // new Map()
    }

    this._output; // f'(x)
    this.output; // f(x)

    this._error;// E(f(x))
    this.error; // E'(f(x))


    this.connect = function (neuron, weight) {
        this.outgoing.targets[neuron.id] = neuron;
        neuron.incoming.targets[this.id] = this;
        this.outgoing.weights[neuron.id] = neuron.incoming.weights[this.id] = weight == undefined ? Math.random() * 2 - 1 : weight;
    }

    this.activate = function (input) {
        const self = this;

        function sigmoid(x) { return 1 / (1 + Math.exp(-x)) } // f(x)
        function _sigmoid(x) { return sigmoid(x) * (1 - sigmoid(x)) } // f'(x)

        if (input != undefined) {
            this._output = 1; // f'(x)
            this.output = input; // f(x)
        } else {
            // Σ (x • w)
            const sum = Object.keys(this.incoming.targets).reduce(function (total, target, index) {
                return total += self.incoming.targets[target].output * self.incoming.weights[target];
            }, this.bias);

            this._output = _sigmoid(sum); // f'(x)
            this.output = sigmoid(sum); // f(x)
        }

        return this.output;
    }

    this.propagate = function (target, rate = 0.3) {
        const self = this;

        //𝛿E /𝛿squash
        const sum = target == undefined ? Object.keys(this.outgoing.targets).reduce(function (total, target, index) {
            // Δweight
            self.outgoing.targets[target].incoming.weights[self.id] = self.outgoing.weights[target] -= rate * self.outgoing.targets[target].error * self.output;

            return total += self.outgoing.targets[target].error * self.outgoing.weights[target];
        }, 0) : this.output - target;

        // 𝛿squash/𝛿sum
        this.error = sum * this._output

        // Δbias
        this.bias -= rate * this.error;

        return this.error;
    }
}


function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
    ] : null;
}


const dataset = [
    { inputs: hexToRgb('#000000'), outputs: [1] },
    { inputs: hexToRgb('#696969'), outputs: [1] },
    { inputs: hexToRgb('#808080'), outputs: [1] },
    { inputs: hexToRgb('#A9A9A9'), outputs: [0] },
    { inputs: hexToRgb('#C0C0C0'), outputs: [0] },
    { inputs: hexToRgb('#D3D3D3'), outputs: [0] },
    { inputs: hexToRgb('#DCDCDC'), outputs: [0] },
    { inputs: hexToRgb('#F5F5F5'), outputs: [0] },
    { inputs: hexToRgb('#FFFFFF'), outputs: [0] },
    { inputs: hexToRgb('#009900'), outputs: [1] },
    { inputs: hexToRgb('#f14100'), outputs: [1] },
    { inputs: hexToRgb('#00FF00'), outputs: [0] },
    { inputs: hexToRgb('#333333'), outputs: [1] },
    { inputs: hexToRgb('#2b2b2b'), outputs: [1] },
    { inputs: hexToRgb('#e6e6e6'), outputs: [0] },
    { inputs: hexToRgb('#ffffff'), outputs: [0] },
    { inputs: hexToRgb('#d6d6d6'), outputs: [0] },
    { inputs: hexToRgb('#d7d7d7'), outputs: [0] },
    { inputs: hexToRgb('#c3c3c3'), outputs: [0] },
    { inputs: hexToRgb('#adadad'), outputs: [0] },
    { inputs: hexToRgb('#c0d8b8'), outputs: [0] },
    { inputs: hexToRgb('#b8d8c7'), outputs: [0] },
    { inputs: hexToRgb('#faff85'), outputs: [0] },
    { inputs: hexToRgb('#f1d169'), outputs: [0] },
    { inputs: hexToRgb('#85f1ff'), outputs: [0] },
    { inputs: hexToRgb('#000000'), outputs: [1] },
    { inputs: hexToRgb('#ffb700'), outputs: [0] },

];

const inputs = [new Neuron(), new Neuron(), new Neuron()]; // Input Layer w/ 3 neurons
const hiddens = [new Neuron(), new Neuron(), new Neuron(), new Neuron(), new Neuron(), new Neuron()]; // Hiddent Layer w/ 6 neurons
const outputs = [new Neuron()]; // Output Layer w/ 1 neuron

// Connect Input Layer to Hidden Layer
inputs[0].connect(hiddens[0]);
inputs[0].connect(hiddens[1]);
inputs[0].connect(hiddens[2]);
inputs[0].connect(hiddens[3]);
inputs[0].connect(hiddens[4]);
inputs[0].connect(hiddens[5]);

inputs[1].connect(hiddens[0]);
inputs[1].connect(hiddens[1]);
inputs[1].connect(hiddens[2]);
inputs[1].connect(hiddens[3]);
inputs[1].connect(hiddens[4]);
inputs[1].connect(hiddens[5]);

inputs[2].connect(hiddens[0]);
inputs[2].connect(hiddens[1]);
inputs[2].connect(hiddens[2]);
inputs[2].connect(hiddens[3]);
inputs[2].connect(hiddens[4]);
inputs[2].connect(hiddens[5]);

// Connect Hidden Layer to Output Layer
hiddens[0].connect(outputs[0]);
hiddens[1].connect(outputs[0]);
hiddens[2].connect(outputs[0]);
hiddens[3].connect(outputs[0]);
hiddens[4].connect(outputs[0]);
hiddens[5].connect(outputs[0]);

const activate = (input) => {
    inputs.forEach((neuron, i) => neuron.activate(input[i]));
    hiddens.forEach(neuron => neuron.activate());
    return outputs.map(neuron => neuron.activate());
};

const propagate = (target) => {
    outputs.forEach((neuron, t) => neuron.propagate(target[t]));
    hiddens.forEach(neuron => neuron.propagate());
    return inputs.forEach(neuron => neuron.propagate());
};

const train = (iterations = 1) => {
    while (iterations > 0) {
        dataset.map(datum => {
            activate(datum.inputs);
            propagate(datum.outputs);
        });
        iterations--;
    }
};

// Train Network (10,000 Iterations)
train(10000);

function guessVisibleColor(hex) {
    if (!hex) {
        console.error(`not valid hex format provided`);
    }
    let temp = activate(hexToRgb(hex));
    // console.log(temp);
    return temp > .5 ? "#fff" : "#000";
}


module.exports = guessVisibleColor;







