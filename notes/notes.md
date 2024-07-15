1) вывести на клиент, то что он отправил в query url
    getAll (req, res) { res.status(200).json({messg: "types is working!", query: req.query})   }
2) отдать index.html
    app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, '../', 'client', 'public', 'index.html')); }
3) отдать json
    app.get('/', (req, res) => { res.status(200).json({message: 'Site is working!'}) });
4)