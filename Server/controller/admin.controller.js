import Admin from '../model/admin.model.js'

const addAdmin = async (req, res) => {
    
    const admin = new Admin({
        "email": "admin@gmail.com",
        "password": "administrator"
    });
    
    try{
        await admin.save()
        console.log('admin added successfully')
    } catch(error){
        console.error("admin.controller: ", error);
    }
}

export default addAdmin;