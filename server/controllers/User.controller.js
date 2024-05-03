class UserController {
    registration (req, res, next) {

    }
    login (req, res, next) {

    }
    auth (req, res, next) {
        res.status(200).json({messg: "is working!"})
    }
}

module.exports = new UserController;