import * as bcrypt from 'bcrypt';

export class BcryptPassword{
    static async password(password: { plainPassword: string, encryptedPassword: string }): Promise<any> {
        return new Promise(((resolve, reject) => {
            bcrypt.compare(password.plainPassword, password.encryptedPassword, ((err, isSame) => {
                if (err) {
                    reject(err);
                } else if (!isSame) {
                    reject(new Error('User and Password Does not Match'));
                } else {
                    resolve(true);
                }
            }))
        }))
    }
}