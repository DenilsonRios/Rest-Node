const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'Users';
const User = require('../src/models/Users');

module.exports.addUser = async (event) => {
  try { 
    const requestBody = JSON.parse(event.body);
    const { nombre, cedula } = requestBody;
    const id = uuid.v4();
    const newUser = new User(id, nombre, cedula);
    
    const params = {
      TableName: TABLE_NAME,
      Item: {
        id: newUser.id,
        nombre: newUser.nombre,
        cedula: newUser.cedula,
      },
    };

    await dynamoDB.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({statusCode:200, status: 'success', message: 'Usuario agregado exitosamente' }),
    };
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({statusCode:500, status: 'Error', error: 'Error interno del servidor' }),
    };
  }
};
