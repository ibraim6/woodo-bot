import {Schema, model} from 'mongoose';
interface Warn {
    user: string,
    guild: string,
    reason: string,
    moderator: string,
}
const WarnSchema =  new Schema<Warn>({
    user: String,
    guild: String,
    reason: String,
    moderator: String,
})
export default model('warn', WarnSchema)