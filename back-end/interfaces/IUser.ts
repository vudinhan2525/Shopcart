interface IUser {
    name: string;
    avatar?: string;
    email: string;
    password: string;
    passwordConfirm: string;
    role: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    passwordChangeAt: Date;
}
export default IUser;
