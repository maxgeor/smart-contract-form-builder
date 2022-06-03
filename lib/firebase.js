// Import the functions you need from the SDKs you need
// import * as firebase from 'firebase/app'
import { initializeApp } from 'firebase/app'
import 'firebase/functions';
import 'firebase/firestore';
// import { getDatabase, ref, set, onValue, push, update, get, child } from "firebase/database";

const firebaseConfig = {
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // databaseURL: "https://formie-default-rtdb.firebaseio.com",
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig);

export default app;

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// const getUser = async (address) => {
//   // const dbRef = ref(db);
//   // get(child(dbRef, `users/${address}`)).then((snapshot) => {
//   //   if (snapshot.exists()) {
//   //     const user = snapshot.val();
//   //     console.log(user);
//   //     return user;
//   //   } else {
//   //     console.log("No data available");
//   //   }
//   // }).catch((error) => {
//   //   console.error(error);
//   // });

//   // try {
//   //   const snapshot = await get(child(ref(db, `users/${address}`)))
//   //   const user = (snapshot.val() && snapshot.val());
//   //   console.log("user", user);
//   //   return user;
//   // } catch (e) {
//   //   console.log(e);
//   // }

//   onValue(ref(db, `users/${address}`), (snapshot) => {
//     const user = (snapshot.val() && snapshot.val());
//     console.log("user", user);
//     return user;
//   }, {
//     onlyOnce: true
//   });
// }

// const createUser = async (address) => {
//   set(ref(db, `users/${address}`), { address, forms: [],});
// }

// const createForm = async (
//   address,
//   abi,
//   contractAddress,
//   contractName,
//   method,
//   inputs
// ) => {
//   try {
//     const user = await getUser(address);
//     console.log("user", user);
//     if (!user) {
//       createUser(address);
//     }
  
//     const formData = {
//       owner: address,
//       contract: {
//         abi,
//         address: contractAddress,
//         name: contractName,
//       },
//       method,
//       inputs
//     }

//     console.log(formData);
    
//     const formId = await ref(db, `forms`).push(set(formData));

//     set(push(ref(db, `forms/${formId.key}`)), { formData });

//     // push().set(ref(db, `forms`),{
//     //   id: formId.key, 
//     //   ...formData
//     // });
  
//     // update(ref(db, `users/${address}`),{
//     //   forms: [...user.forms, formId.id],
//     // });
//   } catch (e) {
//     console.log(e);
//   }
// }

// const getForm = async (address, formId) => {
//   const user = await findUser(address);
//   if (!user) {
//     return null;
//   }
//   const form = await db.ref(`forms/${formId}`).once("value");
//   await db.ref(`users/${address}/forms/${formId}`).once("value");
//   return form.val();
// }

// const getForms = async (address) => {
//   const user = await findUser(address);
//   if (!user) {
//     createUser(address);
//   }
//   const forms = await db.ref(`users/${address}/forms`).once("value");
//   return forms.val();
// }

// const updateForm = async (address, form) => {
//   const user = await findUser(address);
//   if (!user) {
//     createUser(address);
//   }
//   db.ref(`users/${address}/forms/${form.id}`).set(form);
// }

// // const publishForm = async (address, form) => {
// //   const user = await findUser(address);
// //   if (!user) {
// //     createUser(address);
// //   }
// //   db.ref(`users/${address}/forms/${form.id}/published`).set(true);
// // }

// // const unpublishForm = async (address, form) => {
// //   const user = await findUser(address);
// //   if (!user) {
// //     createUser(address);
// //   }
// //   db.ref(`users/${address}/forms/${form.id}/published`).set(false);
// // }

// // const deleteForm = async (address, form) => {
// //   const user = await findUser(address);
// //   if (!user) {
// //     createUser(address);
// //   }
// //   db.ref(`users/${address}/forms/${form.id}`).remove();
// // }

// export {
//   getUser,
//   createUser,
//   createForm,
//   getForm,
//   getForms,
//   updateForm,
//   // publishForm,
//   // unpublishForm,
//   // deleteForm,
// };

