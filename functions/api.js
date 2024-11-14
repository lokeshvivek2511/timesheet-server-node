const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const fs = require('fs');   
const fs1 = require('fs').promises;
const path = require('path');  



app.post('/api/signup', (req, res) => {
    const user = req.body;
    user.timestamp = new Date().toISOString();

    let userData = [];
    try {
        const data = fs.readFileSync('user.json', 'utf8');
        userData = JSON.parse(data);
        
        // Check if email already exists
        const emailExists = userData.some(existingUser => existingUser.email === user.email);
        
        if (emailExists) {
            return res.json({ status: false }); // Email already exists
        }
        
    } catch (error) {
        // If the file does not exist, an empty array is used.
    }

    userData.push(user);
    fs.writeFileSync('user.json', JSON.stringify(userData, null, 2));
    res.json({ status: true }); // Successfully registered
});


app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;

    try {
        const data = fs.readFileSync('user.json', 'utf8');
        const userData = JSON.parse(data);
        
        // Find user with matching email and password
        const user = userData.find(user => 
            user.email === email && 
            user.password === password
        );
        
        if (user) {
            // Remove password from response for security
            // const { password, ...userWithoutPassword } = user;
            return res.json({ 
                status: true, 
                // user: userWithoutPassword 
            });
        } else {
            return res.json({ 
                status: false, 
                message: 'Invalid email or password' 
            });
        }
        
    } catch (error) {
        return res.status(500).json({ 
            status: false, 
            message: 'Server error' 
        });
    }
});


app.post('/api/addtimesheet', (req, res) => {
    const newData = req.body;
    
    try {
        // Read existing timesheet data
        let timesheetData = [];
        try {
            const data = fs.readFileSync('timesheet.json', 'utf8');
            timesheetData = JSON.parse(data);
        } catch (err) {
            // If file doesn't exist or is empty, start with empty array
            timesheetData = [];
        }

        // Check if email already exists
        const existingIndex = timesheetData.findIndex(item => item.email === newData.email);

        if (existingIndex !== -1) {
            // Replace existing data
            timesheetData[existingIndex] = newData;
        } else {
            // Add new data
            timesheetData.push(newData);
        }

        // Write updated data back to file
        fs.writeFileSync('timesheet.json', JSON.stringify(timesheetData, null, 2));
        
        res.status(200).json({ status:true });
    } catch (error) {
        console.error('Error updating timesheet:', error);
        res.status(500).json({ error: 'Error updating timesheet' });
    }
});


app.post('/api/getmytimesheet', (req, res) => {
    const email = req.body.email;
    
    // Read timesheet data using fs
    fs.readFile(path.join(__dirname, 'timesheet.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({
                status: false,
                error: 'Error reading timesheet data'
            });
        }

        try {
            const timesheetData = JSON.parse(data);
            // Find timesheet entries matching email
            const userTimesheet = timesheetData.filter(entry => entry.email === email);
            
            if (userTimesheet.length > 0) {
                res.json({
                    status: true,
                    data: userTimesheet
                });
            } else {
                res.json({
                    status: false
                });
            }
        } catch (parseError) {
            res.status(500).json({
                status: false,
                error: 'Error parsing timesheet data'
            });
        }
    });
});

app.post('/api/adminlogin', (req, res) => {
    const { email, password } = req.body;

    try {
        const data = fs.readFileSync('admin.json', 'utf8');
        const userData = JSON.parse(data);
        
        // Find user with matching email and password
        const user = userData.find(user => 
            user.email === email && 
            user.password === password
        );
        
        if (user) {
            // Remove password from response for security
            // const { password, ...userWithoutPassword } = user;
            return res.json({ 
                status: true, 
                // user: userWithoutPassword 
            });
        } else {
            return res.json({ 
                status: false, 
                message: 'Invalid email or password' 
            });
        }
        
    } catch (error) {
        return res.status(500).json({ 
            status: false, 
            message: 'Server error' 
        });
    }
});

app.get('/api/getAllTimesheets', (req, res) => {
    try {
        const data = fs.readFileSync('timesheet.json', 'utf8');
        const timesheetData = JSON.parse(data);
        res.json({
            status: true,
            data: timesheetData.filter(sheet => sheet.email) // Filter out empty entries
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: 'Error reading timesheet data'
        });
    }
});

app.post('/api/updateTimesheetStatus', (req, res) => {
    const { email, date, status, remark } = req.body;
    
    try {
        const data = fs.readFileSync('timesheet.json', 'utf8');
        let timesheetData = JSON.parse(data);
        
        const sheetIndex = timesheetData.findIndex(
            sheet => sheet.email === email && sheet.date === date
        );

        if (sheetIndex !== -1) {
            timesheetData[sheetIndex].status = status;
            if (remark) {
                timesheetData[sheetIndex].remark = remark;
            }
            
            fs.writeFileSync('timesheet.json', JSON.stringify(timesheetData, null, 2));
            res.json({ status: true });
        } else {
            res.json({ status: false, message: 'Timesheet not found' });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: 'Error updating timesheet status'
        });
    }
});



// Export the handler
module.exports.handler = serverless(app);
