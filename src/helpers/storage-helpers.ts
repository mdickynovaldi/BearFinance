import { supabaseDBConfig } from "@/config/supabase-db-config";

// Upload file using standard upload
export async function uploadFile(file: File) {
  try {
    // Bersihkan nama file
    const cleanFileName = file.name
      .toLowerCase() // Ubah semua ke huruf kecil
      .replace(/\s+/g, "-") // Ganti spasi dengan tanda strip
      .replace(/[^a-z0-9-_.]/g, ""); // Hapus karakter special kecuali - _ .

    let fileName = `${Date.now()}-${cleanFileName}`;
    const filePath = `public/${fileName}`;

    // Upload file
    const { data, error: uploadError } = await supabaseDBConfig.storage
      .from("basic")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabaseDBConfig.storage
      .from("basic")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Storage helper error:", error);
    return null;
  }
}
