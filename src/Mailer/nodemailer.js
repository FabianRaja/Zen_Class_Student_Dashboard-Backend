//importing createTransport from nodemailer to send mail's
import { createTransport } from "nodemailer";

//creating transport and adding the sender informations
export const transport=createTransport({
    service:"gmail",
    auth:{
        user:"fullstackpurpose@gmail.com",
        pass:"dmuh pnrp ajxi pdtk"
    }
});