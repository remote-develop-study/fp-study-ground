import mongoose from 'mongoose';

const { Schema } = mongoose;

const kittySchema = new Schema({
  name: String,
});

class KittyClass {
  speak() {
    const greeting = this.name ? `Meow name is ${this.name}` : 'I don\'t have a name';
    console.log(greeting);
  }
}

kittySchema.loadClass(KittyClass);

export default mongoose.models.Kitten || mongoose.model('Kitten', kittySchema);
