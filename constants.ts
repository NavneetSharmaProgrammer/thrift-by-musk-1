import { Product, GalleryItem } from './types.ts';

/**
 * The single source of truth for the next product drop.
 * Set your target date and time in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ).
 * Products marked with `isUpcoming: true` will automatically go live at this time.
 * Example: '2024-12-25T13:30:00.000Z' for Christmas Day at 7 PM IST.
 */
export const launchDate = '2025-07-25T12:00:00.000Z';

/**
 * INSTRUCTIONS FOR ADDING PRODUCTS:
 * 1. Add a new object to the PRODUCTS array below.
 * 2. Fill in the product details.
 * 3. To schedule a product for the next drop, add `isUpcoming: true`.
 * 4. For `imageUrls`, add up to 7 Google Drive links for your product photos.
 *    The first image will be the main one on the shop page.
 *    The second image will be shown on hover on the shop page.
 * 5. To add a video, use the `videoUrl` field.
 * 6. To get links: In Google Drive, right-click the file > Share > Share.
 *    Change "General access" to "Anyone with the link", then copy the link.
 */
export const PRODUCTS: Product[] = [
  {
    id: 'vintage-cream-blouse',
    name: 'Vintage Cream Blouse',
    description: 'A timeless silk-blend blouse with delicate lace trim and mother-of-pearl buttons. Perfect for sunny afternoons and spontaneous adventures.',
    price: 1299,
    imageUrls: [
      'https://drive.google.com/file/d/1L155sUH6LUapn_-sW0yzP99pFrdVdfLr/view?usp=drive_link',
      'https://drive.google.com/file/d/1Lhf7i4_xso2U71b_8tBNPm-xbRX3lvP2/view?usp=drive_link',
      'https://drive.google.com/file/d/1rU85JO5KW0B3_I_N4_DnbWTa-qdRBKY7/view?usp=drive_link',
    ],
    category: 'Tops',
    brand: 'Vintage Find',
    size: 'M',
    measurements: { bust: '36"', length: '24"' },
    condition: 'Gently Used',
    sold: false,
  },
  {
    id: 'chic-denim-jacket',
    name: 'Chic Denim Jacket',
    description: 'A beautifully distressed denim jacket, perfect for layering. A true wardrobe staple.',
    price: 1899,
    imageUrls: [
      'https://drive.google.com/file/d/1VvoRYvHRvo9TDYzCvqo5xV-rvdnn9iQG/view?usp=sharing',
      'https://drive.google.com/file/d/1_3l5t3i32NbZktptdaUp0vLiORM613-G/view?usp=drive_link',
    ],
    videoUrl: 'https://drive.google.com/file/d/1bW-8iJ2kM7n0v9PqR6sL5O4t3e2a1j9H/view?usp=sharing',
    category: 'Jackets',
    brand: 'Levi\'s',
    size: 'M',
    measurements: { bust: '38"', length: '25"' },
    condition: 'Gently Used',
    sold: false,
  },
  {
    id: 'delicate-lace-top',
    name: 'Delicate Lace Top',
    description: 'An ethereal lace top with intricate floral patterns. Lightweight and breathable, it layers beautifully over a camisole or under a blazer.',
    price: 999,
    imageUrls: [
        'https://picsum.photos/seed/lace-top/500/625',
        'https://picsum.photos/seed/lace-top-2/500/625'
    ],
    category: 'Tops',
    brand: 'Unbranded',
    size: 'S',
    measurements: { bust: '34"', length: '22"' },
    condition: 'Vintage',
    sold: true,
  },
  {
    id: 'classic-gingham-shirt',
    name: 'Classic Gingham Shirt',
    description: 'A crisp cotton shirt in a timeless gingham print. Effortlessly chic, whether tied at the waist over a dress or tucked into high-waisted jeans.',
    price: 1599,
    imageUrls: [
        'https://picsum.photos/seed/gingham-shirt/500/625',
        'https://picsum.photos/seed/gingham-shirt-2/500/625'
    ],
    category: 'Shirts',
    brand: 'Ralph Lauren',
    size: 'L',
    measurements: { bust: '40"', length: '28"' },
    condition: 'Gently Used',
    sold: false,
    isUpcoming: true, // This item will be part of the next drop
  },
  {
    id: 'oversized-graphic-top',
    name: 'Oversized Graphic Top',
    description: 'A comfortable and eye-catching oversized top with a unique graphic print. Express your personality with this statement piece.',
    price: 899,
    imageUrls: [
        'https://picsum.photos/seed/graphic-top/500/625',
        'https://picsum.photos/seed/graphic-top-2/500/625'
    ],
    category: 'Tops',
    brand: 'ASOS Design',
    size: 'XXL',
    measurements: { bust: '41"', length: '33"' },
    condition: 'New with Tags',
    sold: false,
    isUpcoming: true, // This item will also be part of the next drop
  },
  {
    id: 'checkered-flannel-shirt',
    name: 'Checkered Flannel Shirt',
    description: 'A super cozy and oversized flannel shirt in a classic checkered pattern. Your go-to for chilly evenings and bonfires.',
    price: 1450,
    imageUrls: [
        'https://picsum.photos/seed/flannel-shirt/500/625',
        'https://picsum.photos/seed/flannel-shirt-2/500/625'
    ],
    category: 'Shirts',
    brand: 'Unbranded',
    size: '4XL',
    measurements: { bust: '51"', length: '26"' },
    condition: 'Gently Used',
    sold: true,
  },
  {
    id: 'black-floral-top',
    name: 'Black Floral Tunic Top',
    description: 'A beautiful black tunic top with a delicate floral pattern. Its length makes it versatile to wear as a short dress or over leggings.',
    price: 1150,
    imageUrls: [
        'https://picsum.photos/seed/black-floral-top/500/625',
        'https://picsum.photos/seed/black-floral-top-2/500/625'
    ],
    category: 'Tops',
    brand: 'Zara',
    size: 'XS',
    measurements: { bust: '31"', length: '34"' },
    condition: 'New with Tags',
    sold: false,
  },
];

/**
 * INSTRUCTIONS FOR ADDING GALLERY IMAGES:
 * 1. Upload your images to Google Drive.
 * 2. For each image, right-click > Share > Share and set "General access" to "Anyone with the link".
 * 3. Copy the link.
 * 4. Add a new object to the GALLERY_ITEMS array below.
 * 5. `id`: A unique ID for the item (e.g., 'gallery-post-1').
 * 6. `url`: Paste the Google Drive "Share" link for the image file.
 * 7. `caption` (Optional): A short description or username.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-image-1',
    url: 'https://drive.google.com/file/d/18DcWbQ8E27vmsNRvxLtXBGEViGXVzIiX/view?usp=drive_link',
    caption: 'Styling the Chic Denim Jacket',
  },
  { 
    id: 'gallery-image-2',
    url: 'https://drive.google.com/file/d/1_3l5t3i32NbZktptdaUp0vLiORM613-G/view?usp=drive_link', 
    caption: 'Thrifted Threads' 
  },
  { 
    id: 'gallery-image-3',
    url: 'https://drive.google.com/file/d/1VvoRYvHRvo9TDYzCvqo5xV-rvdnn9iQG/view?usp=sharing', 
    caption: 'Retro Soul' 
  },
  { 
    id: 'gallery-image-4',
    url: 'https://drive.google.com/file/d/14EjIhXtkA-X4nszVsE_LaGVKGFF241q3/view?usp=sharing', 
    caption: 'Sustainable Chic' 
  },
];


export const INSTAGRAM_FEED_IMAGES = [
  { imageUrl: 'https://picsum.photos/seed/insta1/400', link: 'https://www.instagram.com/thriftbymusk/reel/DMLAzFMxD-x/' },
  { imageUrl: 'https://picsum.photos/seed/insta2/400', link: 'https://www.instagram.com/thriftbymusk/' },
  { imageUrl: 'https://picsum.photos/seed/insta3/400', link: 'https://www.instagram.com/thriftbymusk/' },
  { imageUrl: 'https://picsum.photos/seed/insta4/400', link: 'https://www.instagram.com/thriftbymusk/' },
  { imageUrl: 'https://picsum.photos/seed/insta5/400', link: 'https://www.instagram.com/thriftbymusk/' },
  { imageUrl: 'https://picsum.photos/seed/insta6/400', link: 'https://www.instagram.com/thriftbymusk/' },
];