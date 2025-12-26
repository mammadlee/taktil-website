import { getApiUrl } from "./apiConfig";

export async function uploadToCloudinary(file: File): Promise<string> {
  // 1. get signature
  const signRes = await fetch(getApiUrl("/api/uploads/sign"), {
    method: "POST",
    credentials: "include",
  });

  if (!signRes.ok) {
    const t = await signRes.text();
    throw new Error("Failed to get upload signature: " + t);
  }

  const { signature, timestamp, cloudName, apiKey, folder } =
    await signRes.json();

  // 2. upload file
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("folder", folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  // 🔥 BURA ÇOX VACİBDİR
  if (!uploadRes.ok) {
    const errorText = await uploadRes.text();
    console.error("Cloudinary error:", errorText);
    throw new Error("Cloudinary upload failed: " + errorText);
  }

  const data = await uploadRes.json();

  if (!data.secure_url) {
    console.error("Cloudinary response:", data);
    throw new Error("No secure_url returned from Cloudinary");
  }

  return data.secure_url;
}