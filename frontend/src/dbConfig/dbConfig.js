import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect("mongodb://arpande:zmxncbv%40123@ac-dhs1i5d-shard-00-00.nhcw4dm.mongodb.net:27017,ac-dhs1i5d-shard-00-01.nhcw4dm.mongodb.net:27017,ac-dhs1i5d-shard-00-02.nhcw4dm.mongodb.net:27017/?ssl=true&replicaSet=atlas-tzfa6f-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0");
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