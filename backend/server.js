const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://aasthalondhemeow:meowmeow@asthmaprediction.ghhi2ti.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB error:", err));

// Session setup
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://aasthalondhemeow:meowmeow@asthmaprediction.ghhi2ti.mongodb.net/' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// User Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', UserSchema);

// Signup Route
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // Validate email format (must end with @gmail.com)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid Gmail address.' });
    }

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.', redirect: 'http://localhost:3000/' });
        }

        // Hash the password before saving to DB
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });

        // Save user to the database
        await user.save();
        res.json({ message: 'Signup successful', redirect: 'http://localhost:3000/login' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Please try again later.', redirect: 'http://localhost:3000/' });
    }
});


// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found', redirect: 'http://localhost:3000/' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials', redirect: 'http://localhost:3000/' });

        req.session.user = { id: user._id, email: user.email };
        res.json({ message: 'Login successful', redirect: 'http://localhost:3000/predict' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', redirect: 'http://localhost:3000/' });
    }
});

// Logout Route
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
