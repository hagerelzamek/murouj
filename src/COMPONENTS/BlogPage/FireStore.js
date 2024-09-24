import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase'; // Ensure this path is correct

// Export your Firestore functions
export const saveToDB = async (data) => {
  try {
    // Ensure `data` is a single object, not an array
    if (typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Expected data to be a single object');
    }
    
    const docRef = await addDoc(collection(db, 'blogs'), data);
    return docRef;
  } catch (error) {
    console.error('Error saving to Firestore:', error);
    throw error;
  }
};

export const getFromDB = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'blogs'));
    const blogs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return blogs;
  } catch (error) {
    console.error('Error fetching blogs from Firestore:', error);
    throw error;
  }
};

export const deleteFromDB = async (id) => {
  try {
    await deleteDoc(doc(db, 'blogs', id));
  } catch (error) {
    console.error('Error deleting from Firestore:', error);
    throw error;
  }
};
