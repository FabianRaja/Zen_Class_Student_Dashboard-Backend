import { createTransport } from "nodemailer";

export const transport=createTransport({
    service:"gmail",
    auth:{
        user:"fullstackpurpose@gmail.com",
        pass:"dmuh pnrp ajxi pdtk"
    }
});