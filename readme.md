#Parsing and transforming archived CSV files into JSON format 

**Input**: ZIP archive with 2 CSV files

**Expected output**: Single JSON file, that should contain results with the following
structure:

    {
        name: String,
        phone: String,
        person: {
            firstName: String,
            lastName: String
        },
        amount: Number,
        date: Date,
        costCenterNum: String
    }
**Fork the project and run** as usual node app. As a result application create `ResultJson.json` in the root directory.