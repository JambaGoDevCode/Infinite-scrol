
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoader = 0;
let totalImages = 0;
let photoArray = []
let incialLoad = true;

// Unsplash API 
let count = 5;
const apiKey = 'C-x532ED-Ox9NahkMgLYBrHlcx2zSnMTizk2n9KSHkQ';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check if all images were load
function imageLoader(){
    imagesLoader ++;
    
    
    //console.log(imagesLoader);
    if (imagesLoader === totalImages){
        ready = true;
        loader.hidden = true;
        incialLoad = false
        count = 5;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

       
        //console.log('ready = ', ready);
    }
}


// Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}







// Create elemets for Links & photo, add to DOM
function displayPhoto(){
    imagesLoader = 0;
    totalImages = photoArray.length;
    
    
    //console.log('total images', totalImages);
    //run function for each object in photoArray

    photoArray.forEach((photo) =>{
        // create <a> to link to Unsplash

        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank');

        //create <img> for photo 
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //img.setAttribute('src', photo.urls.regular);
        //img.setAttribute('alt', photo.alt_description);
        //img.setAttribute('title', photo.alt_description);


        // event listener, check when each is finished loading
        img.addEventListener('load', imageLoader);

        // put <img> inside <a> then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photo from Unsplash API

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhoto();
    }catch (error){
        console.log(' Can not get the information at API');
    }
}


// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false
        getPhotos();
    }
});

// call the function 
getPhotos();