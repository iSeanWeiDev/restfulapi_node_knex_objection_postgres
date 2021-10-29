export default {
  type: 'object',
  required: [],
  properties: {
    id: { type: 'integer' },
    shopId: { type: 'integer' },
    apiTriggerId: { type: 'string' },
    type: { type: 'string' },
    metadata: { type: 'object', required: [] }
  }
};
