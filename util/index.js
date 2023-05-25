const mongoose = require('mongoose');
const Metadata = require('./metadata.model');

const DB_NAME = process.env.DB_NAME || "func-app-db";
const DB_USERNAME = process.env.DB_USERNAME || "nitya-tech-cosmos";
const DB_PASSWORD = process.env.DB_PASSWORD || "p3Ak7x7loYehq7OVGaseu4Wv1gTuKSVJDlLsMB1278iXdRAHTo230WT6WMtQeSaM18bCb1tbziLEACDb7vqYBg==";
const DB_HOST = process.env.DB_HOST || "nitya-tech-cosmos.mongo.cosmos.azure.com";
const DB_PORT = process.env.DB_PORT || "10255";

const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?ssl=true`;

console.log("MongoDB URL :- " + url);

const connectToDatabase = async () => {
    try {
        const options = {
            auth: {
                username: DB_USERNAME,
                password: DB_PASSWORD
            },
            retryWrites: false
        };

        //await mongoose.connect('mongodb://127.0.0.1/func-app-db');
        await mongoose.connect(url, options);

    } catch (error) {
        console.log(error);
    }
}

mongoose.connection.on("connected", () => {
    console.log("Connected to database", DB_NAME);
});

mongoose.connection.on("error", (err) => {
    console.error(`Database connection error: ${err}`);
    process.exit(1);
});

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from database");
});

const createMetadata = async () => {
    try {
        const docs = await Metadata.find({ name: 'first-function' }, { _id: 0 }).exec();

        const metadata = {
            name: 'first-function',
            firstHitOn: new Date(),
            lastHitOn: new Date()
        }

        if (docs && docs.length > 0) {
            delete metadata.firstHitOn;

            const res = await Metadata.updateOne({ name: 'first-function' }, metadata)
            if (res && res.modifiedCount > 0)
                console.log("Metadata updated.");
        }
        else {
            const newMetadata = new Metadata(metadata);
            await newMetadata.save();
            console.log("Metadata created.");
        }
        return docs;
    } catch (error) {
        console.log("Got error while createMetadata");
        console.log(error);
        return null;
    }

}

const getName = () => {
    return "Kanak Shukla";
}

module.exports = { getName, connectToDatabase, createMetadata };