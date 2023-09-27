declare const AuthJwtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AuthJwtGuard extends AuthJwtGuard_base {
    handleRequest(err: any, user: any, info: any): any;
}
export {};
