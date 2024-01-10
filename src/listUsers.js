const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Users'; 
const User = require('../src/models/Users');

module.exports.listUsers = async () => {
  try {

    const params = {
      TableName: TABLE_NAME,
    };

    const result = await dynamoDB.scan(params).promise();
 
    const users = result.Items.map(item => new User(item.id, item.nombre, item.cedula));

    return {
      statusCode: 200,
      body: JSON.stringify({ statusCode: 200, status: 'success', users }),
    };
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ statusCode: 500, status: 'error', error: 'Error interno del servidor' }),
    };
  }
};
