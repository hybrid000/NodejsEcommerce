const express = require('express');
const connectdb = require('./db.js');
const mainRouter = require('./routes/mainRoutes.js');
const categoryRouter = require('./routes/categoryRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const authMiddleware = require('./middleware/authMiddleware');
const passport = require('passport');
const session = require('express-session');
const customLocalStrategy = require('./middleware/strategy.js'); // Import the custom local strategy
const User = require('./models/user.js');

const dotenv = require('dotenv');

dotenv.config()

const userRouter = require('./routes/userRoutes.js');


const app = express();

const PORT = process.env.PORT;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Parse URL-encoded bodies for form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));


connectdb();

passport.use('custom-local', customLocalStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());



app.use(authMiddleware);
// Routers


app.use('/', mainRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
