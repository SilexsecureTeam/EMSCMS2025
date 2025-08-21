import { useState } from 'react';
import { axiosAuth } from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const PageManagement = () => {
  const [loading, setLoading] = useState(false);
  const router = useNavigate()
  // Register

  const getPrograms = async () => {
    try {
      setLoading(true);
      const res = await axiosAuth.get("/programs");
      console.log('Programs:', res);
      return res.data
    } catch (error) {
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      console.error(error);
      return Promise.reject(errorMessage || "Error fetching Programs");
    } finally {
      setLoading(false);
    }
  }

  const getProgramById = async (slug) => {
    try {
      setLoading(true);
      const res = await axiosAuth.get(`/programs/${slug}`);
      console.log('Program:', res);
      return res.data;
    } catch (error) {
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      console.error(error);
      return Promise.reject(errorMessage || "Error fetching Program");
    } finally {
      setLoading(false);
    }
  }

  const CreateProgramme = async (data) => {
    try {
      setLoading(true);
      await axiosAuth.post("/programs", data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      router("/dashboard/programme");
      return Promise.resolve("Program created successfully");
    } catch (error) {
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      console.error(error);
      return Promise.reject(errorMessage || "Error creating Program");
    } finally {
      setLoading(false);
    }
  }

const UpdateProgramme = async (slug, formData) => {
  try {
    setLoading(true);
    const res = await axiosAuth.post(
      `/programs/${slug}`, 
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    router("/dashboard/programme");
    return Promise.resolve("Program updated successfully");
  } catch (error) {

    const resError = error.response?.data;
    const errorMessage = resError?.message || resError?.data;
    return Promise.reject(errorMessage || "Error updating Program");
  } finally {
    setLoading(false);
  }
};




  const deleteProgramme = async (slug) => {
    try {
      setLoading(true);
      await axiosAuth.delete(`/programs/${slug}`);
      return Promise.resolve("Programme deleted successfully");
    } catch (error) {
      console.error(error);
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      return Promise.reject(errorMessage || "Error deleting Program");
    } finally {
      setLoading(false);
    }
  }



  const getAllBlogs = async () => {
    try {
      setLoading(true);
      const res = await axiosAuth.get("/blogs");
      console.log('Blogs:', res);
      return res.data;
    } catch (error) {
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      console.error(error);
      return Promise.reject(errorMessage || "Error fetching Blogs");
    } finally {
      setLoading(false);
    }
  };

  const createBlogs = async (data) => {
    try {
      setLoading(true);

      const res = await axiosAuth.post("/blogs", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Created Blog:', data);
      router("/dashboard/blog");
      return Promise.resolve("Blog created successfully");
    } catch (error) {
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      console.error(error);
      return Promise.reject(errorMessage || "Error creating Blog");
    } finally {
      setLoading(false);
    }
  };

  const updateBlogs = async (id, formData) => {
    try {
      setLoading(true);

      const res = await axiosAuth.post(`/blogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Updated Blog:', res.data);
      router("/dashboard/blog");
      return Promise.resolve("Blog updated successfully");
    } catch (error) {
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      console.error(error);
      return Promise.reject(errorMessage || "Error updating Blog");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogs = async (id) => {
    try {
      setLoading(true);
      await axiosAuth.delete(`/blogs/${id}`);
      return Promise.resolve("Blog deleted successfully");
    } catch (error) {
      console.error(error);
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      return Promise.reject(errorMessage || "Error deleting Blog");
    } finally {
      setLoading(false);
    }
  };

  const getBlogById = async (slug) => {
    try {
      setLoading(true);
      const res = await axiosAuth.get(`/blogs/${slug}`);
      return res.data;
    } catch (error) {
      console.error(error);
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      return Promise.reject(errorMessage || "Error fetching Blog");
    } finally {
      setLoading(false);
    }
  };

  const getCareer = async () => {
    try {
      setLoading(true);
      const res = await axiosAuth.get("/careers");
      return res.data;
    } catch (error) {
      console.error(error);
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      return Promise.reject(errorMessage || "Error fetching Career");
    } finally {
      setLoading(false);
    }
  };

  const createCareer = async (data) => {
    try {
      setLoading(true);
      const res = await axiosAuth.post("/careers", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.error(error);
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      return Promise.reject(errorMessage || "Error creating Career");
    } finally {
      setLoading(false);
    }
  };

  const UpdateCareer = async (data) => {
    try {
      setLoading(true);
      const res = await axiosAuth.post("/careers", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.error(error);
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      return Promise.reject(errorMessage || "Error creating Career");
    } finally {
      setLoading(false);
    }
  };

  const createGallery = async (data) => {
    try {
      setLoading(true);
      const res = await axiosAuth.post("/gallery", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Created Gallery:', res.data);
      return Promise.resolve("Gallery created successfully");
    } catch (error) {
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      console.error(error);
      return Promise.reject(errorMessage || "Error creating Gallery");
    } finally {
      setLoading(false);
    }
  };

  const getAllGalleries = async () => {
    try {
      setLoading(true);
      const res = await axiosAuth.get("/gallery");
      return res.data;
    } catch (error) {
      console.error(error);
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      return Promise.reject(errorMessage || "Error fetching Galleries");
    } finally {
      setLoading(false);
    }
  };


  const updateGallery = async (id, formData) => {
    try {
      setLoading(true);

      const res = await axiosAuth.post(`/gallery/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Updated Gallery:', res.data);
      router("/dashboard/gallery");
      return Promise.resolve("Gallery updated successfully");
    } catch (error) {
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      console.error(error);
      return Promise.reject(errorMessage || "Error updating Gallery");
    } finally {
      setLoading(false);
    }
  };

  // const deleteGallery = async (id) => {
  //   try {
  //     setLoading(true);
  //     await axiosAuth.delete(`/gallery/${id}`);
  //     return Promise.resolve("Gallery deleted successfully");
  //   } catch (error) {
  //     console.error(error);
  //     const resError = error.response?.data;
  //     const errorMessage = resError?.message || resError?.data;
  //     return Promise.reject(errorMessage || "Error deleting Gallery");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getAllEnrollment = async () => {
    try {
      setLoading(true);
      const res = await axiosAuth.get("/enrol-now");
      return res.data;
    } catch (error) {
      console.error(error);
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      return Promise.reject(errorMessage || "Error fetching Enrollments");
    } finally {
      setLoading(false);
    }
  };

  const createEnrollment = async (data) => {
    try {
      setLoading(true);
      const res = await axiosAuth.post("/enrol-now", data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return Promise.resolve("Enrollment created successfully");
    } catch (error) {
      console.error(error);
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      return Promise.reject(errorMessage || "Error creating Enrollment");
    } finally {
      setLoading(false);
    }
  };

  const downloadEnrollPdf = async (id) => {
  try {
    const res = await axiosAuth.get(`/enrol-now/download/${id}`, {
      responseType: 'blob', 
    });

    const fileURL = window.URL.createObjectURL(new Blob([res.data]));

    const contentDisposition = res.headers['content-disposition'];
    let fileName = 'enrol-now.pdf';
    if (contentDisposition && contentDisposition.includes('filename=')) {
      fileName = contentDisposition.split('filename=')[1].replace(/"/g, '');
    }

    const link = document.createElement('a');
    link.href = fileURL;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return Promise.resolve("PDF downloaded successfully");
  } catch (error) {
    console.error(error);
    const resError = error.response?.data;
    const errorMessage = resError?.message || resError?.data;
    return Promise.reject(errorMessage || "Error downloading PDF");
  }
};


  const getContacts = async () => {
    try {
      setLoading(true);
      const res = await axiosAuth.get('/contact');
      return res.data
    } catch (error) {
      console.error(error);
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      return Promise.reject(errorMessage || "Error fetching Contacts");
    } finally {
      setLoading(false);
    }
  }

  const createContact = async (data) => {
    try {
      setLoading(true);
      const res = await axiosAuth.post('/contact', data);
      return res.data;
    } catch (error) {
      console.error(error);
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      return Promise.reject(errorMessage || "Error creating Contact");
    } finally {
      setLoading(false);
    }
  }

   const getTopStories = async () => {
    return await axiosAuth.get("/blogs?top_stories=1");
  };

const createPage = async (data) => {
  try {
    const res = await axiosAuth.post("/page/update", data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log('Page created:', res.data);
    return Promise.resolve("Page created successfully")
  } catch (error) {
      console.error(error);
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      return Promise.reject(errorMessage || "Error creating Contact");
    } finally {
      setLoading(false);
    }
  }

const getPages = async (parentPage) => {
  try {
    setLoading(true);
    const res = await axiosAuth.get(`/page/${parentPage}`);
    return res.data;
  } catch (error) {
    console.error(error);
    const resError = error.response?.data;
    const errorMessage = resError?.message || resError?.data;
    return Promise.reject(errorMessage || "Error fetching Pages");
  } finally {
    setLoading(false);
  }
};




  return {
    getPrograms,
    CreateProgramme,
    UpdateProgramme,
    deleteProgramme,
    getProgramById,
    getAllBlogs,
    createBlogs,
    updateBlogs,
    deleteBlogs,
    getBlogById,
    getCareer,
    createCareer,
    UpdateCareer,
    createGallery,
    getAllGalleries,
    updateGallery,
    getAllEnrollment,
    createEnrollment,  
    createContact,
    getContacts,
    downloadEnrollPdf,
    getTopStories,
    createPage,
    getPages,
  }

}


export default PageManagement

