import { Link } from 'react-router';
import Cropper from 'react-easy-crop';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client/react';
import imageCompression from 'browser-image-compression';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ImagePlus, Loader2, Save } from 'lucide-react';

import { uploadImage } from '@/utils';
import { useAppSelector } from '@/hooks';
import { UPDATE_PROFILE_PICTURE } from '@/graphql';

type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
const OUTPUT_SIZE = 512;

export const EditProfilePicturePage = () => {
  const navigate = useNavigate();
  const { uid, token } = useAppSelector((state) => state.auth);

  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [uploading, setUploading] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);

  const [updateProfilePicture] = useMutation(UPDATE_PROFILE_PICTURE, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    return () => {
      if (src && src.startsWith('blob:')) URL.revokeObjectURL(src);
    };
  }, [src]);

  const validateFile = (f: File) => {
    if (!ALLOWED_TYPES.includes(f.type)) {
      setError('Please upload a valid image file (JPEG, PNG, or JPG).');
    }
    if (f.size > MAX_FILE_SIZE) {
      setError('File size exceeds the maximum limit of 8MB.');
    }
    return null;
  };

  const onFileSelected = async (f: File | null) => {
    setError(null);
    if (!f) return;

    const validationError = validateFile(f);
    if (validationError) {
      setError(validationError);
      return;
    }

    const url = URL.createObjectURL(f);
    setFile(f);
    setSrc(url);

    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    onFileSelected(selected);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const dropped = e.dataTransfer.files?.[0] ?? null;
    if (dropped) onFileSelected(dropped);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const renderCroppedPreview = useCallback(async () => {
    if (!src || !croppedAreaPixels || !previewCanvasRef.current) return;

    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.src = src;
      i.crossOrigin = 'anonymous';
      i.onload = () => resolve(i);
      i.onerror = (err) => reject(err);
    });

    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = OUTPUT_SIZE;

    canvas.width = size;
    canvas.height = size;
    ctx?.clearRect(0, 0, size, size);

    ctx?.save();
    ctx?.beginPath();
    ctx?.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx?.closePath();
    ctx?.clip();

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    ctx?.drawImage(
      img,
      croppedAreaPixels.x * scaleX,
      croppedAreaPixels.y * scaleY,
      croppedAreaPixels.width * scaleX,
      croppedAreaPixels.height * scaleY,
      0,
      0,
      size,
      size,
    );

    ctx?.restore();
  }, [src, croppedAreaPixels]);

  useEffect(() => {
    renderCroppedPreview();
  }, [renderCroppedPreview]);

  const getCroppedImageBlob = async () => {
    if (!src || !croppedAreaPixels) return null;

    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.src = src;
      i.crossOrigin = 'anonymous';
      i.onload = () => resolve(i);
      i.onerror = (err) => reject(err);
    });

    const canvas = document.createElement('canvas');
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;

    const ctx = canvas.getContext('2d');
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    ctx?.drawImage(
      img,
      croppedAreaPixels.x * scaleX,
      croppedAreaPixels.y * scaleY,
      croppedAreaPixels.width * scaleX,
      croppedAreaPixels.height,
      0,
      0,
      OUTPUT_SIZE,
      OUTPUT_SIZE,
    );

    return await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', 0.92),
    );
  };

  const compressBlob = async (blob: Blob) => {
    const file = new File([blob], `avatar_${Date.now()}.jpg`, { type: 'image/jpeg' });
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: OUTPUT_SIZE,
      useWebWorker: true,
      initialQuality: 0.85,
    };

    const compressed = await imageCompression(file, options);
    return compressed;
  };

  const handleDiscard = () => {
    if (src && src.startsWith('blob:')) URL.revokeObjectURL(src);
    setSrc(null);
    setFile(null);
    setError(null);
    setCroppedAreaPixels(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSave = async () => {
    setError(null);

    if (!src || !file || !croppedAreaPixels) {
      setError('No image selected.');
      return;
    }

    setProcessing(true);

    try {
      const croppedBlob = await getCroppedImageBlob();
      if (!croppedBlob) throw new Error('Failed to produce cropped image');

      const compressedFile = await compressBlob(croppedBlob as File);

      if (compressedFile.size > MAX_FILE_SIZE) {
        throw new Error('Compressed file exceeds the maximum size of 8MB.');
      }

      setUploading(true);
      const downloadUrl = await uploadImage(compressedFile, uid!, 'profilePictures');

      await updateProfilePicture({
        variables: {
          url: downloadUrl,
        },
      });

      navigate('/edit-profile');
    } catch (error: unknown) {
      console.error('Error updating profile picture: ', error);
      setError((error as Error).message || 'Something went wrong. Please try again.');
    } finally {
      setProcessing(false);
      setUploading(false);
    }
  };

  const DropZone = (
    <motion.div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={() => inputRef.current?.click()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 cursor-pointer hover:border-brand-400 hover:shadow-sm transition-colors text-center"
      role="button"
      aria-label="Drop your image here or click to select"
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <ImagePlus className="w-6 h-6 text-gray-500" />
        </div>
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-200">Drag & drop image here</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">or click to select a file</p>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          JPEG, PNG, or WebP (max 8MB)
        </p>
      </div>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>StageGate - Change Profile Picture</title>
        <meta name="description" content="Change your profile picture on StageGate" />
      </Helmet>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10 flex justify-center">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link
            to="/edit-profile"
            className="flex items-center text-brand-600 hover:underline mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Change Profile Picture
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Upload a clear photo of yourself. You can crop and compress it before saving.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="mb-4">
              {!src ? (
                <>
                  {DropZone}
                  <input
                    required
                    type="file"
                    aria-hidden
                    ref={inputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={onInputChange}
                  />
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="relative h-[360px] bg-black/5 dark:bg-black/20 rounded-md overflow-hidden">
                      <Cropper
                        aspect={1}
                        crop={crop}
                        image={src}
                        zoom={zoom}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        objectFit="horizontal-cover"
                        onCropComplete={onCropComplete}
                      />
                    </div>
                    <div className="flex flex-col items-center justify-between py-4">
                      <canvas
                        ref={previewCanvasRef}
                        className="w-48 h-48 rounded-full shadow bg-gray-200 dark:bg-gray-700"
                      />

                      <div className="w-full space-y-3 mt-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Zoom
                        </label>
                        <input
                          type="range"
                          min={1}
                          max={3}
                          step={0.01}
                          value={zoom}
                          className="w-full"
                          onChange={(e) => setZoom(Number(e.target.value))}
                        />
                        <div className="flex gap-2 mt-3">
                          <button
                            type="button"
                            onClick={handleDiscard}
                            className="flex-1 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:shadow cursor-pointer"
                          >
                            Discard
                          </button>
                          <button
                            type="button"
                            onClick={handleSave}
                            disabled={uploading || processing}
                            className={`flex-1 px-4 py-2 rounded-md text-white flex items-center justify-center gap-2 ${
                              processing || uploading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-brand-500 hover:bg-brand-600 cursor-pointer'
                            }`}
                          >
                            {processing || uploading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                Save
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>

            <div className="mt-4 p-3 rounded-md bg-gray-50 dark:bg-gray-900/40 text-sm text-gray-600 dar:text-gray-300">
              <p className="font-medium mb-2 text-center">Profile Picture Upload Tips</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use a square image for best results.</li>
                <li>Recommended size: 512x512px</li>
                <li>Supported formats: JPEG, PNG, WebP</li>
                <li>Max file size: 8MB</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
