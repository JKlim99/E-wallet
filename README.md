# MSE-ewallet
## Setup
### 1. Clone this project to your local device
```
git clone https://github.com/JKlim99/MSE-ewallet.git
```
### 2. Run the following command to get the project initialize on your local device:
```
npm install
```
### 3. Ta-da you are done with the setup!    

## Android Setup
### 1. Build the project
```
ionic build
```
### 2. Create Android project
```
ionic cap add android
```
### 3. Open it with android studio   
```
ionic cap open android
```
### 4. Ta-da you are done with the setup!  

## Firebase Database connection implementation
### 1. Import firebase related stuffs at the top of the file:
```
import firebase from 'firebase';
import 'firebase/firestore';
```
### 2. Initialize the firestore in the constructor:
```
let db = firebase.firestore()
```
### 3. Start Querying, example:
Read data, reference: https://firebase.google.com/docs/firestore/query-data/queries
```
var usersCollection = db.collection("users");
var query = usersCollection.where("email", "==", "test");
query.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
```

Add data, reference: https://firebase.google.com/docs/firestore/manage-data/add-data
```
var usersCollection = db.collection("users");
usersCollection.add({
    first_name: "John",
    last_name: "Tan",
    email: "test@mail.com",
    password: "123"
})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
```

Update data, reference: https://firebase.google.com/docs/firestore/manage-data/add-data
```
var usersRef = db.collection("users").doc("X9ROmGUThrZ2bA1L9wpM");
usersRef.update({
    first_name: "John",
    last_name: "Tan",
    email: "test@mail.com",
    password: "123"
})
.then(() => {
    console.log("Document successfully updated!");
})
.catch((error) => {
    console.error("Error updating document: ", error);
});
```