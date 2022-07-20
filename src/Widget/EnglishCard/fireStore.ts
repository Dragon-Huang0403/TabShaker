import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
  limit,
  Query,
  DocumentData,
} from 'firebase/firestore';
import { v4 } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_APIKEY_AUTHDOMAIN,
  projectId: process.env.REACT_APP_APIKEY_PROJECTID,
  storageBucket: process.env.REACT_APP_APIKEY_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_APIKEY_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APIKEY_APPID,
  measurementId: process.env.REACT_APP_APIKEY_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const dictionaryTableName = 'dictionary';

export type EnglishWordDataInFireStore = {
  id: string;
  word: string;
  ipa: string;
  type: string;
  chinese: string;
  definition: string;
  example: string;
  example_chinese: string;
  tags: string[];
};
export async function getCard(quantity: number, tag: string[]) {
  let q: Query<DocumentData>;
  if (tag.length > 0) {
    q = query(
      collection(db, dictionaryTableName),
      limit(quantity),
      where('id', '>=', v4()),
      where('tags', 'array-contains-any', tag),
    );
  } else {
    q = query(
      collection(db, dictionaryTableName),
      limit(quantity),
      where('id', '>=', v4()),
    );
  }
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map(
    (doc) => doc.data() as EnglishWordDataInFireStore,
  );
  return data;
}
