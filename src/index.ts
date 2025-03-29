import app from "./server/server";
import "dotenv/config";

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server running on port ${port}`));
