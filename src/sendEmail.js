const AWS = require('aws-sdk');
const sns = new AWS.SNS();

module.exports.sendEmail = async (event) => {
  try {

    const {userId} = JSON.parse(event.body);
    const message = `Hola,\n\nSe ha creado un nuevo usuario con ID: ${userId}`;

    
    const params = {
      Message: message,
      Subject: 'Nuevo Usuario Creado',
      TopicArn: 'arn:aws:sns:us-east-1:774072272771:UserSNSNotification',
    };

    await sns.publish(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({statusCode: 200, status: 'success', message: 'Correo electrónico enviado correctamente' }),
    };
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({statusCode: 500, status: 'error', error: 'Error interno del servidor' }),
    };
  }
};
