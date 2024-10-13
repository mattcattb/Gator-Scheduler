import {Schema, model, Document} from "mongoose";

interface User extends Document {
    username: string;
    email: string;
    password: string;
    // TODO: change schedule, friends type from bool
    schedule?: boolean;
    friends?: boolean;
    //friends?: {[name: string]: Types.ObjectId}
}

const userSchema = new Schema<User>({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    schedule: {type: Boolean},
    friends: {type: Boolean},
});

export default model<User>("User", userSchema);