class UserController {
    registration (req, res) {

    }
    login (req, res) {

    }
    auth (req, res) {
        res.status(200).json({messg: "is working!"})
    }
}

module.exports = new UserController;