class UserService {
    constructor(userModel) {
        this.userModel = userModel
    }

    getAllUsers = async () => {
        const allUsers = await this.userModel.findAll();
        if (!allUsers) return {error: "No user found", data: null}
        else {
            return {error: null, data: allUsers}
        }
    }
    createUser = async (userData) => {
        const newUser = await this.userModel.create(userData);
        if (!newUser) return {error: "Error adding user", data: null}
        else {
            return {error: null, data: newUser}
        }
    }
    deleteUser = async (name) => {
        const deleteUser = await this.userModel.destroy({
            where: {
                name: name
            }
        })
        if (!deleteUser) return {error: "error deleting user", data: null}
        return {error: null, data: "User deleted Successfully"}
    }
    updateUser = async (name,updateParams) =>{
        const userUpdate = await this.userModel.update(updateParams,{
            where:{
                name: name
            }
        })
        if(userUpdate.includes(0)) return {error:"Error updating user",data:null}
        else{
            return {error:null,data:"Successfully updated user"}
        }
    }
}

module.exports = UserService