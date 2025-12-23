import { useState } from "react";

export default function AdminProducts() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function uploadImage(file: File) {
    const signRes = await fetch("/api/admin/cloudinary-sign");
    const sign = await signRes.json();

    const form = new FormData();
    form.append("file", file);
    form.append("api_key", sign.apiKey);
    form.append("timestamp", sign.timestamp);
    form.append("signature", sign.signature);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`,
      { method: "POST", body: form }
    );

    const data = await res.json();
    setImage(data.secure_url);
  }

  async function submit() {
    setLoading(true);

    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        category,
        price,
        description,
        image,
      }),
    });

    setLoading(false);
    alert("Məhsul əlavə edildi");
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>Məhsul əlavə et</h2>

      <input placeholder="Ad" onChange={(e) => setName(e.target.value)} />
      <input
        placeholder="Kateqoriya"
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        placeholder="Qiymət"
        onChange={(e) => setPrice(e.target.value)}
      />
      <textarea
        placeholder="Təsvir"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
      />

      {image && <img src={image} width={120} />}

      <button disabled={loading} onClick={submit}>
        {loading ? "Yadda saxlanılır..." : "Yadda saxla"}
      </button>
    </div>
  );
}