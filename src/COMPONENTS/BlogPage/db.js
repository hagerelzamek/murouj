// db.js
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';  // Make sure your firebase config is correct

// Fetch all blogs
export const getFromDB = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const blogs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return blogs;
  } catch (error) {
    console.error('Error fetching blogs from Firestore:', error);
    throw error;
  }
};

// Save a new blog
export const saveToDB = async (blog) => {
  try {
    const docRef = await addDoc(collection(db, "blogs"), blog);
    return docRef.id;  // Return the new document ID
  } catch (error) {
    console.error('Error adding blog:', error);
    throw error;
  }
};

// Update an existing blog
export const updateBlogInDB = async (id, updatedBlog) => {
    try {
      const blogRef = doc(db, "blogs", id);  // Get reference to the blog document
      await updateDoc(blogRef, updatedBlog);  // Update the blog document in Firestore
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  };

// Delete a blog
export const deleteBlogInDB = async (id) => {
    try {
      console.log("Attempting to delete blog with Firestore ID:", id);  // Log ID for debugging
  
      // Use Firestore doc reference to delete the blog by ID
      const blogRef = doc(db, "blogs", id);
  
      // Check if document exists before deleting
      const blogDoc = await getDoc(blogRef);
      if (!blogDoc.exists()) {
        throw new Error(`No document to delete with ID: ${id}`);
      }
  
      await deleteDoc(blogRef);  // Delete the document from Firestore
      console.log("Successfully deleted blog with ID:", id);
    } catch (error) {
      console.error('Error deleting blog from Firestore:', error);
    }
  };
  
  