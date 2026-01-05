'use client';

import { useState, useEffect } from 'react';
import styles from './adminpanel.module.css';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

const categories = [
  'Building Construction',
  'Highway Construction',
  'Flyover Construction',
  'Bridge Construction',
  'Road Infrastructure',
] as const;

type Category = (typeof categories)[number];

export default function AdminPanel() {
  const [mainTitle, setMainTitle] = useState(
    'Building Infrastructure That Stands the Test of Time'
  );
  const [description, setDescription] = useState(
    "Gurudev Engicon Private Limited is a trusted name in India's infrastructure development sector. Established in 2012, we have consistently delivered large-scale highway, flyover, and bridge construction projects with precision, quality, and commitment to timelines."
  );
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  // New image form state
  const [newImageTitle, setNewImageTitle] = useState('');
  const [newImageDescription, setNewImageDescription] = useState('');

  // Preview images (not yet uploaded)
  interface PreviewImage {
    file: File;
    previewUrl: string;
  }
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);

  // Maximum images per category
  const MAX_IMAGES_PER_CATEGORY = 5;

  // Fetch images for selected category
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/gallery?category=${encodeURIComponent(selectedCategory)}`
      );
      const data = await response.json();
      if (data.images) {
        setImages(data.images);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    // Clear previews when category changes
    setPreviewImages([]);
  }, [selectedCategory]);

  // Handle file selection - only creates previews
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed the limit
    const totalImages = images.length + previewImages.length;
    const remainingSlots = MAX_IMAGES_PER_CATEGORY - totalImages;
    if (remainingSlots <= 0) {
      alert(
        `Maximum ${MAX_IMAGES_PER_CATEGORY} images allowed per category. Please delete some images first.`
      );
      return;
    }

    const filesToAdd = Array.from(files).slice(0, remainingSlots);
    if (filesToAdd.length < files.length) {
      alert(
        `Only ${remainingSlots} more image(s) can be added. Adding first ${filesToAdd.length} file(s).`
      );
    }

    // Create preview URLs
    const newPreviews: PreviewImage[] = filesToAdd.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setPreviewImages((prev) => [...prev, ...newPreviews]);

    // Reset file input
    e.target.value = '';
  };

  // Remove a preview image
  const removePreview = (index: number) => {
    setPreviewImages((prev) => {
      const removed = prev[index];
      URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Save all preview images to Cloudinary
  const handleSaveImages = async () => {
    if (previewImages.length === 0) return;

    setUploading(true);
    setUploadProgress('Uploading...');

    try {
      for (let i = 0; i < previewImages.length; i++) {
        const { file } = previewImages[i];
        setUploadProgress(`Uploading ${i + 1} of ${previewImages.length}...`);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', selectedCategory);
        formData.append('title', newImageTitle || file.name.split('.')[0]);
        formData.append('description', newImageDescription || '');

        const response = await fetch('/api/gallery/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success && result.image) {
          setImages((prev) => [...prev, result.image]);
        } else {
          console.error('Upload failed:', result.error);
        }
      }

      // Clear previews and form
      previewImages.forEach((p) => URL.revokeObjectURL(p.previewUrl));
      setPreviewImages([]);
      setNewImageTitle('');
      setNewImageDescription('');
      setUploadProgress('Upload complete!');
      setTimeout(() => setUploadProgress(''), 2000);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadProgress('Upload failed!');
      setTimeout(() => setUploadProgress(''), 2000);
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e);
  };

  const handleDeleteImage = async (publicId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch('/api/gallery/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
      });

      const result = await response.json();

      if (result.success) {
        setImages((prev) => prev.filter((img) => img.id !== publicId));
      } else {
        alert('Failed to delete image');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete image');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();

    // Check if limit already reached
    const totalImages = images.length + previewImages.length;
    if (totalImages >= MAX_IMAGES_PER_CATEGORY) {
      alert(
        `Maximum ${MAX_IMAGES_PER_CATEGORY} images allowed per category. Please delete some images first.`
      );
      return;
    }

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    // Create a fake event to reuse the file select logic
    const fakeEvent = {
      target: { files, value: '' },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleFileSelect(fakeEvent);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Gallery Manager</h1>
          <p className={styles.headerSubtitle}>
            Manage your project gallery images with Cloudinary
          </p>
        </div>
        <button className={styles.adminButton}>
          <span className={styles.adminDot}></span>
          Admin Panel
        </button>
      </header>

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          {/* Category Selector */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Select Category</h2>
            <div className={styles.categoryGroup}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.categoryButton} ${
                    selectedCategory === cat ? styles.activeCategory : ''
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Image Details Form */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Image Details (Optional)</h2>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Title</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Enter image title"
                value={newImageTitle}
                onChange={(e) => setNewImageTitle(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description</label>
              <textarea
                className={styles.textarea}
                placeholder="Enter image description"
                value={newImageDescription}
                onChange={(e) => setNewImageDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Main Title Section */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>About Section Title</h2>
              <button
                className={styles.editButton}
                onClick={() => setIsEditingTitle(true)}
                aria-label="Edit main title"
                title="Edit main title"
              >
                ✏️
              </button>
            </div>

            {isEditingTitle ? (
              <textarea
                className={styles.textarea}
                value={mainTitle}
                onChange={(e) => setMainTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                autoFocus
                placeholder="Enter main title"
              />
            ) : (
              <p className={styles.cardText}>{mainTitle}</p>
            )}
          </div>

          {/* Description Section */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>About Section Description</h2>
              <button
                className={styles.editButton}
                onClick={() => setIsEditingDescription(true)}
                aria-label="Edit description"
                title="Edit description"
              >
                ✏️
              </button>
            </div>

            {isEditingDescription ? (
              <textarea
                className={`${styles.textarea} ${styles.textareaLarge}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => setIsEditingDescription(false)}
                autoFocus
                placeholder="Enter description"
              />
            ) : (
              <p className={styles.cardText}>{description}</p>
            )}
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className={styles.rightColumn}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                {selectedCategory} Gallery
                <span className={styles.imageCount}>
                  ({images.length + previewImages.length}/
                  {MAX_IMAGES_PER_CATEGORY})
                </span>
                {loading && (
                  <span className={styles.loadingText}> Loading...</span>
                )}
              </h2>
              <div className={styles.headerButtons}>
                {previewImages.length > 0 && (
                  <button
                    className={styles.saveButton}
                    onClick={handleSaveImages}
                    disabled={uploading}
                  >
                    {uploading ? 'Saving...' : `Save (${previewImages.length})`}
                  </button>
                )}
                <label
                  className={`${styles.uploadButton} ${
                    uploading ||
                    images.length + previewImages.length >=
                      MAX_IMAGES_PER_CATEGORY
                      ? styles.uploadingButton
                      : ''
                  }`}
                  title={
                    images.length + previewImages.length >=
                    MAX_IMAGES_PER_CATEGORY
                      ? 'Maximum images reached'
                      : 'Select images'
                  }
                >
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleFileSelect}
                    className={styles.fileInput}
                    disabled={
                      uploading ||
                      images.length + previewImages.length >=
                        MAX_IMAGES_PER_CATEGORY
                    }
                  />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M11.3333 5.33333L8 2M8 2L4.66667 5.33333M8 2V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {uploading ? 'Uploading...' : 'Select'}
                </label>
              </div>
            </div>

            {uploadProgress && (
              <div className={styles.progressBar}>
                <span>{uploadProgress}</span>
              </div>
            )}

            <div
              className={styles.uploadArea}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {images.length > 0 || previewImages.length > 0 ? (
                <div className={styles.imageGrid}>
                  {/* Uploaded images from Cloudinary */}
                  {images.map((img) => (
                    <div key={img.id} className={styles.imageItem}>
                      <img src={img.url} alt={img.title} />
                      <div className={styles.imageOverlay}>
                        <span className={styles.imageTitle}>{img.title}</span>
                      </div>
                      <button
                        className={styles.removeButton}
                        onClick={() => handleDeleteImage(img.id)}
                        title="Delete image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {/* Preview images (not yet uploaded) */}
                  {previewImages.map((preview, index) => (
                    <div
                      key={`preview-${index}`}
                      className={`${styles.imageItem} ${styles.previewItem}`}
                    >
                      <img
                        src={preview.previewUrl}
                        alt={`Preview ${index + 1}`}
                      />
                      <div className={styles.previewBadge}>Preview</div>
                      <button
                        className={styles.removeButton}
                        onClick={() => removePreview(index)}
                        title="Remove preview"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : loading ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.spinner}></div>
                  <p>Loading images...</p>
                </div>
              ) : (
                <>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.uploadIcon}
                  >
                    <path
                      d="M38 38H10C8.89543 38 8 37.1046 8 36V12C8 10.8954 8.89543 10 10 10H38C39.1046 10 40 10.8954 40 12V36C40 37.1046 39.1046 38 38 38Z"
                      stroke="#D97706"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 21C18.6569 21 20 19.6569 20 18C20 16.3431 18.6569 15 17 15C15.3431 15 14 16.3431 14 18C14 19.6569 15.3431 21 17 21Z"
                      stroke="#D97706"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M40 28L31 19L10 38"
                      stroke="#D97706"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className={styles.uploadText}>
                    Click "Select" or drag images here
                  </p>
                  <p className={styles.uploadSubtext}>
                    Images will be uploaded to: {selectedCategory}
                  </p>
                  <p className={styles.uploadSubtext}>
                    Supports: JPG, PNG, GIF, WebP (Max 10MB)
                  </p>
                  <p className={styles.uploadSubtext}>
                    {MAX_IMAGES_PER_CATEGORY -
                      images.length -
                      previewImages.length}{' '}
                    of {MAX_IMAGES_PER_CATEGORY} slots remaining
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
