import * as bcrypt from 'bcrypt';

export class EncryptPassword{
    static password(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, password) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(password);
                }
            })
        })
    }
}