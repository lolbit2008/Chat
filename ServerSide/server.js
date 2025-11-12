const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const messageSchema = new mongoose.Schema({
    User: String,
    userID: String,
    MessageId: Number,
    Message: String
});

const Message = mongoose.model("Message", messageSchema);


app.get('/', (req, res) => {
    res.send("Chat server is running");
});

app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ MessageId: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read messages' });
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        const count = await Message.countDocuments();
        const newMessage = {
            ...req.body,
            MessageId: count
        };

        const savedMessage = await Message.create(newMessage);
        res.json({ success: true, message: savedMessage });

    } catch (err) {
        console.error("DB Write Error:", err);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

