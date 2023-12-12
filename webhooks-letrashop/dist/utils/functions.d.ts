/**
 * Verifica se o webhook é válido
 * @param data O corpo da solicitação
 * @param hmacHeader O cabeçalho HMAC
 * @returns {boolean} Se o webhook é válido
 **/
export declare function verifyWebhook(data: any, hmacHeader: any): boolean;
export declare function handleOAuth(authorizationCode: string): Promise<any>;
