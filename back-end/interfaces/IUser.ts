interface IUser {
    _id: string;
    name: string;
    avatar?: string;
    email: string;
    password: string;
    passwordConfirm: string | undefined;
    role: string;
    passwordResetToken: string | undefined;
    passwordResetExpires: Date | undefined;
    passwordChangeAt: Date;
    correctPassword(
        duplicatePassword: string,
        password: string,
    ): Promise<boolean>;
    verifyPasswordChanged(JWTTimeCreate: number): boolean;
    createPasswordResetToken(): string;
}
export default IUser;
