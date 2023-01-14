import axios from "axios";
export default function UserAuth(){
    const http=axios.create({
        baseURL:"https://frontend-test-api.aircall.io",
        headers:{
            "Content-Type":"application/json"
        }
    });
    return{
        http
    }
}