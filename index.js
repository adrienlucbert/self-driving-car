const express = require('express');
const app = express();

app.use(express.static(`static`));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));