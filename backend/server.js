const express = require('express');
const cors = require('cors'); 
const Routes = require('./routes/routes');

const app = express();

app.use(cors());

app.use(express.json());

// Routes
app.use('/',Routes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
