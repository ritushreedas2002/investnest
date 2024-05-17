import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect("mongodb://admin-ritushree:Mo4gS9UnLrFY1J0Y@ac-m3eu5ek-shard-00-00.s6k4ce2.mongodb.net:27017,ac-m3eu5ek-shard-00-01.s6k4ce2.mongodb.net:27017,ac-m3eu5ek-shard-00-02.s6k4ce2.mongodb.net:27017/FINANCE?ssl=true&replicaSet=atlas-14fxtv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0");
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}