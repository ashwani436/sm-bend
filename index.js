import express from 'express';
import { connectToMongoDB } from './src/config';
import { userRoutes } from './src/routes/userRoutes';
import jwt, { decode } from 'jsonwebtoken';
import { postRoutes } from './src/routes/postRoutes';

const app = express();
const PORT = 4010;
connectToMongoDB();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// for hosting static files
app.use('/files/img', express.static('uploads/images'));


const jwtParser = (req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        jwt.verify(req.headers.authorization.split(" ")[1], "SOME_SECRET_KEY", (err, decoded) => {
            if (err) {
                req.authUser = undefined
            }

            req.authUser = decoded;
            console.log(decoded);
            next();
        })
    } else {
        req.authUser = undefined;
        next();
    }


}

app.use(jwtParser);


userRoutes(app);
postRoutes(app);

app.get("/api/welcome", (req, res) => {
    res.status(200).json({message : "Hi! welcome to our social media API"});
})

app.listen(PORT);