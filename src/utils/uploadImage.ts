import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { storage } from '@/libs';

export const uploadImage = async (file: File, id: string, collection: string) => {
  const fileRef = ref(storage, `${collection}/${id}}`);

  await uploadBytes(fileRef, file);

  return await getDownloadURL(fileRef);
};
