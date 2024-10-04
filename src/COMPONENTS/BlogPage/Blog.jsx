import React, { useEffect, useState } from 'react';
import { saveToDB, getFromDB, deleteFromDB, deleteBlogInDB } from './db';
import { Box, Grid, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { auth, db } from "../../Firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { updateBlogInDB } from './db';  // Adjust the path if needed
import firebase from 'firebase/compat/app';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
}));

export default function Blog() {
    
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [expandedIndex, setExpandedIndex] = useState(null); // Track which blog is expanded
  const [blogData, setBlogData] = useState([]);
  const [newBlog, setNewBlog] = useState({ img: '', title: '', date: '', description: '' });
  const [open, setOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchBlogs = async () => {
    const blogsSnapshot = await getDocs(collection(db, "blogs"));
    const blogs = blogsSnapshot.docs.map(doc => ({ ...doc.data(),id: doc.id,  }));
    setBlogData(blogs); // Update the state with the latest blogs
  };
  
  useEffect(() => {
    fetchBlogs(); // Fetch blogs when component mounts
  }, []);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'murouj@work.com') {
        setIsAdmin(true);
        fetchBlogs();
      } else {
        setIsAdmin(false);
        setBlogData([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEditMode(false);
    setSelectedImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setNewBlog({ ...newBlog, img: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

    const handleAddBlog = async () => {
        try {
        const id = await saveToDB(newBlog);
        setBlogData([...blogData, { ...newBlog, id }]);
        setNewBlog({ img: '', title: '', date: '', description: '' });
        setSelectedImage(null);
        handleClose();
        } catch (error) {
        console.error('Error adding blog:', error);
        }
    };

    const handleEditClick = (index) => {
        const blog = blogData[index];  // Get the blog data using the index
        setEditIndex(index);  // Track which blog is being edited
        setNewBlog(blog);  // Populate the form with the blog's current data
        setIsEditMode(true);  // Set to edit mode
        handleClickOpen();  // Open the form dialog
      };
      const handleSaveEditBlog = async () => {
        try {
          const blogToUpdate = blogData[editIndex];  // Get the original blog data
          const updatedBlog = { ...blogToUpdate, ...newBlog };  // Merge new data with the original
          await updateBlogInDB(updatedBlog.id, updatedBlog);  // Update Firestore using the blog ID
          setBlogData(blogData.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog));  // Update local state
          setIsEditMode(false);  // Exit edit mode
          handleClose();  // Close the form dialog
        } catch (error) {
          console.error('Error saving edited blog:', error);
          
        }
      };
      const handleDeleteClick = (blogId) => {
        setSelectedDeleteIndex(blogId.toString());  // Convert the blog ID to a string
        setDeleteConfirmationOpen(true);            // Open delete confirmation dialog
      };
      
      

      const handleDeleteBlog = async () => {
        try {
          // Get the blog ID based on selectedDeleteIndex
          const blogId = blogData[selectedDeleteIndex]?.id;
      
          // Ensure blogId is valid
          if (!blogId) {
            console.error("Error: Invalid blog ID:", blogId);
            return;
          }
      
          console.log("Deleting blog with ID:", blogId);  // Log the blog ID
      
          // Verify if the blog exists in Firestore before deleting
          const blogRef = doc(db, "blogs", blogId);
          const blogDoc = await getDoc(blogRef);
      
          if (!blogDoc.exists()) {
            console.error("Error: Blog does not exist in Firestore with ID:", blogId);
            return;
          }
      
          // Call the function to delete the blog from Firebase
          await deleteBlogInDB(blogId);
      
          // Update local state after successful deletion
          setBlogData(blogData.filter(blog => blog.id !== blogId));
          setDeleteConfirmationOpen(false);  // Close the delete confirmation dialog
        } catch (error) {
          console.error("Error deleting blog:", error);
        }
      };
      
      
      
      
      
  const handleDeleteCancel = () => setDeleteConfirmationOpen(false);

  const handleShareClick = (blog) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.description,
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleExpandClick = (index) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index)); // Collapse other cards when a new card is expanded
  };

  const getShortDescription = (description) => {
    const maxLength = 100; // Adjust length as needed
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <Box sx={{ width: '80%', margin: '4rem auto', textAlign: 'left' }}>
      {isAdmin && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          sx={{
            fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',
            marginBottom: '2rem',
            backgroundColor: '#fec62a',
            color: '#11111f',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#fec62a',
              color: '#11111f',
            },
          }}
        >
          {t("Add Blog")}
        </Button>
      )}

      {/* Dialog for Adding/Editing Blogs */}
      <Dialog sx={{ direction: isRTL ? 'rtl' : 'ltr' }} open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins' }}>
          {isEditMode ? t('Edit Blog') : t('Add a New Blog')}
        </DialogTitle>
        <DialogContent>
          <TextField sx={{fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',}}
            margin="dense"
            label={t('Title')}
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField sx={{fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',}}
            margin="dense"
            label={t('Date')}
            name="date"
            value={newBlog.date}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField sx={{fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',}}
            margin="dense"
            label={t('Description')}
            name="description"
            value={newBlog.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />
          <Box>
          <input
  accept="image/*"
  type="file"
  onChange={handleImageChange}
  style={{ display: 'none' }}
  id="image-upload"
/>
<label htmlFor="image-upload">
  <Button sx={{ fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins' }} variant="contained" component="span">
    {t('Upload Image')}
  </Button>
</label>

{selectedImage && (
  <Box sx={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative' }}>
    <img 
      src={selectedImage} 
      alt="Preview" 
      style={{ 
        width: '100%', 
        height: '100%',  // Use 100% to fill the Box height
        objectFit: 'cover',  // Ensures the image covers the Box area
        position: 'absolute', // Positioning to cover the Box
        top: 0,
        left: 0,
      }} 
    />
  </Box>
)}


          </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',}} onClick={handleClose}>{t('Cancel')}</Button>
          <Button sx={{fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',}} onClick={isEditMode ? handleSaveEditBlog : handleAddBlog}>
            {isEditMode ? t('Save Changes') : t('Add Blog')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog sx={{direction:isRTL?'rtl':'ltr',}} open={deleteConfirmationOpen} onClose={handleDeleteCancel}>
        <DialogTitle sx={{fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',}}>{t('Confirm Delete')}</DialogTitle>
        <DialogContent>{t('Are you sure you want to delete this blog post? This action cannot be undone.')}</DialogContent>
        <DialogActions>
          <Button sx={{fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',}} onClick={handleDeleteCancel}>{t('Cancel')}</Button>
          <Button sx={{fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',}} onClick={handleDeleteBlog}>{t('Delete')}</Button>
        </DialogActions>
      </Dialog>

      {/* Blog Cards */}
      <Grid container spacing={4}>
        {blogData.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',width:'100%' ,
                height: {xs:expandedIndex === index ? 'auto' : 'auto',md:expandedIndex === index ? 'auto' : 'auto', }, // Adjust height for non-expanded cards
                overflow: 'hidden',  // Ensure overflow is hidden
                transition: 'height 0.3s ease'  // Smooth transition for height change
            }}>
              <CardMedia component="img" image={blog.img} alt={blog.title} />
              <CardContent>
                <Typography sx={{direction:isRTL?'rtl':'ltr',textAlign:isRTL?'right':'left',fontFamily:isRTL?'Noto Kufi Arabic':'Poppins'}}  gutterBottom variant="h5" component="div">
                  {blog.title}
                </Typography>
                <Typography sx={{direction:isRTL?'rtl':'ltr',textAlign:isRTL?'right':'left',fontFamily:isRTL?'Noto Kufi Arabic':'Poppins'}} variant="body2" color="text.secondary">
                  {blog.date}
                </Typography>
                <Typography sx={{ direction: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'right' : 'left',fontFamily:isRTL?'Noto Kufi Arabic':'Poppins' }} variant="body2" color="text.secondary">
  {expandedIndex === index 
    ? blog.description.split('\n').map((paragraph, i) => (
        <p key={i} style={{ marginBottom: '1rem' }}>{paragraph}</p>
      ))
    : getShortDescription(blog.description)
  }
</Typography>

              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleShareClick(blog)}
                  sx={{ fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',direction:isRTL?'rtl':'ltr',textAlign:isRTL?'right':'left'
                   }}
                >
                  <ShareIcon />
                </Button>
                {isAdmin && (
                  <>
                    <IconButton onClick={() => handleEditClick(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
                <ExpandMore
                  expand={expandedIndex === index}
                  onClick={() => handleExpandClick(index)}
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
