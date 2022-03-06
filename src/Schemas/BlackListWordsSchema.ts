import { Schema, model } from 'mongoose';
interface List {
  guild: string;
  word: string;
}
const BlackListWordsSchema = new Schema<List>({
  guild: String,
  word: String,
});
export default model('blacklisted-words', BlackListWordsSchema)