const cloudinary = required('cloudinary').v2;

//import {v2 as cloudinary} from 'cloudinary;

cloudinary.config({
    cloud_name: 'dwagajwpv',
    secure: true
})

const url = cloudinary.url('')