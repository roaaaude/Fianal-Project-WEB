// Script to seed the database with sample data
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const User = require('./models/user.model');
const Item = require('./models/item.model');
const Favorite = require('./models/favorite.model');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Favorite.deleteMany();
    await Item.deleteMany();
    await User.deleteMany();
    console.log('Cleared existing data');

    // Create users (use save() to trigger password hashing)
    const userData = [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'adminpassword',
        role: 'admin',
      },
      {
        username: 'john',
        email: 'john@example.com',
        password: 'johnpassword',
        role: 'user',
      },
      {
        username: 'jane',
        email: 'jane@example.com',
        password: 'janepassword',
        role: 'user',
      },
    ];
    const users = [];
    for (const data of userData) {
      const user = new User(data);
      await user.save();
      users.push(user);
    }
    console.log('Seeded users');

    // Create items (assign to users[0] as creator)
    const items = await Item.insertMany([
      {
        title: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation.',
        price: 99.99,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'electronics',
        createdBy: users[0]._id,
        tags: ['audio', 'wireless'],
      },
      {
        title: 'Running Shoes',
        description: 'Comfortable running shoes for all terrains.',
        price: 59.99,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'sports',
        createdBy: users[1]._id,
        tags: ['shoes', 'sports'],
      },
      {
        title: 'Classic Novel',
        description: 'A must-read classic novel for book lovers.',
        price: 14.99,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'books',
        createdBy: users[2]._id,
        tags: ['book', 'classic'],
      },
    ]);
    console.log('Seeded items');

    // Create favorites (user john favorites the first item)
    await Favorite.create({ user: users[1]._id, item: items[0]._id });
    await Favorite.create({ user: users[2]._id, item: items[1]._id });
    console.log('Seeded favorites');

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed(); 