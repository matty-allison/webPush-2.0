console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
    const data = e.data.json();
    self.registration.showNotification(
      data.title, // title of the notification
      {
        body: "This is a Push notification from Application", //the body of the push notification
        image: "https://pixabay.com/vectors/bell-notification-communication-1096280/",
        icon: "https://pixabay.com/vectors/bell-notification-communication-1096280/" // icon
      }
      );
});