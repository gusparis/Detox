const {
  ExecCommand,
  BinaryExec,
} = require('../exec/BinaryExec');

class GenyCloudCliExec extends BinaryExec {
  constructor() {
    super('gmsaas');
  }
}

class GenyCloudCommand extends ExecCommand {
  _getArgs() {
    return ['--format', 'json'];
  }
}

class GetRecipeCommand extends GenyCloudCommand {
  constructor(recipeName) {
    super();
    this.recipeName = recipeName;
  }

  _getArgs() {
    return super._getArgs().concat('recipes', 'list', '--name', `"${this.recipeName}"`)
  }
}

module.exports = {
  GenyCloudCliExec,
  GetRecipeCommand,
};
