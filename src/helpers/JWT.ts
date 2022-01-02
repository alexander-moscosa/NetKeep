import jwt from 'jsonwebtoken';

class JWT {

    public static sign( payload: any, seed: string, expiration: string ): string {
        const token: string = jwt.sign({
            payload
        }, seed, ( {expiresIn: expiration } ));

        return token;
    }

}

export default JWT;