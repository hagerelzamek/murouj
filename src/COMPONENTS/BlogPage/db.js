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
  
  // db.js

// Fetch all headers
export const getHeaderFromDB = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "header"));
    const headers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return headers;
  } catch (error) {
    console.error('Error fetching headers from Firestore:', error);
    throw error;
  }
};

// Save new header content
export const saveHeaderToDB = async (header) => {
    try {
      const docRef = await addDoc(collection(db, "header"), header); // 'header' contains 'en' and 'ar'
      return docRef.id;
    } catch (error) {
      console.error('Error saving header:', error);
      throw error;
    }
  };
  

// Update existing header content
export const updateHeaderInDB = async (id, updatedHeader) => {
    try {
      const headerRef = doc(db, "header", id);
      
      // Fetch existing document
      const existingDoc = await getDoc(headerRef);
      if (!existingDoc.exists()) {
        throw new Error(`No document found with ID: ${id}`);
      }
  
      // Merge the existing document with the updated content
      const existingData = existingDoc.data();
      const mergedData = {
        ...existingData,
        ...updatedHeader, // This should include 'en' and 'ar' fields
      };
  
      // Update the document with the new structure
      await updateDoc(headerRef, mergedData);
      console.log('Successfully updated header:', mergedData);
    } catch (error) {
      console.error('Error updating header in Firestore:', error);
      throw error;
    }
  };



  export const getServicesFromDB = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "services"));
      const service = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return service;
    } catch (error) {
      console.error('Error fetching services from Firestore:', error);
      throw error;
    }
  };
  
  // Save new header content
  export const saveServicesToDB = async (services) => {
      try {
        const docRef = await addDoc(collection(db, "services"), services); // 'header' contains 'en' and 'ar'
        return docRef.id;
      } catch (error) {
        console.error('Error saving services:', error);
        throw error;
      }
    };
    
  
  // Update existing header content
  export const updateServicesInDB = async (id, updatedService) => {
      try {
        const servicesRef = doc(db, "services", id);
        
        // Fetch existing document
        const existingDoc = await getDoc(servicesRef);
        if (!existingDoc.exists()) {
          throw new Error(`No document found with ID: ${id}`);
        }
    
        // Merge the existing document with the updated content
        const existingData = existingDoc.data();
        const mergedData = {
          ...existingData,
          ...updatedService, // This should include 'en' and 'ar' fields
        };
    
        // Update the document with the new structure
        await updateDoc(servicesRef, mergedData);
        console.log('Successfully updated services:', mergedData);
      } catch (error) {
        console.error('Error updating services in Firestore:', error);
        throw error;
      }
    };


// Fetch how documents from Firestore
export const getHowFromDB = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "hows"));
    const how = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return how;
  } catch (error) {
    console.error('Error fetching hows from Firestore:', error);
    throw error;
  }
};

// Save new how content
export const saveHowToDB = async (hows) => {
  try {
    const docRef = await addDoc(collection(db, "hows"), hows);
    return docRef.id;
  } catch (error) {
    console.error('Error saving how:', error);
    throw error;
  }
};

// Update existing how content
export const updateHowInDB = async (id, updatedHow) => {
  try {
    const howRef = doc(db, "hows", id);

    // Fetch existing document
    const existingDoc = await getDoc(howRef);
    if (!existingDoc.exists()) {
      throw new Error(`No document found with ID: ${id}`);
    }

    // Merge the existing document with the updated content
    const existingData = existingDoc.data();
    const mergedData = {
      ...existingData,
      ...updatedHow, // Merging updated content
    };

    // Update the document with the new structure
    await updateDoc(howRef, mergedData);
    console.log('Successfully updated how:', mergedData);
  } catch (error) {
    console.error('Error updating how in Firestore:', error);
    throw error;
  }
};


export const getAboutFromDB = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "about"));
    const abouts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return abouts;
  } catch (error) {
    console.error('Error fetching abouts from Firestore:', error);
    throw error;
  }
};

// Save new header content
export const saveAboutToDB = async (header) => {
    try {
      const docRef = await addDoc(collection(db, "about"), header); // 'header' contains 'en' and 'ar'
      return docRef.id;
    } catch (error) {
      console.error('Error saving about:', error);
      throw error;
    }
  };
  

// Update existing header content
export const updateAboutInDB = async (id, updatedAbout) => {
    try {
      const aboutRef = doc(db, "about", id);
      
      // Fetch existing document
      const existingDoc = await getDoc(aboutRef);
      if (!existingDoc.exists()) {
        throw new Error(`No document found with ID: ${id}`);
      }
  
      // Merge the existing document with the updated content
      const existingData = existingDoc.data();
      const mergedData = {
        ...existingData,
        ...updatedAbout, // This should include 'en' and 'ar' fields
      };
  
      // Update the document with the new structure
      await updateDoc(aboutRef, mergedData);
      console.log('Successfully updated abouts:', mergedData);
    } catch (error) {
      console.error('Error updating abouts in Firestore:', error);
      throw error;
    }
  };

  export const getWhoFromDB = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "who"));
      const whos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return whos;
    } catch (error) {
      console.error('Error fetching whos from Firestore:', error);
      throw error;
    }
  };
  
  // Save new header content
  export const saveWhoToDB = async (who) => {
      try {
        const docRef = await addDoc(collection(db, "who"), who); // 'header' contains 'en' and 'ar'
        return docRef.id;
      } catch (error) {
        console.error('Error saving who:', error);
        throw error;
      }
    };
    
  
  // Update existing header content
  export const updateWhoInDB = async (id, updatedWho) => {
      try {
        const whoRef = doc(db, "who", id);
        
        // Fetch existing document
        const existingDoc = await getDoc(whoRef);
        if (!existingDoc.exists()) {
          throw new Error(`No document found with ID: ${id}`);
        }
    
        // Merge the existing document with the updated content
        const existingData = existingDoc.data();
        const mergedData = {
          ...existingData,
          ...updatedWho, // This should include 'en' and 'ar' fields
        };
    
        // Update the document with the new structure
        await updateDoc(whoRef, mergedData);
        console.log('Successfully updated whos:', mergedData);
      } catch (error) {
        console.error('Error updating whos in Firestore:', error);
        throw error;
      }
    };
  

    export const getWhatFromDB = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "what"));
        const whats = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return whats;
      } catch (error) {
        console.error('Error fetching whats from Firestore:', error);
        throw error;
      }
    };
    
    // Save new header content
    export const saveWhatToDB = async (what) => {
        try {
          const docRef = await addDoc(collection(db, "what"), what); // 'header' contains 'en' and 'ar'
          return docRef.id;
        } catch (error) {
          console.error('Error saving what:', error);
          throw error;
        }
      };
      
    
    // Update existing header content
    export const updateWhatInDB = async (id, updatedWhat) => {
        try {
          const whatRef = doc(db, "what", id);
          
          // Fetch existing document
          const existingDoc = await getDoc(whatRef);
          if (!existingDoc.exists()) {
            throw new Error(`No document found with ID: ${id}`);
          }
      
          // Merge the existing document with the updated content
          const existingData = existingDoc.data();
          const mergedData = {
            ...existingData,
            ...updatedWhat, // This should include 'en' and 'ar' fields
          };
      
          // Update the document with the new structure
          await updateDoc(whatRef, mergedData);
          console.log('Successfully updated what:', mergedData);
        } catch (error) {
          console.error('Error updating whos in Firestore:', error);
          throw error;
        }
      };
    

      export const getMVFromDB = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "mv"));
          const mv = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          return mv;
        } catch (error) {
          console.error('Error fetching hows from Firestore:', error);
          throw error;
        }
      };
      
      // Save new how content
      export const saveMVToDB = async (mv) => {
        try {
          const docRef = await addDoc(collection(db, "mv"), mv);
          return docRef.id;
        } catch (error) {
          console.error('Error saving how:', error);
          throw error;
        }
      };
      
      // Update existing how content
      export const updateMVInDB = async (id, updatedMv) => {
        try {
          const mvRef = doc(db, "mv", id);
      
          // Fetch existing document
          const existingDoc = await getDoc(mvRef);
          if (!existingDoc.exists()) {
            throw new Error(`No document found with ID: ${id}`);
          }
      
          // Merge the existing document with the updated content
          const existingData = existingDoc.data();
          const mergedData = {
            ...existingData,
            ...updatedMv, // Merging updated content
          };
      
          // Update the document with the new structure
          await updateDoc(mvRef, mergedData);
          console.log('Successfully updated how:', mergedData);
        } catch (error) {
          console.error('Error updating how in Firestore:', error);
          throw error;
        }
      };


      export const getValuesFromDB = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "values"));
          const values = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          return values;
        } catch (error) {
          console.error('Error fetching hows from Firestore:', error);
          throw error;
        }
      };
      
      // Save new how content
      export const saveValuesToDB = async (values) => {
        try {
          const docRef = await addDoc(collection(db, "values"), values);
          return docRef.id;
        } catch (error) {
          console.error('Error saving how:', error);
          throw error;
        }
      };
      
      // Update existing how content
      export const updateValuesInDB = async (id, updatedMv) => {
        try {
          const valuesRef = doc(db, "values", id);
      
          // Fetch existing document
          const existingDoc = await getDoc(valuesRef);
          if (!existingDoc.exists()) {
            throw new Error(`No document found with ID: ${id}`);
          }
      
          // Merge the existing document with the updated content
          const existingData = existingDoc.data();
          const mergedData = {
            ...existingData,
            ...updatedMv, // Merging updated content
          };
      
          // Update the document with the new structure
          await updateDoc(valuesRef, mergedData);
          console.log('Successfully updated how:', mergedData);
        } catch (error) {
          console.error('Error updating how in Firestore:', error);
          throw error;
        }
      };

      export const getChooseFromDB = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "choose"));
          const values = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          return values;
        } catch (error) {
          console.error('Error fetching hows from Firestore:', error);
          throw error;
        }
      };
      
      // Save new how content
      export const saveChooseToDB = async (choose) => {
        try {
          const docRef = await addDoc(collection(db, "choose"), choose);
          return docRef.id;
        } catch (error) {
          console.error('Error saving how:', error);
          throw error;
        }
      };
      
      // Update existing how content
      export const updateChooseInDB = async (id, updatedChoose) => {
        try {
          const chooseRef = doc(db, "choose", id);
      
          // Fetch existing document
          const existingDoc = await getDoc(chooseRef);
          if (!existingDoc.exists()) {
            throw new Error(`No document found with ID: ${id}`);
          }
      
          // Merge the existing document with the updated content
          const existingData = existingDoc.data();
          const mergedData = {
            ...existingData,
            ...updatedChoose, // Merging updated content
          };
      
          // Update the document with the new structure
          await updateDoc(chooseRef, mergedData);
          console.log('Successfully updated how:', mergedData);
        } catch (error) {
          console.error('Error updating how in Firestore:', error);
          throw error;
        }
      };


      export const getTeamFromDB = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "team"));
          const values = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          return values;
        } catch (error) {
          console.error('Error fetching hows from Firestore:', error);
          throw error;
        }
      };
      
      // Save new how content
      export const saveTeamToDB = async (team) => {
        try {
          const docRef = await addDoc(collection(db, "team"), team);
          return docRef.id;
        } catch (error) {
          console.error('Error saving how:', error);
          throw error;
        }
      };
      
      // Update existing how content
      export const updateTeamInDB = async (id, updatedTeam) => {
        try {
          const teamRef = doc(db, "team", id);
      
          // Fetch existing document
          const existingDoc = await getDoc(teamRef);
          if (!existingDoc.exists()) {
            throw new Error(`No document found with ID: ${id}`);
          }
      
          // Merge the existing document with the updated content
          const existingData = existingDoc.data();
          const mergedData = {
            ...existingData,
            ...updatedTeam, // Merging updated content
          };
      
          // Update the document with the new structure
          await updateDoc(teamRef, mergedData);
          console.log('Successfully updated how:', mergedData);
        } catch (error) {
          console.error('Error updating how in Firestore:', error);
          throw error;
        }
      };

      export const getScardFromDB = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "scards"));
          const scards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          return scards;
        } catch (error) {
          console.error('Error fetching hows from Firestore:', error);
          throw error;
        }
      };
      
      // Save new how content
      export const saveScardToDB = async (team) => {
        try {
          const docRef = await addDoc(collection(db, "scards"), team);
          return docRef.id;
        } catch (error) {
          console.error('Error saving how:', error);
          throw error;
        }
      };
      
      // Update existing how content
      export const updateScardInDB = async (id, updatedScard) => {
        try {
          const teamRef = doc(db, "scards", id);
      
          // Fetch existing document
          const existingDoc = await getDoc(teamRef);
          if (!existingDoc.exists()) {
            throw new Error(`No document found with ID: ${id}`);
          }
      
          // Merge the existing document with the updated content
          const existingData = existingDoc.data();
          const mergedData = {
            ...existingData,
            ...updatedScard, // Merging updated content
          };
      
          // Update the document with the new structure
          await updateDoc(teamRef, mergedData);
          console.log('Successfully updated how:', mergedData);
        } catch (error) {
          console.error('Error updating how in Firestore:', error);
          throw error;
        }
      };