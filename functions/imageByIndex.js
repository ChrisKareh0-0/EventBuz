import image1 from '../public/image1.jpg'
import image2 from '../public/image2.jpg'
import image3 from '../public/image3.jpg'
export const images = [image1.src, image2.src, image3.src]

const imageByIndex = (index) => images[index % images.length]
console.log("IMAGES",images)

export default imageByIndex
