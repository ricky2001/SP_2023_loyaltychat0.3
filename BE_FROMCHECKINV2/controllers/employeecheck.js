const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");
const moment = require("moment");

exports.checkgraph = (req, res) => {
    const currentDate = moment(); // Current date

    // Calculate the start date of the current week (Sunday)
    const startOfWeek = currentDate.clone().startOf("week");

    // Calculate the end date of the current week (Saturday)
    const endOfWeek = currentDate.clone().endOf("week");

    firebase
        .firestore()
        .collection('checkin')
        .where('dateCheckIn', '>=', startOfWeek.format("YYYY-MM-DD"))
        .where('dateCheckIn', '<=', endOfWeek.format("YYYY-MM-DD"))
        .get()
        .then((querySnapshot) => {
            let dataByDayAndTime = {};

            querySnapshot.forEach((doc) => {
                if (doc.exists) {
                    const dateCheckIn = doc.data().dateCheckIn;
                    const email = doc.data().email;
                    const time = doc.data().time;

                    // Categorize emails into morning and afternoon
                    const timeCategory = getTimeCategory(time);

                    // Count emails for each day and time category
                    if (!dataByDayAndTime[dateCheckIn]) {
                        dataByDayAndTime[dateCheckIn] = {};
                    }

                    if (!dataByDayAndTime[dateCheckIn][timeCategory]) {
                        dataByDayAndTime[dateCheckIn][timeCategory] = { emails: [], count: 0 };
                    }

                    dataByDayAndTime[dateCheckIn][timeCategory].emails.push(email);
                    dataByDayAndTime[dateCheckIn][timeCategory].count++;
                }
            });

            // Transform data into an array for easier client consumption
            const result = Object.keys(dataByDayAndTime).map((date) => ({
                date: date,
                morning: dataByDayAndTime[date].morning || { emails: [], count: 0 },
                afternoon: dataByDayAndTime[date].afternoon || { emails: [], count: 0 },
            }));

            // Send the processed data to the client
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error('Error getting documents: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

// Function to categorize time into morning or afternoon
function getTimeCategory(time) {
    const hour = parseInt(time.split(':')[0]);
    const period = time.split(' ')[1]; // AM or PM

    if (period === 'AM') {
        return hour <= 12 ? 'morning' : 'afternoon';
    } else {
        return hour <= 12 ? 'afternoon' : 'evening';
    }
}
