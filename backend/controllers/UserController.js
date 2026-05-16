const UserNumber = require("../model/UserNumberModel")
module.exports.GetUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("User ki id :", userId);

        const user = await UserNumber.findById(req.user.id);
        console.log("user ki id :" , user.id)
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json({
            success: true,
            user: {
                name: user.name,
                number: user.number,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to get profile" });
    }
};

