import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [content, setContent] = useState([]);

  // Fetch content from Firestore
  const fetchContent = async () => {
    const contentCollection = collection(db, "content");
    const contentSnapshot = await getDocs(contentCollection);
    const contentList = contentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setContent(contentList);
  };

  // Add new content
  const addNewContent = async (newData) => {
    await addDoc(collection(db, "content"), newData);
  };

  // Update content
  const updateContent = async (id, updatedData) => {
    const contentDoc = doc(db, "content", id);
    await updateDoc(contentDoc, updatedData);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* Form for adding new content */}
      {/* List of content with edit options */}
    </div>
  );
};

export default AdminDashboard;
