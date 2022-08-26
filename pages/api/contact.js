import { MongoClient } from "mongodb";

const dbURL =
  "mongodb+srv://CheeseAdvocate:cLxgRRSLOFYLjsPl@ta-al-mdb-cluster.ypoozwp.mongodb.net/?retryWrites=true&w=majority";

async function handler(request, response) {
  if (request.method === "POST") {
    const { email, name, message } = request.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      response.status(422).json({ message: "Invalid input" });
      return;
    }

    /* Store it in a database */
    const newMessage = {
      email,
      name,
      message,
    };

    console.log(newMessage);

    let client;

    try {
      client = await MongoClient.connect(dbURL);
    } catch (e) {
      response
        .status(500)
        .json({ message: "Ahhh! Database connection failed!" });
      return;
    }

    try {
      const db = client.db();
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
      client.close();
    } catch (e) {
      client.close();
      response.status(500).json({
        message: "Database connection successful! But, interaction failed!!!",
      });
      return;
    }

    response.status(201).json({ message: "Successfully stored message!" });
  }
}

export default handler;
