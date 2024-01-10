'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Bienvenidos a API Rest usuarios Por Denilson Rios!!!',
        input: event,
      },
      null,
      2
    ),
  };
};
