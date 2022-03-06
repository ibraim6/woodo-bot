import { Schema, model } from 'mongoose';
interface List {
  guild: string;
  words: string;
}
const BlackListWordsSchema = new Schema<List>({
  guild: String,
  words: String,
});
export default model('blacklisted-words', BlackListWordsSchema)