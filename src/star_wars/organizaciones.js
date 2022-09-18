const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const crearOrganizacion = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const { nombre, descripcion } = JSON.parse(event.body);
        const creado = new Date();
        const id = v4();

        const nuevaOrganizacion = {
            id,
            nombre,
            descripcion,
            creado
        }

        await dynamodb.put({
            TableName: 'OrganizacionesSWTable',
            Item: nuevaOrganizacion
        }).promise();

        return {
            status: 200,
            body: nuevaOrganizacion
        }
    } catch (err){
        return {
            status: 500,
            body: {
                message: err.message
            }
        }
    }
}

const obtenerOrganizaciones = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const resultado = await dynamodb.scan({
            TableName: 'OrganizacionesSWTable',
        }).promise();

        const organizaciones = resultado.Items;

        return {
            status: 200,
            body: organizaciones
        }
    } catch (err){
        return {
            status: 500,
            body: {
                message: err.message
            }
        }
    }
}

const obtenerOrganizacion = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;

        const resultado = await dynamodb.get({
            TableName: 'OrganizacionesSWTable',
            Key: {
                id
            }
        }).promise();

        const organizacion = resultado.Item;

        return {
            status: 200,
            body: organizacion
        }
    } catch (err){
        return {
            status: 500,
            body: {
                message: err.message
            }
        }
    }
}

const actualizarOrganizacion = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;
        const { nombre, descripcion } = JSON.parse(event.body);

        const resultado = await dynamodb.update({
            TableName: 'OrganizacionesSWTable',
            Key: {
                id
            },
            UpdateExpression: "set nombre = :nombre, descripcion = :descripcion",
            ExpressionAttributeValues: {
                ":nombre": nombre,
                ":descripcion": descripcion
            },
            ReturnValues: "ALL_NEW"
        }).promise();

        return {
            status: 200,
            body: {
                message: "Organización actualizada correctamente"
            }
        }
    } catch (err){
        return {
            status: 500,
            body: {
                message: err.message
            }
        }
    }
}

const eliminarOrganizacion = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;

        const resultado = await dynamodb.delete({
            TableName: 'OrganizacionesSWTable',
            Key: {
                id
            }
        }).promise();

        return {
            status: 200,
            body: {
                message: "Organización eliminada"
            }
        }
    } catch (err){
        return {
            status: 500,
            body: {
                message: err.message
            }
        }
    }
}

module.exports = {
    crearOrganizacion,
    obtenerOrganizaciones,
    obtenerOrganizacion,
    actualizarOrganizacion,
    eliminarOrganizacion
}