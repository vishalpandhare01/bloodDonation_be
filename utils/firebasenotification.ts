import axios from "axios";

export async function Notification(
  message: String | undefined /*, title :String | undefined */,
  token: String | undefined,
  postId: String
) {
  const data = {
    to: token,
    notification: {
      body: `${message}`,
      OrganizationId: "2",
      content_available: true,
      priority: "high",
      subtitle: "Blood Donation",
      title: "Blood DOnation",
    },
    data: {
      id: `${postId}`,
    },
  };

  const headers = {
    Authorization:
      "key = AAAAlHRE6HY:APA91bED8VyeZJbQ0-K7zMeClks1xJwrkPm_6eR-GYAzbOFo0RRFhii7J-tOrzN9UOAJhcgjTOW7rEA_ad9-ICkXw1VGipKSNAhVgD7coFpaOtcGhdqW26k1IKk1Nx-_O_9rylR4zvuK",
  };

  await axios
    .post("https://fcm.googleapis.com/fcm/send", data, { headers: headers })
    .then((res) => {
      console.log("firebse response", res.data);
    })
    .catch((err) => {
      console.log("npotificattion err", err);
    });
}

export async function MultypleNotification(
  message: String | undefined /*, title :String | undefined */,
  tokens: String[] | undefined,
  postId: String
) {
  console.log(message, tokens, postId);
  const data = {
    registration_ids: tokens,
    notification: {
      body: `${message}`,
      OrganizationId: "2",
      content_available: true,
      priority: "high",
      subtitle: "Blood Donation",
      title: "Blood Donation",
    },
    data: {
      id: `${postId}`,
    },
  };

  const headers = {
    Authorization:
      "key = AAAAlHRE6HY:APA91bED8VyeZJbQ0-K7zMeClks1xJwrkPm_6eR-GYAzbOFo0RRFhii7J-tOrzN9UOAJhcgjTOW7rEA_ad9-ICkXw1VGipKSNAhVgD7coFpaOtcGhdqW26k1IKk1Nx-_O_9rylR4zvuK",
  };

  await axios
    .post("https://fcm.googleapis.com/fcm/send", data, { headers: headers })
    .then((res) => {
      console.log("firebse response", res.data);
    })
    .catch((err) => {
      console.log("npotificattion err", err);
    });
}

export async function AllusersNotification(
  message: String | undefined /*, title :String | undefined */,
  postId: String
) {
  const data = {
    to: "/topics/All",
    notification: {
      body: `${message}`,
      OrganizationId: "2",
      content_available: true,
      priority: "high",
      subtitle: "Blood Donation",
      title: "Blood Donation",
    },
    data: {
      id: `${postId}`,
    },
  };

  const headers = {
    Authorization:
      "key = AAAAlHRE6HY:APA91bED8VyeZJbQ0-K7zMeClks1xJwrkPm_6eR-GYAzbOFo0RRFhii7J-tOrzN9UOAJhcgjTOW7rEA_ad9-ICkXw1VGipKSNAhVgD7coFpaOtcGhdqW26k1IKk1Nx-_O_9rylR4zvuK",
  };

  await axios
    .post("https://fcm.googleapis.com/fcm/send", data, { headers: headers })
    .then((res) => {
      console.log("firebse response", res.data);
    })
    .catch((err) => {
      console.log("npotificattion err", err);
    });
}
