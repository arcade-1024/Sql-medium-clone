class UserController {
    constructor(userModel, userService) {
        this.userService = userService;
        this.userModel = userModel
    }

    getUser = async (req, res) => {
        try {
            const {data,error} = await this.userService.getAllUsers();
            if (error) throw "No user found"
            else{
                res.send({data})
            }
        } catch (e) {
            res.status(404).send({"error": e})
        }
    }

    createUser = async (req, res) => {
        try {
            const {data, error} = await this.userService.createUser(req.body)
            if (error) {
                throw error
            } else {
                res.send({data})
            }
        } catch (e) {
            res.status(404).send({"error": e})
        }
    }

    deleteUser = async (req, res) => {
        try {
            const name = req.params.name
            const {data, error} = await this.userService.deleteUser(name);
            if (error) throw  error
            else {
                res.send({data})
            }
        } catch (e) {
            res.status(404).send({"error": e})
        }
    }

    updateUser = async (req,res) =>{
        const userName = req.params.name;
        try{
            const {data,error} = await this.userService.updateUser(userName,req.body);
            if(error) throw error;
            else{
                res.send({data})
            }
        }catch (e) {
            res.status(404).send({error:e})
        }
    }
    getUserByName = async (req,res) =>{
        const name = req.params.name
        try{
            const {data,error} = await this.userService.getByName(name)
            if(error) throw error;
            else{
                res.send({data})
            }
        }catch (e) {
            res.status(404).send({error:e})
        }
    }
    initializeRouter = () => {
        return {
            rootRoute: "/api/users",
            routes: [
                {
                    route: "/",
                    method: "GET",
                    middleware: [],
                    function: this.getUser,
                },
                {
                    route: "/:name",
                    method: "GET",
                    middleware: [],
                    function: this.getUserByName,
                },
                {
                    route: "/",
                    method: "POST",
                    middleware: [],
                    function: this.createUser,
                },
                {
                    route: "/:name",
                    method: "DELETE",
                    middleware: [],
                    function: this.deleteUser,
                },
                {
                    route: "/:name",
                    method: "PATCH",
                    middleware: [],
                    function: this.updateUser,
                }
            ]

        }
    }
}

module.exports = UserController;