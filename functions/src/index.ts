import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

export const timeline = {
  onCreate: functions.database.ref("timeline/{key}")
    .onCreate((snapshot, context) => {
      const key = snapshot.key;
      const uid = context.auth?.uid;
      functions.logger.info("onCreate", {key, uid});
      return true;
    }),
  onDelete: functions.database.ref("timeline/{key}")
    .onDelete((snapshot, context) => {
      const key = snapshot.key;
      const uid = context.auth?.uid;
      functions.logger.info("onDelete", {key, uid});
      return true;
    }),
  onUpdate: functions.database.ref("timeline/{key}")
    .onUpdate((snapshot, context) => {
      const afterKey = snapshot.after.key;
      const beforeKey = snapshot.before.key;
      const uid = context.auth?.uid;
      functions.logger.info("onUpdate", {afterKey, beforeKey, uid});
      return true;
    }),
};


// // Start writing functions

// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
