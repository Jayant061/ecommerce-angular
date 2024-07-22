import { Injectable } from "@angular/core";
const savedUsers = "SavedUsers"
const currentUser = "CurrentUser"
@Injectable({
    providedIn:"root"
})
export class AuthService{

    signup(formData:User){
    let users:User[] = []
    const savedData = localStorage.getItem(savedUsers); 
    if(savedData){
        users = JSON.parse(savedData);
    }
    const user = users.find(user=>user.email === formData.email);
    if(user){
        return 409;
    }
    users.push(formData);
    localStorage.setItem(savedUsers,JSON.stringify(users))
    localStorage.setItem(currentUser,JSON.stringify(formData));
    return 200;
    }
    signin(formData:signinData){
        let users:User[] = [];
        const data = localStorage.getItem(savedUsers);
        if(data){
            users = JSON.parse(data);
            const user = users.find(user=>user.email === formData.email)
            if(user){
                if(user.password === formData.password){
                    localStorage.setItem(currentUser,JSON.stringify(user))
                    return 200;
                };
                return 401
            }
        }
        return 404;
    }
    logout(){
        localStorage.removeItem(currentUser);
        return 200;
    }
    currentUser(){
        const user = localStorage.getItem(currentUser);
        if(user){
            const currUser = JSON.parse(user);
            return currUser.email;
        }
        return null;
    }
    user(){
        const user = localStorage.getItem(currentUser);
        if(user){
            const currUser = JSON.parse(user);
            return currUser;
        }
    }
}

export type User = {
    name:string,
    email:string,
    gender:string,
    password:string,
    phone:string
}
export type signinData = {
    email:string,
    password:string
}