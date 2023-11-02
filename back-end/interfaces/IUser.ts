interface IUser {
    _id: string;
    name: string;
    avatar?: string;
    email: string;
    password: string;
    passwordConfirm: string | undefined;
    role: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    passwordChangeAt: Date;
    correctPassword(
        duplicatePassword: string,
        password: string,
    ): Promise<boolean>;
}
export default IUser;
