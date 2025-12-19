'use client';

import { useState } from 'react';
import styles from './adminpanel.module.css';

interface ContentSection {
  id: string;
  title: string;
  content: string;
}

export default function AboutSectionManager() {
  const [mainTitle, setMainTitle] = useState('Building Infrastructure That Stands the Test of Time');
  const [description, setDescription] = useState(
    "Gurudev Engicon Private Limited is a trusted name in India's infrastructure development sector. Established in 2012, we have consistently delivered large-scale highway, flyover, and bridge construction projects with precision, quality, and commitment to timelines."
  );
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const categories = [
  'Highway Construction',
  'Flyover Construction',
  'Bridge Construction',
  'Road Infrastructure',
];

const [selectedCategory, setSelectedCategory] = useState(categories[0]);


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}> Manager</h1>
          <p className={styles.headerSubtitle}>
            Manage your company's  content and images
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
  <h2 className={styles.cardTitle}>Category</h2>
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

          {/* Main Title Section */}
<div className={styles.card}>
  <div className={styles.cardHeader}>
    <h2 className={styles.cardTitle}>Main Title</h2>
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
    <h2 className={styles.cardTitle}>Description</h2>
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
              <h2 className={styles.cardTitle}>Image Gallery</h2>
              <label className={styles.uploadButton}>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleImageUpload}
                  className={styles.fileInput}
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
                Upload
              </label>
            </div>

            <div
              className={styles.uploadArea}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {images.length > 0 ? (
                <div className={styles.imageGrid}>
                  {images.map((img, index) => (
                    <div key={index} className={styles.imageItem}>
                      <img src={img} alt={`Upload ${index + 1}`} />
                      <button
                        className={styles.removeButton}
                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                      >
                        ×
                      </button>
                    </div>
                  ))}
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
                    Click "Upload" or drag images here
                  </p>
                  <p className={styles.uploadSubtext}>
                    Supports: JPG, PNG, GIF (Max 5MB)
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