const getComponents = require('../automations/example-2');

module.exports = {
  async list(req, res) {
    const components = await getComponents();
    return components.length > 0 ? res.status(200).json(components) : res.status(204);
  }
}