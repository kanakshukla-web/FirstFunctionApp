const { getName, connectToDatabase, createMetadata } = require("../util");

const name = getName();

const storeFunctionMetadata = async (context, req) => {
    context.log("Function App is executing..")

    await connectToDatabase();
    const res = await createMetadata();

    context.res = { status: 200, body: { message: `Hello ${name} !!`, metadata: res } }

    context.log("Function App execution completed.")
    //context.done();
}

module.exports = storeFunctionMetadata;