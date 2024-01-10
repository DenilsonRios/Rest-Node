const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Users'; 
const User = require('../src/models/Users');

module.exports.updateUser = async (event) => {
  try {
    const userId = event.pathParameters.id;

  
    const requestBody = JSON.parse(event.body);
    const { nombre, cedula } = requestBody;

    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: userId,
      },
      
      UpdateExpression: 'set nombre = :nombre, cedula = :cedula',
      ExpressionAttributeValues: {
        ':nombre': nombre,
        ':cedula': cedula,
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await dynamoDB.update(params).promise();

    if (!result.Attributes) {
      return {
        statusCode: 404,
        body: JSON.stringify({statusCode: 404, status: 'error', error: 'Usuario no encontrado' }),
      };
    }

    const updatedUser = new User(result.Attributes.id, result.Attributes.nombre, result.Attributes.cedula);

    return {
      statusCode: 200,
      body: JSON.stringify({statusCode: 200, status: 'success', user: updatedUser }),
    };
  } catch (error) {
    console.error('Error al actualizar usuario por ID:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', error: 'Error interno del servidor' }),
    };
  }
};
