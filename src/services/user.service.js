import User from "../models/user.model.js"
import generateToken from "../utils/generateToken.js"

//@desc     Get Auth User
//@route    POST /api/users/login
//@access   Public

//@desc     Register User
//@route    POST /api/users/register
//@access   Public

//@desc     Get User Details
//@route    GET /api/users/:id
//@access   Private

//@desc     Update User
//@route    PUT /api/users/:id
//@access   Private

//@desc     Delete an User
//@route    DELETE /api/users/:id
//@access   Private