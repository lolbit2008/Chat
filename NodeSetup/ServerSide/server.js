const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../ClientSide')));
app.use(express.static(path.join(__dirname, '../ServerSide')));

app.get('/', (req, res) => {
    res.redirect('/Chat.html');
});

app.get('/Dev.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Dev/Dev.html'));
});

app.get('/api/messages', (req, res) => {
    const filePath = path.join(__dirname, 'Chat.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading Chat.json:', err);
            return res.status(500).json({ error: 'Failed to read messages' });
        }
        
        try {
            const messages = JSON.parse(data);
            res.json(messages);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).json({ error: 'Invalid JSON data' });
        }
    });
});

app.post('/api/messages', (req, res) => {
    const newMessage = req.body;
    const filePath = path.join(__dirname, 'Chat.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading Chat.json:', err);
            return res.status(500).json({ error: 'Failed to read messages' });
        }
        
        try {
            let messages = JSON.parse(data);
            
            newMessage.MessageId = messages.length > 0 
                ? Math.max(...messages.map(m => m.MessageId)) + 1 
                : 0;
            
            messages.push(newMessage);
            
            fs.writeFile(filePath, JSON.stringify(messages, null, 4), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to Chat.json:', writeErr);
                    return res.status(500).json({ error: 'Failed to save message' });
                }
                
                console.log('Message saved successfully:', newMessage);
                res.json({ success: true, message: newMessage });
            });
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).json({ error: 'Invalid JSON data' });
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Chat server running on http://0.0.0.0:${PORT}`);
    console.log('Live reload enabled - server will restart on file changes');
});
