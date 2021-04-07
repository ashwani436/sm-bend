import { upload } from '../../fileUploader';
import { addNewUser, authenticate, confirmUser, currentUser, getAllUsers, imgUpload, loginRequired, updateDp } from '../controller/userController';

export const userRoutes = (app) => {
    app.route("/api/users/register")
        .post(addNewUser);

    // if not confirm != 1 : user is not confirmed
    app.route("/api/users/confirm/:confirmHash") 
        .put(confirmUser)

    // Ticket counter
    app.route("/api/users/login")
        .post(authenticate);

    app.route("/api/users")
        .get(loginRequired,getAllUsers);

    app.route("/api/currentUser")
        .get(loginRequired,currentUser);
    
    app.route('/api/upload/image')
        .post(upload.single('image'), imgUpload);

    app.route('/api/upload/dp')
        .put(loginRequired, upload.single('image'), updateDp)

}