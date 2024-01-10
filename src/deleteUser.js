// handlers/deleteUserById.js
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Users';
const User = require('../src/models/Users');

module.exports.deleteUser = async (event) => {
  try {

    const userId = event.pathParameters.id;
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: userId,
      },
    };

    await dynamoDB.delete(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success', message: 'Usuario eliminado correctamente' }),
    };
  } catch (error) {
    console.error('Error al eliminar usuario por ID:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', error: 'Error interno del servidor' }),
    };
  }
};
