import { upload } from "../../fileUploader"
import { addNewPost } from "../controller/postController"
import { loginRequired } from "../controller/userController"


export const postRoutes = (app) => {
    app.route("/api/posts")
        .post(loginRequired, upload.single('image'), addNewPost);
}