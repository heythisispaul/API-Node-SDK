 /** After you add this information, type "npm test" in your console.
 */

const config = {
    ENVIRONMENT: 'https://qa1.qa.xvia.com:443',
    USERNAME: 'ander.murane+aa@trackvia.com',
    PASSWORD: 'Test1234!',
    API_KEY: '34537dee44824d2335463f725e29216b',
    ACCESS_TOKEN: 'uVevWbpF/Kp8tCe9H4f/w5uijNpaDIlAw7po1NZUlcgG8HOTtUS5+oP8eCiWPcJHUSy8M3t61QWzZZBjcTMNiHaYPwYW9m5MEn8fvNUKD2le2HYA3K2bEHAvx4hv+7kWrKS97wsMlzwxnAnZiAs++znVpOyDrWdurHn9zo9G5MlJpyMcrhBFkQ//orB7hTGcGNFKvKOF3X9/Mf6EZ4YCK6sQvII1e/s8/+EeqHJGa+ECUDYCJWXhVzWN0Vvy8zin',
    ACCOUNT_ID:7697,
    APP_ID: 70,
    APP_NAME: 'TEST APP',
    TABLE_ID: 402,
    SINGLE_LINE_FIELD_NAME: 'SINGLE LINE TEST',
    DOCUMENT_FIELD_NAME: 'DOCUMENT TEST',
    VIEW_ID: 777,
    VIEW_NAME: 'Default TEST TABLE View'
};
;  
module.exports = config;

/**
 * Endpoints not yet in SDK and therefore not currently tested:
 * POST /openapi/views/{viewId}/records/create_one (RECORDS, create a record with a file to the given field name)
 * GET /openapi/integrations (INTEGRATIONS, get all integrations)
 * GET /openapi/integrations/{microserviceId}/invoke (INTEGRATIONS, invoke an integration with a GET)
 * POST /openapi/integrations/{microserviceId}/invoke (INTEGRATIONS, invoke an integration with a POST, can be multi-part or JSON)
 */
