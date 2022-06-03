import app from './firebase'
import { getFirestore, collection, doc, docRef, getDoc, getDocs, addDoc, updateDoc, query, where } from "firebase/firestore";

const db = getFirestore(app);

const users = collection(db, 'users');
const forms = collection(db, 'forms');

export async function findUser(address) {
  const q = query(users, where('address', '==', address));
  const querySnapshot = await getDocs(q);

  let docs = [];

  querySnapshot.forEach((doc) => docs.push({
    id: doc.id, ...doc.data()
  }));

  if (docs.length === 0) {
    return null;
  }
  console.log(docs);

  return docs[0];
}

export async function createUser(data) {
  return db.collection('users').add(data)
}

export async function updateUser(id, data) {
  return db.collection('users').doc(id).update(data)
}

export async function createForm(
  address,
  abi,
  contractAddress,
  contractName,
  method,
  inputs
) {
  try {
    const user = await findUser(address);

    const docRef = doc(db, 'users', user.id);
    const userRef = await getDoc(docRef);

    console.log(userRef);

    const formData = {
      owner: user.id,
      contract: {
        abi,
        address: contractAddress,
        name: contractName,
        title: '',
        description: '',
      },
      method,
      fields: inputs.map(input => ({
        ...input,
        title: '',
        description: '',
      })),
    }
  
    const form = await addDoc(forms, formData);

    updateDoc(docRef, {
      forms: [...user.forms, form.id],
    });

    return form;
  } catch (error) {
    console.error(error);
  }
}

export async function findForm(id) {
  const docRef = doc(db, 'forms', id);
  const formRef = await getDoc(docRef);

  const form = formRef.data();

  if (!form) {
    return null;
  }

  const formData = {
    id: formRef.id, ...form,
  }

  return formData;
}

// export async function updateForm(id, fieldName, fieldTitle, fieldDescription) {
//   const docRef = doc(db, 'forms', id);
//   updateForm(docRef, {
//     fields: {
//       [fieldName]: {
//     }
//   })
// }

// export async function findForms(id) {
//   const collectionRef = collection(db, 'forms');
//   const formsRef = await getDocs(collectionRef);

//   const forms = [];
  
//   formsRef.forEach(form => {
//     forms.push({
//       id: form.id,
//       ...form.data(),
//     })
//   });

//   return forms;
// }