import express from "express"
import { check_auth, signin, signout, signup } from "../controllers/auth.controller.js"
import auth_guardMiddleware from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/signout", auth_guardMiddleware, signout)

router.get("/check", auth_guardMiddleware, check_auth)

export default router