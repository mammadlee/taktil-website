export async function uploadToCloudinary(file: File): Promise<string> {
  const signRes = await fetch("/api/uploads/sign", {
    method: "POST",
    credentials: "include",
  });

  if (!signRes.ok) {
    throw new Error("Upload sign failed");
  }

  const signData = await signRes.json();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signData.apiKey);
  formData.append("timestamp", signData.timestamp);
  formData.append("signature", signData.signature);
  formData.append("folder", signData.folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${signData.cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!uploadRes.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const uploadData = await uploadRes.json();
  return uploadData.secure_url;
}
