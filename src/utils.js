import bcrypt from 'bcrypt';

export const errorHandler = (err, res, code = 500) => {
    if(err) {
        res.status(code).json({error: err});
    }
}

export const successHandler = (data, res, code) => {
        res.status(code).json(data);
}

export const hashItUp = async (pass) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);
    return hashedPassword;
}