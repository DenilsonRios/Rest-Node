const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Users';
const User = require('../src/models/Users');

module.exports.getUser = async (event) => {
  try {
    const userId = event.pathParameters.id;
    
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: userId,
      },
    };

    const result = await dynamoDB.get(params).promise();

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ statusCode: 404, status: 'error', error: 'Usuario no encontrado' }),
      };
    }

    const user = new User(result.Item.id, result.Item.nombre, result.Item.cedula);

    return {
      statusCode: 200,
      body: JSON.stringify({statusCode: 200,  status: 'success', user }),
    };
  } catch (error) {
    console.error('Error al obtener usuario por cédula:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({statusCode:500, status: 'error', error: 'Error interno del servidor' }),
    };
  }
};
