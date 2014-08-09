(function(systems) {
    systems.MovementSystem = require('./movement.system');
    systems.DeathSystem = require('./death.system');
    systems.DecisionSystem = require('./decision.system');
    systems.NodeSystem = require("./node.system");
})(module.exports);