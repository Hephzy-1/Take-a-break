const webPush = require('web-push');

const sendNotifications = async (req, res) => {
  const vapidKeys = webPush.generateVAPIDKeys();
  const pushSubscription = req.body.subscription; // assume you have the subscription object
  const notification = {
    title: 'Time to take a break',
    message: 'Take a break!',
    icon: 'icon.png',
  };

  webPush.sendNotification(pushSubscription, notification, vapidKeys)
   .then(() => {
      console.log('Notification sent!');
      res.send('Notification sent!');
    })
   .catch((error) => {
      console.error('Error sending notification:', error);
      res.status(500).send('Error sending notification');
    });
});




// // Store notification data in a database
// // const notifications = [];

// // app.post('/schedule-notification', (req, res) => {
// //   const notification = req.body.notification;
// //   notifications.push(notification);
// //   scheduleNotification(notification);
// //   res.send('Notification scheduled');
// // });

// function scheduleNotification(notification) {
//   // Schedule a job to send the notification at a later time
//   setTimeout(() => {
//     sendNotification(notification);
//   }, 3000); // Send notification after 3 seconds
// }

// function sendNotification(notification) {
//   // Retrieve the notification data from the database
//   const notificationData = notifications.find((n) => ('link unavailable') === ('link unavailable'));

//   // Send the notification using FCM
//   const message = {
//     data: {
//       title: notificationData.title,
//       message: notificationData.message,
//     },
//     token: notificationData.token,
//   };
//   firebase.messaging().send(message)
//     .then((response) => {
//       console.log('Notification sent successfully');
//     })
//     .catch((error) => {
//       console.error('Error sending notification', error);
//     });
// }