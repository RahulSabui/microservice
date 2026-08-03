import authClient from "./auth.client";

export class AuthServiceClient {

    async getUser(userId: number) {

        const response = await authClient.get(
            `/internal/users/${userId}`
        );

        return response.data;
    }

}