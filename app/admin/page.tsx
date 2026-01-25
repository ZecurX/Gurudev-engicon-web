'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './adminpanel.module.css';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

interface ImageGroup {
  name: string;
  description: string;
  images: GalleryImage[];
}

const categories = [
  { id: 'Building Construction', label: 'Buildings', icon: '🏛️' },
  { id: 'Highway Construction', label: 'Highways', icon: '🛣️' },
  { id: 'Flyover Construction', label: 'Flyovers', icon: '🌉' },
  { id: 'Bridge Construction', label: 'Bridges', icon: '🌁' },
  { id: 'Road Infrastructure', label: 'Roads', icon: '🚧' },
] as const;

type Category = (typeof categories)[number]['id'];

const MAX_IMAGES_PER_GROUP = 10;
const MAX_GROUPS = 10;

export default function AdminPanel() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    'Building Construction'
  );
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // View mode: 'groups' or 'grid'
  const [viewMode, setViewMode] = useState<'groups' | 'grid'>('groups');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Upload form state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string>('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [isNewGroup, setIsNewGroup] = useState(false);

  // Edit form state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [updating, setUpdating] = useState(false);

  // Fetch images
  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/gallery?category=${encodeURIComponent(selectedCategory)}`
      );
      const data = await res.json();
      setImages(data.images || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Group images by title
  const groupedImages: ImageGroup[] = (() => {
    const groupMap = new Map<string, GalleryImage[]>();

    images.forEach((img) => {
      const groupName = img.title || 'Untitled';
      if (!groupMap.has(groupName)) {
        groupMap.set(groupName, []);
      }
      groupMap.get(groupName)!.push(img);
    });

    return Array.from(groupMap.entries()).map(([name, imgs]) => ({
      name,
      description: imgs[0]?.description || '',
      images: imgs,
    }));
  })();

  // Get existing group names for dropdown
  const existingGroupNames = groupedImages.map((g) => g.name);

  // Toggle group expansion
  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupName)) {
        next.delete(groupName);
      } else {
        next.add(groupName);
      }
      return next;
    });
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, groupName?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFile(file);
    setUploadPreview(URL.createObjectURL(file));

    if (groupName) {
      // Adding to existing group
      setSelectedGroup(groupName);
      setUploadTitle(groupName);
      setIsNewGroup(false);
      const group = groupedImages.find((g) => g.name === groupName);
      setUploadDescription(group?.description || '');
    } else {
      // New upload - can choose group or create new
      setSelectedGroup('');
      setUploadTitle('');
      setIsNewGroup(true);
    }

    setShowUploadModal(true);
    e.target.value = '';
  };

  // Upload image
  const handleUpload = async () => {
    if (!uploadFile || !uploadTitle.trim()) {
      alert('Please enter a title for the image.');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('category', selectedCategory);
      formData.append('title', uploadTitle.trim());
      formData.append('description', uploadDescription.trim());

      const res = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setImages((prev) => [...prev, data.image]);
        closeModal();
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Delete image
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;

    try {
      const res = await fetch('/api/gallery/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId: id }),
      });
      const data = await res.json();

      if (data.success) {
        setImages((prev) => prev.filter((img) => img.id !== id));
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Close upload modal
  const closeModal = () => {
    setShowUploadModal(false);
    setUploadFile(null);
    if (uploadPreview) URL.revokeObjectURL(uploadPreview);
    setUploadPreview('');
    setUploadTitle('');
    setUploadDescription('');
    setSelectedGroup('');
    setIsNewGroup(false);
  };

  // Open edit modal
  const openEditModal = (img: GalleryImage) => {
    setEditingImage(img);
    setEditTitle(img.title);
    setEditDescription(img.description || '');
    setShowEditModal(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingImage(null);
    setEditTitle('');
    setEditDescription('');
  };

  // Update image metadata
  const handleUpdate = async () => {
    if (!editingImage || !editTitle.trim()) {
      alert('Please enter a title for the image.');
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch('/api/gallery/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicId: editingImage.id,
          title: editTitle.trim(),
          description: editDescription.trim(),
        }),
      });
      const data = await res.json();

      if (data.success) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === editingImage.id
              ? {
                ...img,
                title: editTitle.trim(),
                description: editDescription.trim(),
              }
              : img
          )
        );
        closeEditModal();
      } else {
        alert('Update failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Update failed. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  // Drag & drop
  const handleDrop = (e: React.DragEvent, groupName?: string) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadFile(file);
      setUploadPreview(URL.createObjectURL(file));

      if (groupName) {
        setSelectedGroup(groupName);
        setUploadTitle(groupName);
        setIsNewGroup(false);
        const group = groupedImages.find((g) => g.name === groupName);
        setUploadDescription(group?.description || '');
      } else {
        setSelectedGroup('');
        setUploadTitle('');
        setIsNewGroup(true);
      }

      setShowUploadModal(true);
    }
  };

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/logo.png" alt="Gurudev Engicon" />
          </Link>
        </div>

        <nav className={styles.nav}>
          <span className={styles.navLabel}>Categories</span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.navItem} ${selectedCategory === cat.id ? styles.active : ''
                }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className={styles.navIcon}>{cat.icon}</span>
              {cat.label}
              <span className={styles.navBadge}>
                {selectedCategory === cat.id ? images.length : ''}
              </span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.backLink}>
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>{selectedCategory}</h1>
            <p className={styles.subtitle}>
              {groupedImages.length} project{groupedImages.length !== 1 ? 's' : ''} · {images.length} image{images.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className={styles.headerActions}>
            {/* View Mode Toggle */}
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewBtn} ${viewMode === 'groups' ? styles.active : ''}`}
                onClick={() => setViewMode('groups')}
                title="Group view"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid view"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>

            <label className={styles.uploadBtn}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
                hidden
              />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              New Project
            </label>
          </div>
        </header>

        {/* Gallery Content */}
        <div
          className={styles.gallery}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e)}
        >
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading images...</p>
            </div>
          ) : images.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>📷</div>
              <h3>No projects yet</h3>
              <p>Create your first project by uploading images</p>
              <label className={styles.emptyBtn}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e)}
                  hidden
                />
                Create Project
              </label>
            </div>
          ) : viewMode === 'groups' ? (
            /* Groups View */
            <div className={styles.groupsContainer}>
              {groupedImages.map((group) => (
                <div
                  key={group.name}
                  className={`${styles.groupCard} ${expandedGroups.has(group.name) ? styles.expanded : ''}`}
                >
                  {/* Group Header */}
                  <div
                    className={styles.groupHeader}
                    onClick={() => toggleGroup(group.name)}
                  >
                    <div className={styles.groupInfo}>
                      <div className={styles.groupThumbnail}>
                        <img src={group.images[0]?.url} alt={group.name} />
                        <span className={styles.imageCount}>{group.images.length}</span>
                      </div>
                      <div className={styles.groupMeta}>
                        <h3>{group.name}</h3>
                        {group.description && <p>{group.description}</p>}
                      </div>
                    </div>
                    <div className={styles.groupActions}>
                      <label
                        className={styles.addToGroupBtn}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, group.name)}
                          hidden
                        />
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        Add
                      </label>
                      <button className={styles.expandBtn}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          style={{
                            transform: expandedGroups.has(group.name) ? 'rotate(180deg)' : 'rotate(0)',
                            transition: 'transform 0.2s ease',
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Group Images */}
                  {expandedGroups.has(group.name) && (
                    <div
                      className={styles.groupImages}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, group.name)}
                    >
                      {group.images.map((img) => (
                        <div key={img.id} className={styles.groupImageCard}>
                          <div className={styles.groupImageThumb}>
                            <img src={img.url} alt={img.title} />
                            <div className={styles.groupImageOverlay}>
                              <button
                                className={styles.editImageBtn}
                                onClick={() => openEditModal(img)}
                                title="Edit"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                              </button>
                              <button
                                className={styles.deleteImageBtn}
                                onClick={() => handleDelete(img.id)}
                                title="Delete"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add more to group */}
                      {group.images.length < MAX_IMAGES_PER_GROUP && (
                        <label className={styles.addToGroupCard}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, group.name)}
                            hidden
                          />
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </label>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Add New Group Card */}
              {groupedImages.length < MAX_GROUPS && (
                <label className={styles.newGroupCard}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e)}
                    hidden
                  />
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <span>New Project</span>
                </label>
              )}
            </div>
          ) : (
            /* Grid View (flat) */
            <div className={styles.grid}>
              {images.map((img) => (
                <div key={img.id} className={styles.card}>
                  <div
                    className={styles.cardImage}
                    onClick={() => openEditModal(img)}
                    style={{ cursor: 'pointer' }}
                    title="Click to edit"
                  >
                    <img src={img.url} alt={img.title} />
                    <div className={styles.editOverlay}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <span>Edit</span>
                    </div>
                    <button
                      className={styles.deleteBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(img.id);
                      }}
                      title="Delete image"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  </div>
                  <div
                    className={styles.cardContent}
                    onClick={() => openEditModal(img)}
                    style={{ cursor: 'pointer' }}
                  >
                    <h4>{img.title}</h4>
                    {img.description && <p>{img.description}</p>}
                  </div>
                </div>
              ))}

              {/* Add more placeholder */}
              <label className={styles.addCard}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e)}
                  hidden
                />
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>Add Image</span>
              </label>
            </div>
          )}
        </div>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              ×
            </button>

            <h2 className={styles.modalTitle}>
              {selectedGroup ? `Add to "${selectedGroup}"` : 'New Project'}
            </h2>
            <p className={styles.modalSubtitle}>
              {selectedGroup
                ? `Adding image to existing project`
                : `Create a new project in ${selectedCategory}`}
            </p>

            <div className={styles.modalContent}>
              {/* Preview */}
              <div className={styles.modalPreview}>
                {uploadPreview && <img src={uploadPreview} alt="Preview" />}
              </div>

              {/* Form */}
              <div className={styles.modalForm}>
                {/* Group/Project Selection - only show if not already assigned to a group */}
                {!selectedGroup && existingGroupNames.length > 0 && (
                  <div className={styles.field}>
                    <label>Project</label>
                    <div className={styles.groupSelector}>
                      <button
                        type="button"
                        className={`${styles.groupOption} ${isNewGroup ? styles.active : ''}`}
                        onClick={() => {
                          setIsNewGroup(true);
                          setUploadTitle('');
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        New Project
                      </button>
                      <button
                        type="button"
                        className={`${styles.groupOption} ${!isNewGroup ? styles.active : ''}`}
                        onClick={() => setIsNewGroup(false)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                        </svg>
                        Existing Project
                      </button>
                    </div>
                  </div>
                )}

                {/* Existing group dropdown */}
                {!selectedGroup && !isNewGroup && existingGroupNames.length > 0 && (
                  <div className={styles.field}>
                    <label>Select Project <span>*</span></label>
                    <select
                      value={uploadTitle}
                      onChange={(e) => {
                        setUploadTitle(e.target.value);
                        const group = groupedImages.find((g) => g.name === e.target.value);
                        setUploadDescription(group?.description || '');
                      }}
                      className={styles.select}
                    >
                      <option value="">Choose a project...</option>
                      {existingGroupNames.map((name) => (
                        <option key={name} value={name}>
                          {name} ({groupedImages.find((g) => g.name === name)?.images.length} images)
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* New project name input */}
                {(isNewGroup || !existingGroupNames.length || selectedGroup) && (
                  <div className={styles.field}>
                    <label>
                      Project Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="Enter project name"
                      autoFocus
                      disabled={!!selectedGroup}
                    />
                    <span className={styles.fieldHint}>
                      Images with the same project name will be grouped together
                    </span>
                  </div>
                )}

                <div className={styles.field}>
                  <label>Description</label>
                  <textarea
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    placeholder="Enter project description (optional)"
                    rows={3}
                    disabled={!!selectedGroup && !isNewGroup}
                  />
                </div>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeModal}>
                Cancel
              </button>
              <button
                className={styles.saveBtn}
                onClick={handleUpload}
                disabled={uploading || !uploadTitle.trim()}
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingImage && (
        <div className={styles.modalOverlay} onClick={closeEditModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeEditModal}>
              ×
            </button>

            <h2 className={styles.modalTitle}>Edit Image</h2>
            <p className={styles.modalSubtitle}>Update title and description</p>

            <div className={styles.modalContent}>
              {/* Preview */}
              <div className={styles.modalPreview}>
                <img src={editingImage.url} alt={editingImage.title} />
              </div>

              {/* Form */}
              <div className={styles.modalForm}>
                <div className={styles.field}>
                  <label>
                    Title <span>*</span>
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Enter image title"
                    autoFocus
                  />
                </div>

                <div className={styles.field}>
                  <label>Description</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Enter description (optional)"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeEditModal}>
                Cancel
              </button>
              <button
                className={styles.saveBtn}
                onClick={handleUpdate}
                disabled={updating || !editTitle.trim()}
              >
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
