import app from "./app.js";
import { connectDB } from "./db.js";
import { hayAdministrador } from "./create-admin.js";

connectDB();
hayAdministrador();
app.listen(4000);
console.log("Server on port", 4000);
