import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    APIGatewayProxyHandler,
} from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { deleteTodo } from '../../businessLogic/todos';
import { createLogger } from '../../utils/logger';

const logger = createLogger('deleteTodoHandler');

const deleteTodoHandler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    logger.info('Delete a todo', event);

    const todoId = event.pathParameters.todoId;
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];

    await deleteTodo(todoId, jwtToken);

    return {
        statusCode: 204,
        //https://serverless.com/blog/cors-api-gateway-survival-guide/#cors-preflight-requests
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: '',
    };
};

export const handler = middy(deleteTodoHandler).use(
    cors({ credentials: true }),
);
