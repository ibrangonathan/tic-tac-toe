import e from 'express'
import auth_guardMiddleware from '../middlewares/auth.middleware.js'
import { update_profile_image, update_profile } from '../controllers/user.controller.js'

const router = e.Router()

router.post("/update-profile", auth_guardMiddleware, update_profile)
router.post("/update-profile-image", auth_guardMiddleware, update_profile_image)

export default router